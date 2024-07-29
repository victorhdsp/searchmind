import express from "express";
import passport from "passport";
import ApplicationController from "../controllers/application"
import ErrorMessage from "../libs/ErrorMessage";

const router = express.Router();
const applicationController = new ApplicationController();

router.all("/*", 
    passport.authenticate("jwt", { session: false }),
    (request, response, next) => next()
)

router.get("/readedQuestion", async (request, response, next) => {
    try {
        const email = (request.user as any).email;
        const uid = request.query.uid?.toString();
        if (!uid) throw new Error(ErrorMessage.noReceiveUidParameter);
        const question = await applicationController.readedQuestion(email, uid, 5) //Tempo regulavel
        response.status(200).json({question})
    } catch (error:any) {
        next(new Error(error.message));
    }
});

router.get("/question", async (request, response, next) => {
    try {
        const email = (request.user as any).email;
        const uid = request.query.uid?.toString();
        const question = await applicationController.getQuestion(email, uid)
        response.status(200).json({question})
    } catch (error:any) {
        next(new Error(error.message));
    }
});

router.post("/response", async (request, response, next) => {
    try {
        const email = (request.user as any).email;
        const uid = request.query.uid?.toString();
        if (!uid) throw new Error(ErrorMessage.noReceiveUidParameter);
        const { words } = request.body;
        if (!words) throw new Error(ErrorMessage.responsesEmpty);
        const _response = await applicationController.sendResponse(email, uid, words)
        response.status(201).json({response: _response})
    } catch (error:any) {
        next(new Error(error.message));
    }
});

router.get("/history", async (request, response,next) => {
    try {
        const email = (request.user as any).email;
        const history = await applicationController.history(email)
        response.status(200).json({history})
    } catch (error:any) {
        next(new Error(error.message));
    }
});

export default router;