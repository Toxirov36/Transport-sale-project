import Joi from "joi";

const branchSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required()
});

export default branchSchema;