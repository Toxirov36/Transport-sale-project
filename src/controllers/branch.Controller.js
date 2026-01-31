import Branch from '../models/branch.js';
import branchSchema from '../validators/branchValidator.js';
import CustomError from '../utils/customError.js';

const addBranch = async (req, res, next) => {
  const { error } = branchSchema.validate(req.body);
  if (error) throw new CustomError(error.details[0].message, 400);

  const branch = await Branch.create(req.body);
  res.status(201).json({ message: 'Filial qo`shildi', branch });
};

const changeBranch = async (req, res, next) => {
  const { id } = req.params;
  const { error } = branchSchema.validate(req.body);
  if (error) throw new CustomError(error.details[0].message, 400);

  const branch = await Branch.findByIdAndUpdate(id, req.body, { new: true });
  if (!branch) throw new CustomError('Filial topilmadi', 404);
  res.json({ message: 'Filial o`zgartirildi', branch });
};

const deleteBranch = async (req, res, next) => {
  const { id } = req.params;
  const branch = await Branch.findByIdAndDelete(id);
  if (!branch) throw new CustomError('Filial topilmadi', 404);
  res.json({ message: 'Filial o`chirildi' });
};

const getBranches = async (req, res, next) => {
  const branches = await Branch.find();
  res.json(branches);
};

const getBranchInfo = async (req, res, next) => {
  const { id } = req.params;
  const branch = await Branch.findById(id);
  if (!branch) throw new CustomError('Filial topilmadi', 404);
  res.json(branch);
};

export { addBranch, changeBranch, deleteBranch, getBranches, getBranchInfo };