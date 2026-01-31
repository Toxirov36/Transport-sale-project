import Transport from '../models/transport.js';
import transportSchema from '../validators/transportValidator.js';
import CustomError from '../utils/customError.js';

export const getTransports = async (req, res, next) => {
  const { branch, search } = req.query;
  const query = {};
  if (branch) query.branch = branch;
  if (search) query.model = { $regex: search, $options: 'i' };

  const transports = await Transport.find(query).populate('branch');
  if (!transports) throw new CustomError('Transportlar topilmadi', 404);
  res.json(transports);
};

export const addTransport = async (req, res, next) => {
  const { error } = transportSchema.validate(req.body);
  if (error) throw new CustomError(error.details[0].message, 400);

  const transport = await Transport.create(req.body);
  res.json({ message: 'Transport qo`shildi', transport });
};

export const changeTransport = async (req, res, next) => {
  const { id } = req.params;
  const { error } = transportSchema.validate(req.body);
  if (error) throw new CustomError(error.details[0].message, 400);

  const transport = await Transport.findByIdAndUpdate(id, req.body, { new: true });
  if (!transport) throw new CustomError('Transport topilmadi', 404);
  res.json({ message: 'Transport o`zgartirildi', transport });
};

export const deleteTransport = async (req, res, next) => {
  const { id } = req.params;
  const transport = await Transport.findByIdAndDelete(id);
  if (!transport) throw new CustomError('Transport topilmadi', 404);
  res.json({ message: 'Transport o`chirildi' });
};

