const httpStatus = require("http-status");
const { omit } = require("lodash");
const Shift = require("../models/shift.model");
const APIError = require('../utils/APIError');
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
    
    const shift = new Shift(req.body);
    const isExists = await Shift.checkDuplicate(req.body.date, req.body.branch);
    if (isExists){
        throw new APIError({
          status: httpStatus.CONFLICT,
          message: "Ca hiện tại đã tồn tại"
        });
    } const savedShift = await shift.save();
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
exports.remove = (req, res, next) => {
  const shift = req.locals.shift;
  
  shift
    .save()
    .then(savedShift => res.json(savedShift.transform()))
    .catch(e => next(e));
};
