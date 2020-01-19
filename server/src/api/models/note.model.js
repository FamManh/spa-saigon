const mongoose = require("mongoose");
const httpStatus = require("http-status");
const { omitBy, isNil } = require("lodash");
const APIError = require("../utils/APIError");

/**
 * Note Schema
 * @private
 */
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 3,
    maxlength: 1000,
    trim: true,
    unique: true
  },
  isRead: {
    type: Boolean,
    default: false
  },
  createAt: { type: Date, default: Date.now }
});

/**
 * Methods
 */
noteSchema.method({
  transform() {
    const transformed = {};
    const fields = ["id", "content", "isRead"];

    fields.forEach(field => {
      transformed[field] = this[field];
    });

    return transformed;
  }
});

/**
 * Statics
 */
noteSchema.statics = {
  /**
   * Get note
   *
   * @param {ObjectId} id - The objectId of note.
   * @returns {Promise<Note, APIError>}
   */
  async get(id) {
    try {
      let note;

      if (mongoose.Types.ObjectId.isValid(id)) {
        note = await this.findById(id).exec();
      }
      if (note) {
        return note;
      }

      throw new APIError({
        message: "Note does not exist",
        status: httpStatus.NOT_FOUND
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * List notes in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of notes to be skipped.
   * @param {number} limit - Limit number of notes to be returned.
   * @returns {Promise<Note[]>}
   */
  list({ page = 1, perPage = 30 }) {
    return (
      this.find({})
        .sort({ isRead: 1 })
        .sort({ createAt: -1 })
          .skip(perPage * (page - 1))
          .limit(perPage)
        .exec()
    );
  },
};

/**
 * @typedef Note
 */
module.exports = mongoose.model("Note", noteSchema);
