const Joi = require('joi');

module.exports = {
  // GET /v1/ledgers
  listLedgers: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number()
        .min(1)
        .max(100),
      shift: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  },

  // POST /v1/ledgers
  createLedger: {
    body: {
      vnname: Joi.string()
        .allow("")
        .max(128),
      runame: Joi.string()
        .allow("")
        .max(128),
      cash: Joi.number(),
      certificate: Joi.number(),
      duration: Joi.number(),
      staff: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
      shift: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
      flag: Joi.boolean()
    }
  },

  // PATCH /v1/ledgers/:ledgerId
  updateLedger: {
    body: {
      vnname: Joi.string()
        .allow("")
        .max(128),
      runame: Joi.string()
        .allow("")
        .max(128),
      cash: Joi.number(),
      certificate: Joi.number(),
      duration: Joi.number(),
      staff: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
      shift: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
      flag: Joi.boolean()
    },
    params: {
      ledgerId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  }
};
