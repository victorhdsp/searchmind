import express, {Request, Response} from "express";
import authentication from "./authentication";
import application from "./application";
import ErrorHandle from "../middleware/errorHandle";

const router = express.Router()

router.use("/auth", authentication);
router.use("/app", application);

router.get("/", (request: Request, response: Response) => {
    response.status(200).send("Hello World");
})

router.use(ErrorHandle);

export default router;