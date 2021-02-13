import { ErrorRequestHandler } from "express";
import { ValidationError } from "yup";
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

interface ValidationErrors {
    [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof ValidationError) {
        let errors: ValidationErrors = {};

        err.inner.forEach(e => {
            errors[e.path] = e.errors;
        });

        return res.status(400).json({ message: 'Validation fails', errors });
    } else if (err instanceof EntityNotFoundError) {
        return res.status(400).json({ message: 'Entity not found' });
    }

    console.error(err);

    return res.status(500).json({ message: 'Internal server error' })
}

export default errorHandler;