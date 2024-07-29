import express from "express";
import passport from "passport";
import SettingsController from "../controllers/settings"
import ErrorMessage from "../libs/ErrorMessage";

const router = express.Router();
const settingsController = new SettingsController();

router.all("/*", 
    passport.authenticate("jwt", { session: false }),
    (request, response, next) => next()
)

router.get("/getSettings", async (request, response, next) => {
    try {
        const email = (request.user as any).email;
        const settings = await settingsController.getSettings(email)
        response.status(200).json({settings})
    } catch (error:any) {
        next(new Error(error.message));
    }
});

router.post("/hour", async (request, response, next) => {
    try {
        const email = (request.user as any).email;
        const { hour } = request.body;
        if (!hour) throw new Error(ErrorMessage.noReceiveHour);
        const settings = await settingsController.addHour(email, hour)
        response.status(201).json({settings})
    } catch (error:any) {
        next(new Error(error.message));
    }
});

router.put("/hour", async (request, response, next) => {
    try {
        const email = (request.user as any).email;
        const { hour, newHour } = request.body;
        if (!hour) throw new Error(ErrorMessage.noReceiveHour);
        if (!newHour) throw new Error(ErrorMessage.noReceiveNewHour);
        const settings = await settingsController.changeHour(email, hour, newHour);
        response.status(200).json({settings})
    } catch (error:any) {
        next(new Error(error.message));
    }
});

router.delete("/hour", async (request, response, next) => {
    try {
        const email = (request.user as any).email;
        const { hour } = request.body;
        if (!hour) throw new Error(ErrorMessage.noReceiveHour);
        await settingsController.removeHour(email, hour);
        response.status(204).end()
    } catch (error:any) {
        next(new Error(error.message));
    }
});

export default router;