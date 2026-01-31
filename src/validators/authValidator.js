import Joi from "joi";

const registerSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    branch: Joi.string().hex().length(24).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required(),
    repeat_password: Joi.string().valid(Joi.ref('password')).required(),
    birthdate: Joi.date().iso().required(),
    gender: Joi.string().valid('male', 'female').required(),
    role: Joi.string().valid('stuff').default('stuff')
    // role: Joi.string().valid('stuff', 'admin', 'superadmin').default('stuff')

});

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

export { registerSchema, loginSchema };
