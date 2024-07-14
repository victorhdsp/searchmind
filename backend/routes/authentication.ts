import express, {NextFunction, Request, Response} from "express";
import controller from "../controllers/authentication";
import application from "../services/application";
import passport from "passport";

const router = express.Router();

router.post("/*", (request: Request, response: Response, next: NextFunction) => {
    const { email, password } = request.body;
    controller.hasAllInformation(email, password);
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
        await application.createInitialQuestions((request.user as any).email)
        response.status(200).send({user: request.user});
});

export default router;