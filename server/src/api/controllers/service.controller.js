const httpStatus = require("http-status");
const { omit } = require("lodash");
const Service = require("../models/service.model");

/**
 * Load service and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const service = await Service.get(id);
    req.locals = { service };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get service
 * @public
 */
exports.get = (req, res) => res.json(req.locals.service.transform());

/**
 * Create new service
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const service = new Service(req.body);
    const savedService = await service.save();
    res.status(httpStatus.CREATED);
    res.json(savedService.transform());
  } catch (error) {
    next(Service.checkDuplicateServicename(error));
  }
};

// /**
//  * Replace existing service
//  * @public
//  */
// exports.replace = async (req, res, next) => {
//   try {
//     const { service } = req.locals;
//     const newService = new Service(req.body);
//     const ommitRole = service.role !== "admin" ? "role" : "";
//     const newServiceObject = omit(newService.toObject(), "_id", ommitRole);

//     await service.updateOne(newServiceObject, { override: true, upsert: true });
//     const savedService = await Service.findById(service._id);

//     res.json(savedService.transform());
//   } catch (error) {
//     next(Service.checkDuplicateServicename(error));
//   }
// };

/**
 * Update existing service
 * @public
 */
exports.update = (req, res, next) => {
  const service = Object.assign(req.locals.service, req.body);
  service
    .save()
    .then(savedService => res.json(savedService.transform()))
    .catch(e => next(Service.checkDuplicateServicename(e)));
};

/**
 * Get service list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const services = await Service.list(req.query);
    const transformedServices = services.map(service => service.transform());
    res.json(transformedServices);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete service
 * @public
 */
exports.remove = (req, res, next) => {
  const service = req.locals.service;
  service.isActive = false;
  
  service
    .save()
    .then(savedService => res.json(savedService.transform()))
    .catch(e => next(e));
};
