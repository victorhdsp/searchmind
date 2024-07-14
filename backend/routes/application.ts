import express, {NextFunction, Request, Response} from "express";
import passport from "passport";
import controller from "../controllers/application"

const router = express.Router();

router.all("/*",
    passport.authenticate("jwt", { session: false }),
    (request: Request, response: Response, next: NextFunction) => {
    next();
})

router.post("/question", async (request: Request, response: Response) => {
    const email = (request.user as any).email;
    response.status(200).send(await controller.createQuestion(email))
});

router.get("/question", (request: Request, response: Response) => {
    const email = (request.user as any).email;
    const uid = request.query.uid?.toString();
    response.status(200).send(controller.getQuestion(email, uid))
});

router.post("/response", (request: Request, response: Response) => {
    const email = (request.user as any).email;
    const uid = request.query.uid?.toString();
    if (!uid) throw new Error("No receve Uid parameter");
    const { words } = request.body;
    if (!words) throw new Error("Responses is empty");
    response.status(200).send(controller.response(email, uid, words))
});

router.get("/history", (request: Request, response: Response) => {
    const email = (request.user as any).email;
    response.status(200).send(controller.history(email))
});

export default router;