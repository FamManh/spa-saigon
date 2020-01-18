const Joi = require("joi");
const Staff = require("../models/staff.model");
module.exports = {
  // GET /v1/staffs
  listStaffs: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number()
        .min(1)
        .max(100),
      name: Joi.string(),
      runame: Joi.string(),
      branch: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/),
      career: Joi.string()
    }
  },

  // POST /v1/staffs
  createStaff: {
    body: {
      name: Joi.string()
        .min(3)
        .max(128)
        .required(),
      runame: Joi.string()
        .min(3)
        .max(128),
      branch: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
      career: Joi.string()
        .valid(Staff.careers)
        .required()
    }
  },

  // PUT /v1/staffs/:staffId
  replaceStaff: {
    body: {
      name: Joi.string()
        .min(3)
        .max(128),
      runame: Joi.string()
        .min(3)
        .max(128),
      branch: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
      career: Joi.string().valid(Staff.careers)
    },
    params: {
      staffId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  },

  // PATCH /v1/staffs/:staffId
  updateStaff: {
    body: {
      name: Joi.string()
        .min(3)
        .max(128),
      runame: Joi.string()
        .min(3)
        .max(128),
      branch: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
      career: Joi.string().valid(Staff.careers)
    },
    params: {
      staffId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  }
};
