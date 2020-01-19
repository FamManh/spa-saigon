const Joi = require('joi');

module.exports = {
  // GET /v1/notes
  listNotes: {
    query: {
      limit: Joi.number().min(1),
      skip: Joi.number()
    }
  },

  // POST /v1/notes
  createNote: {
    body: {
      content: Joi.string()
        .min(3)
        .max(1000)
        .required()
    }
  },

  // PATCH /v1/notes/:noteId
  updateNote: {
    body: {
      content: Joi.string()
        .min(3)
        .max(1000)
    },
    params: {
      noteId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  }
};
