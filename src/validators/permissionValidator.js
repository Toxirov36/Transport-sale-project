import Joi from 'joi';

const permissionSchema = Joi.object({
  user: Joi.string().required(),
  permissionModel: Joi.string().required(),
  actions: Joi.array().items(Joi.string().valid('create', 'read', 'update', 'delete')).required()
});

export default permissionSchema;