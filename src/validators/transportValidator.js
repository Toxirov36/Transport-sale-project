import Joi from "joi";

const transportSchema = Joi.object({
  branch: Joi.string().required(),
  model: Joi.string().required(),
  color: Joi.string().required(),
  img: Joi.string().optional(),
  price: Joi.number().required()
});

export default transportSchema;