const mongoose = require("mongoose");
const httpStatus = require("http-status");
const { omitBy, isNil } = require("lodash");
const APIError = require("../utils/APIError");

/**
 * Service Schema
 * @private
 */
const serviceSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      minlength: 1,
      maxlength: 128,
      uppercase: true,
      trim: true,
      unique: true
    },
    name: {
      type: String,
      minlength: 3,
      maxlength: 128,
      trim: true
    },
    items: [
      {
        vnname: String,
        runame: String,
        price: Number,
        duration: Number,
        sauna: Boolean
      }
    ],
    branch: { type: mongoose.SchemaTypes.ObjectId, ref: "Branch" },
    favorite: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

/**
 * Methods
 */
serviceSchema.method({
  transform() {
    const transformed = {};
    const fields = ["id", "code", "name", "items", "branch", "favorite"];

    fields.forEach(field => {
      transformed[field] = this[field];
    });

    return transformed;
  }
});

/**
 * Statics
 */
serviceSchema.statics = {
  /**
   * Get service
   *
   * @param {ObjectId} id - The objectId of service.
   * @returns {Promise<Service, APIError>}
   */
  async get(id) {
    try {
      let service;

      if (mongoose.Types.ObjectId.isValid(id)) {
        service = await this.findById(id)
          .populate("branch", "name")
          .select("id code name items branch favorite")
          .exec();
      }
      if (service) {
        return service;
      }

      throw new APIError({
        message: "Service does not exist",
        status: httpStatus.NOT_FOUND
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * List services in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of services to be skipped.
   * @param {number} limit - Limit number of services to be returned.
   * @returns {Promise<Service[]>}
   */
  list({ page = 1, perPage = 30, name, code, favorite, branch }) {
    name = name ? new RegExp(name, 'i') : null;
    code = code ? new RegExp(code, "i") : null;
    const options = omitBy({ name, code, favorite, branch }, isNil);
    options.isActive = true;
    return (
      this.find(options)
        .sort({ createdAt: -1 })
        //   .skip(perPage * (page - 1))
        //   .limit(perPage)
        .exec()
    );
  },

  /**
   * Return new validation error
   * if error is a mongoose duplicate key error
   *
   * @param {Error} error
   * @returns {Error|APIError}
   */
  checkDuplicateServicename(error) {
    if (error.name === "MongoError" && error.code === 11000) {
      return new APIError({
        message: "Validation Error",
        errors: [
          {
            field: "name",
            location: "body",
            messages: ["'service' already exists"]
          }
        ],
        status: httpStatus.CONFLICT,
        isPublic: true,
        stack: error.stack
      });
    }
    return error;
  }
};

/**
 * @typedef Service
 */
module.exports = mongoose.model("Service", serviceSchema);
