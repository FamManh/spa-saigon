const httpStatus = require("http-status");
const { omit } = require("lodash");
const Branch = require("../models/branch.model");

/**
 * Load branch and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const branch = await Branch.get(id);
    req.locals = { branch };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get branch
 * @public
 */
exports.get = (req, res) => res.json(req.locals.branch.transform());

/**
 * Create new branch
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    console.log(req.body);
    const branch = new Branch(req.body);
    const savedBranch = await branch.save();
    res.status(httpStatus.CREATED);
    res.json(savedBranch.transform());
  } catch (error) {
    next(Branch.checkDuplicateBranchname(error));
  }
};

// /**
//  * Replace existing branch
//  * @public
//  */
// exports.replace = async (req, res, next) => {
//   try {
//     const { branch } = req.locals;
//     const newBranch = new Branch(req.body);
//     const ommitRole = branch.role !== "admin" ? "role" : "";
//     const newBranchObject = omit(newBranch.toObject(), "_id", ommitRole);

//     await branch.updateOne(newBranchObject, { override: true, upsert: true });
//     const savedBranch = await Branch.findById(branch._id);

//     res.json(savedBranch.transform());
//   } catch (error) {
//     next(Branch.checkDuplicateBranchname(error));
//   }
// };

/**
 * Update existing branch
 * @public
 */
exports.update = (req, res, next) => {
  const branch = Object.assign(req.locals.branch, req.body);

  branch
    .save()
    .then(savedBranch => res.json(savedBranch.transform()))
    .catch(e => next(Branch.checkDuplicateBranchname(e)));
};

/**
 * Get branch list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const branchs = await Branch.list(req.query);
    const transformedBranchs = branchs.map(branch => branch.transform());
    res.json(transformedBranchs);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete branch
 * @public
 */
exports.remove = (req, res, next) => {
  const branch = req.locals.branch;
  branch.isActive = false;
  
  branch
    .save()
    .then(savedBranch => res.json(savedBranch.transform()))
    .catch(e => next(e));
};
