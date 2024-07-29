import express, {Request, Response} from "express";
import authentication from "./authentication";
import application from "./application";
import settings from "./settings"
import ErrorHandle from "../middleware/errorHandle";

const router = express.Router()

router.use("/auth", authentication);
router.use("/app", application);
router.use("/settings", settings);

router.get("/", (request: Request, response: Response) => {
    response.status(200).send("Hello World");
})

router.use(ErrorHandle);

export default router;