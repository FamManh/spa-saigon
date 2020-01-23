const mongoose = require("mongoose");
const httpStatus = require("http-status");
const { omitBy, isNil } = require("lodash");
const APIError = require("../utils/APIError");
const { ObjectId } = mongoose.Schema;
const moment = require("moment");

/**
 * Ledger Schema
 * @private
 */
const ledgerSchema = new mongoose.Schema(
  {
    vnname: { type: String, default: "" },
    runame: { type: String, default: "" },
    cash: { type: Number, default: 0 },
    certificate: { type: Number, default: 0 },
    duration: { type: Number, default: 0 },
    staff: { type: ObjectId, ref: "Staff", required: true },
    shift: { type: ObjectId, ref: "Shift", required: true },
    flag: { type: Boolean, default: false },
    createdBy: { type: ObjectId, ref: "User", required: true }
  },
  {
    timestamps: true
  }
);

/**
 * Methods
 */
ledgerSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      "id",
      "vnname",
      "runame",
      "cash",
      "certificate",
      "duration",
      "staff",
      "shift",
      "flag",
      "createdBy"
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
ledgerSchema.statics = {
  /**
   * Get ledger
   *
   * @param {ObjectId} id - The objectId of ledger.
   * @returns {Promise<Ledger, APIError>}
   */
  async get(id) {
    try {
      let ledger;

      if (mongoose.Types.ObjectId.isValid(id)) {
        ledger = await this.findById(id)
          .populate("staff", "name")
          .populate("createdBy", "name")
          .populate(
            "shift",
            "date branch lock cash certificate adminCash adminCertificate"
          )
          .exec();
      }
      if (ledger) {
        return ledger;
      }

      throw new APIError({
        message: "Ledger does not exist",
        status: httpStatus.NOT_FOUND
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * List ledgers in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of ledgers to be skipped.
   * @param {number} limit - Limit number of ledgers to be returned.
   * @returns {Promise<Ledger[]>}
   */
  list({ shift }) {
    const options = omitBy({ shift }, isNil);
    return (
      this.find(options)
        .populate("staff", "name")
        .populate("createdBy", "username")
        .populate(
          "shift",
          "date branch lock cash certificate adminCash adminCertificate"
        )
        .sort({ createdAt: -1 })
        //   .skip(perPage * (page - 1))
        //   .limit(perPage)
        .exec()
    );
  },
  /**
   * report ledgers.
   *
   * @param {number} type - Type of report ["staff", "month"].
   * @param {number} branch - Ledger's branch id.
   * @param {number} date - Date.
   * @param {number} flag - Ledger flag.
   * @returns {Promise<Ledger[]>}
   */
  report({ type, shiftIds, flag }) {
    flag = flag ? flag = {$ne: !!flag} : null;
    const options = omitBy({ flag }, isNil);
    if (type === "staff") {
      return this.aggregate([
        {
          $match: {
            $and: [
              {
                shift: { $in: shiftIds }
              },
              options
            ]
          }
        },
        {
          $lookup: {
            from: "staffs",
            localField: "staff",
            foreignField: "_id",
            as: "resultStaff"
          }
        },
        { $unwind: { path: "$resultStaff" } },
        {
          $group: {
            _id: "$resultStaff",
            count: { $sum: 1 },
            cash: { $sum: "$cash" },
            certificate: { $sum: "$certificate" },
            duration: { $sum: "$duration" }
          }
        },
        {
          $project: {
            "_id.name": 1,
            "_id._id": 1,
            "_id.runame": 1,
            "_id.career": 1,
            "_id.branch": 1,
            cash: 1,
            duration: 1,
            certificate: 1,
            count: 1
          }
        }
      ]).exec();
    }
  }
};

/**
 * @typedef Ledger
 */
module.exports = mongoose.model("Ledger", ledgerSchema);
