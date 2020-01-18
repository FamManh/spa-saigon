const httpStatus = require("http-status");
const { omit } = require("lodash");
const Staff = require("../models/staff.model");

/**
 * Load staff and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const staff = await Staff.get(id);
    req.locals = { staff };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get staff
 * @public
 */
exports.get = (req, res) => res.json(req.locals.staff.transform());

/**
 * Create new staff
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const staff = new Staff(req.body);
    const savedStaff = await staff.save();
    res.status(httpStatus.CREATED);
    res.json(savedStaff.transform());
  } catch (error) {
    next(Staff.checkDuplicateStaffname(error));
  }
};

// /**
//  * Replace existing staff
//  * @public
//  */
// exports.replace = async (req, res, next) => {
//   try {
//     const { staff } = req.locals;
//     const newStaff = new Staff(req.body);
//     const ommitRole = staff.role !== "admin" ? "role" : "";
//     const newStaffObject = omit(newStaff.toObject(), "_id", ommitRole);

//     await staff.updateOne(newStaffObject, { override: true, upsert: true });
//     const savedStaff = await Staff.findById(staff._id);

//     res.json(savedStaff.transform());
//   } catch (error) {
//     next(Staff.checkDuplicateStaffname(error));
//   }
// };

/**
 * Update existing staff
 * @public
 */
exports.update = (req, res, next) => {
  const staff = Object.assign(req.locals.staff, req.body);

  staff
    .save()
    .then(savedStaff => res.json(savedStaff.transform()))
    .catch(e => next(Staff.checkDuplicateStaffname(e)));
};

/**
 * Get staff list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const staffs = await Staff.list(req.query);
    const transformedStaffs = staffs.map(staff => staff.transform());
    res.json(transformedStaffs);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete staff
 * @public
 */
exports.remove = (req, res, next) => {
  const staff = req.locals.staff;
  staff.isActive = false;
  
  staff
    .save()
    .then(savedStaff => res.json(savedStaff.transform()))
    .catch(e => next(e));
};
