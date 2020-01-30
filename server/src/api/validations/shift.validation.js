const Joi = require('joi');

module.exports = {
  // GET /v1/shifts
  listShifts: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number()
        .min(1)
        .max(100),
      start: Joi.date()
        .timestamp()
        .required(),
      start: Joi.date()
        .timestamp()
        .required(),
      branch: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        // .required()
    }
  },

  // POST /v1/shifts
  createShift: {
    body: {
      date: Joi.date().required(),
      branch: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
      cash: Joi.number(),
      certificate: Joi.number(),
      adminCash: Joi.number(),
      adminCertificate: Joi.number(),
      lock: Joi.boolean()
    }
  },

  // PATCH /v1/shifts/:shiftId
  updateShift: {
    body: {
      date: Joi.date(),
      branch: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
      cash: Joi.number(),
      certificate: Joi.number(),
      adminCash: Joi.number(),
      adminCertificate: Joi.number(),
      lock: Joi.boolean()
    },
    params: {
      shiftId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  }
};
