import { ErrorRequestHandler } from "express";

const errorHandle: ErrorRequestHandler = (error: Error, request, response, next) => {
    response.status(500).send({ error: error.message })
}

export default errorHandle;