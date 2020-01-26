const httpStatus = require("http-status");
const { omit } = require("lodash");
const Shift = require("../models/shift.model");
const Ledger = require("../models/ledger.model");
const APIError = require('../utils/APIError');
const moment = require('moment');
/**
 * Load shift and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const shift = await Shift.get(id);
    req.locals = { shift };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get shift
 * @public
 */
exports.get = (req, res) => res.json(req.locals.shift.transform());

/**
 * Create new shift
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    let date = moment(req.body.date).format('x');
    const shift = new Shift({...req.body, date});
    const isExists = await Shift.checkDuplicate(req.body.date, req.body.branch);
    if (isExists && isExists.length > 0) {
      return res.status(409).json({
        id: isExists[0]._id,
        status: httpStatus.CONFLICT,
        message: "Ca hiện tại đã tồn tại123"
      });
    } 
    const savedShift = await shift.save();
    res.status(httpStatus.CREATED);
    res.json(savedShift.transform());
  } catch (error) {
    next(error);
  }
};

/**
 * Update existing shift
 * @public
 */
exports.update = (req, res, next) => {
  const shift = Object.assign(req.locals.shift, req.body);

  shift
    .save()
    .then(savedShift => res.json(savedShift.transform()))
    .catch(e => next(Shift.checkDuplicateShiftname(e)));
};

/**
 * Get shift list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const shifts = await Shift.list(req.query);
    const transformedShifts = shifts.map(shift => shift.transform());
    res.json(transformedShifts);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete shift
 * @public
 */
exports.remove = async (req, res, next) => {
  const shift = req.locals.shift;
  await Ledger.deleteMany({ shift: shift._id });
  shift
    .remove()
    .then(savedShift => res.json(savedShift.transform()))
    .catch(e => next(e));
};
