const mongoose = require("mongoose");
const httpStatus = require("http-status");
const { omitBy, isNil } = require("lodash");
const APIError = require("../utils/APIError");

/**
 * User Roles
 */
const careers = ["masseur", "sauna"];

/**
 * Staff Schema
 * @private
 */
const staffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 128,
      trim: true,
      unique: true,
      required: true
    },
    runame: {
      type: String,
      minlength: 3,
      maxlength: 128,
      trim: true
    },
    branch: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Branch"
    },
    career: {
      type: String,
      enum: careers,
      default: "masseur"
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
staffSchema.method({
  transform() {
                const transformed = {};
                const fields = ["id", "name", "runame", "branch", "career"];
                fields.forEach(field => {
                  transformed[field] = this[field];
                });

                return transformed;
              }
});

/**
 * Statics
 */
staffSchema.statics = {
  careers,
  /**
   * Get staff
   *
   * @param {ObjectId} id - The objectId of staff.
   * @returns {Promise<Staff, APIError>}
   */
  async get(id) {
    try {
      let staff;

      if (mongoose.Types.ObjectId.isValid(id)) {
        staff = await this.findById(id)
          .populate("branch", "name")
          .select("id name runame branch career")
          .exec();
      }
      if (staff) {
        return staff;
      }

      throw new APIError({
        message: "Staff does not exist",
        status: httpStatus.NOT_FOUND
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * List staffs in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of staffs to be skipped.
   * @param {number} limit - Limit number of staffs to be returned.
   * @returns {Promise<Staff[]>}
   */
  list({ page = 1, perPage = 30, name, runame, branch, career }) {
    name = name ? new RegExp(name, "i") : null;
    runame = runame ? new RegExp(runame, "i") : null;
    const options = omitBy({ name, runame, branch, career }, isNil);
    options.isActive = true;
    return (
      this.find(options)
        .sort({ createdAt: -1 })
        .populate("branch", "name")
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
  checkDuplicateStaffname(error) {
    if (error.name === "MongoError" && error.code === 11000) {
      return new APIError({
        message: "Validation Error",
        errors: [
          {
            field: "name",
            location: "body",
            messages: ["'staff' already exists"]
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
 * @typedef Staff
 */
module.exports = mongoose.model("Staff", staffSchema);
