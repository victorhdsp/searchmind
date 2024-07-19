import { ErrorRequestHandler } from "express";

const ErrorHandle: ErrorRequestHandler = (error: Error, request, response, next) => {
    response.status(500).send(error.message)
}

export default ErrorHandle;