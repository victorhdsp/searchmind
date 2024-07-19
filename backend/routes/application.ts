import express from "express";
import passport from "passport";
import controller from "../controllers/application"

const router = express.Router();

router.all("/*", 
    passport.authenticate("jwt", { session: false }),
    (request, response, next) => next()
)

router.post("/question", async (request, response, next) => {
    try {
        const email = (request.user as any).email;
        response.status(200).send(await controller.createQuestion(email))
    } catch (error:any) {
        next(new Error(error.message));
    }
});

router.get("/question", async (request, response, next) => {
    try {
        const email = (request.user as any).email;
        const uid = request.query.uid?.toString();
        response.status(200).send(await controller.getQuestion(email, uid))
    } catch (error:any) {
        next(new Error(error.message));
    }
});

router.post("/response", async (request, response, next) => {
    try {
        const email = (request.user as any).email;
        const uid = request.query.uid?.toString();
        if (!uid) throw new Error("No receive uid parameter");
        const { words } = request.body;
        if (!words) throw new Error("Responses is empty");
        response.status(200).send(await controller.response(email, uid, words))
    } catch (error:any) {
        next(new Error(error.message));
    }
});

router.get("/history", async (request, response,next) => {
    try {
        const email = (request.user as any).email;
        response.status(200).send(await controller.history(email))
    } catch (error:any) {
        next(new Error(error.message));
    }
});

export default router;