const httpStatus = require("http-status");
const Ledger = require("../models/ledger.model");

/**
 * Load ledger and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const ledger = await Ledger.get(id);
    req.locals = { ledger };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get ledger
 * @public
 */
exports.get = (req, res) => res.json(req.locals.ledger.transform());

/**
 * Create new ledger
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const ledger = new Ledger({ ...req.body, createdBy: req.user.id});
    let savedLedger = await ledger.save();
    savedLedger = await savedLedger.populate('staff', 'name').populate('createdBy', 'username').execPopulate();
    res.status(httpStatus.CREATED);
    res.json(savedLedger.transform());
  } catch (error) {
    next(error);
  }
};

/**
 * Update existing ledger
 * @public
 */
exports.update = (req, res, next) => {
  const ledger = Object.assign(req.locals.ledger, req.body);
  ledger
    .save()
    .then(savedLedger => savedLedger.populate('staff', 'name').populate('createdBy', 'username').execPopulate())
    .then(savedLedger => res.json(savedLedger.transform()))
    .catch(e => next(Ledger.checkDuplicateLedgername(e)));
};

/**
 * Get ledger list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const ledgers = await Ledger.list(req.query);
    const transformedLedgers = ledgers.map(ledger => ledger.transform());
    res.json(transformedLedgers);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete ledger
 * @public
 */
exports.remove = (req, res, next) => {
  const ledger = req.locals.ledger;
  
  ledger
    .remove()
    .then(savedLedger => res.json(savedLedger.transform()))
    .catch(e => next(e));
};
