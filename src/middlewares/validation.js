import Joi from 'joi';
import CustomError from '../utils/customError.js';

export const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) throw new CustomError(error.details[0].message, 400);
    next();
};