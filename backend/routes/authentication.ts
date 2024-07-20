import express, {NextFunction, Request, Response} from "express";
import AuthenticationController from "../controllers/authentication";
import CronJobService from "../model/cronjob";
import passport from "passport";

const router = express.Router();
const authenticationController = new AuthenticationController()
const cronJobService = new CronJobService()

router.post("/*", (request: Request, response: Response, next: NextFunction) => {
    const { email, password } = request.body;
    authenticationController.hasAllInformation(email, password);
    next()
});

router.post("/login",
    passport.authenticate("login", { session: false }),
    (request: Request, response: Response) => {
        response.status(200).send({user: request.user});
});

router.post("/resetPassword",
    passport.authenticate("resetPassword", { session: false }),
    (request: Request, response: Response) => {
        response.status(200).send({user: request.user});
});

router.post("/signup", 
    passport.authenticate("signup", { session: false }),
    async (request: Request, response: Response) => {
        await cronJobService.createInitialQuestions((request.user as any).email)
        response.status(200).send({user: request.user});
});

export default router;