import express, {NextFunction, Request, Response} from "express";
import AuthenticationController from "../controllers/authentication";
import CronJobService from "../controllers/cronJob";
import passport from "passport";

const router = express.Router();
const authenticationController = new AuthenticationController()
const cronJobService = new CronJobService()

const hasAllInformation = (request: Request, response: Response, next: NextFunction) => {
    const { email, password } = request.body;
    authenticationController.hasAllInformation(email, password);
    next()
}

router.post("/login",
    hasAllInformation,
    passport.authenticate("login", { session: false }),
    (request: Request, response: Response) => {
        response.status(200).send({user: request.user});
});

router.post("/resetPassword",
    hasAllInformation,
    passport.authenticate("resetPassword", { session: false }),
    (request: Request, response: Response) => {
        response.status(200).send({user: request.user});
});

router.post("/signup", 
    hasAllInformation,
    passport.authenticate("signup", { session: false }),
    async (request: Request, response: Response) => {
        await cronJobService.createInitialQuestions((request.user as any).email)
        response.status(201).send({user: request.user});
});

router.get("/resetToken",
    passport.authenticate("jwt", { session: false }),
    async (request: Request, response: Response) => {
        const email = (request.user as any).email;
        const user = await authenticationController.resetToken(email);
        response.status(200).send({user});
});

export default router;