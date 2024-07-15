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

router.get("/question", async (request: Request, response: Response) => {
    const email = (request.user as any).email;
    const uid = request.query.uid?.toString();
    response.status(200).send(await controller.getQuestion(email, uid))
});

router.post("/response", async (request: Request, response: Response) => {
    const email = (request.user as any).email;
    const uid = request.query.uid?.toString();
    if (!uid) throw new Error("No receive uid parameter");
    const { words } = request.body;
    if (!words) throw new Error("Responses is empty");
    response.status(200).send(await controller.response(email, uid, words))
});

router.get("/history", async (request: Request, response: Response) => {
    const email = (request.user as any).email;
    response.status(200).send(await controller.history(email))
});

export default router;