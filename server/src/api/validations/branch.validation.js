const Joi = require('joi');
const Branch = require('../models/branch.model');

module.exports = {
  // GET /v1/branchs
  listBranchs: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number()
        .min(1)
        .max(100),
      name: Joi.string()
    }
  },

  // POST /v1/branchs
  createBranch: {
    body: {
      name: Joi.string()
        .min(3)
        .max(128)
        .required()
    }
  },

  // PUT /v1/branchs/:branchId
  replaceBranch: {
    body: {
      name: Joi.string()
        .min(3)
        .max(128)
    },
    params: {
      branchId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  },

  // PATCH /v1/branchs/:branchId
  updateBranch: {
    body: {
      name: Joi.string()
        .min(3)
        .max(128)
    },
    params: {
      branchId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  },
};
