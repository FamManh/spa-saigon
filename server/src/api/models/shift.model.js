const mongoose = require("mongoose");
const httpStatus = require("http-status");
const { omitBy, isNil } = require("lodash");
const APIError = require("../utils/APIError");
const moment = require("moment");
const { ObjectId } = mongoose.Schema;

/**
 * Shift Schema
 * @private
 */
const shiftSchema = new mongoose.Schema(
  {
    date: {
      type: Number,
      required: true
    },
    branch: {
      type: ObjectId,
      ref: "Branch",
      required: true
    },
    lock: {
      type: Boolean,
      default: false
    },
    cash: {
      type: Number,
      default: 0
    },
    certificate: {
      type: Number,
      default: 0
    },
    adminCash: {
      type: Number,
      default: 0
    },
    adminCertificate: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

/**
 * Methods
 */
shiftSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      "id",
      "date",
      "branch",
      "lock",
      "cash",
      "certificate",
      "adminCash",
      "adminCertificate"
    ];

    fields.forEach(field => {
      transformed[field] = this[field];
    });

    return transformed;
  }
});

/**
 * Statics
 */
shiftSchema.statics = {
  /**
   * Get shift
   *
   * @param {ObjectId} id - The objectId of shift.
   * @returns {Promise<Shift, APIError>}
   */
  async get(id) {
    try {
      let shift;

      if (mongoose.Types.ObjectId.isValid(id)) {
        shift = await this.findById(id)
          .populate("branch", "name")
          .exec();
      }
      if (shift) {
        return shift;
      }

      throw new APIError({
        message: "Shift does not exist",
        status: httpStatus.NOT_FOUND
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * List shifts in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of shifts to be skipped.
   * @param {number} limit - Limit number of shifts to be returned.
   * @returns {Promise<Shift[]>}
   */
  list({ branch, start, end }) {
    const options = omitBy({ branch }, isNil);
    start = Number(start);
    end = Number(end);

    return this.find({
      $and: [
        {
          date: {
            $gte: moment(start)
              .startOf("day")
              .toDate(),
            $lte: moment(end)
              .endOf("day")
              .toDate()
          }
        },
        options
      ]
    })
      .sort({ date: 1 })
      .populate("branch", "name")
      .exec();
  },
  checkDuplicate(date, branchId) {
    return this.find({
      $and: [
        {
          date: {
            $gte: moment(date)
              .startOf("day")
              .toDate(),
            $lte: moment(date)
              .endOf("day")
              .toDate()
          }
        },
        { branch: branchId }
      ]
    }).exec();
  }
};

/**
 * @typedef Shift
 */
module.exports = mongoose.model("Shift", shiftSchema);
