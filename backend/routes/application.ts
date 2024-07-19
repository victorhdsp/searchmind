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
        const question = await controller.createQuestion(email)
        response.status(200).json({question})
    } catch (error:any) {
        next(new Error(error.message));
    }
});

router.get("/question", async (request, response, next) => {
    try {
        const email = (request.user as any).email;
        const uid = request.query.uid?.toString();
        const question = await controller.getQuestion(email, uid)
        response.status(200).json({question})
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
        const _response = await controller.response(email, uid, words)
        response.status(200).json({response: _response})
    } catch (error:any) {
        next(new Error(error.message));
    }
});

router.get("/history", async (request, response,next) => {
    try {
        const email = (request.user as any).email;
        const history = await controller.history(email)
        response.status(200).json({history})
    } catch (error:any) {
        next(new Error(error.message));
    }
});

export default router;