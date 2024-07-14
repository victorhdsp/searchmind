import express, {Request, Response} from "express";
import authentication from "./authentication";
import application from "./application";

const router = express.Router()

router.use("/auth", authentication);
router.use("/app", application);

router.get("/", (request: Request, response: Response) => {
    response.status(200).send("Hello World");
})

export default router;