const httpStatus = require("http-status");
const Note = require("../models/note.model");

/**
 * Load note and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const note = await Note.get(id);
    req.locals = { note };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get note
 * @public
 */
exports.get = (req, res) => res.json(req.locals.note.transform());

/**
 * Create new note
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const note = new Note(req.body);
    const savedNote = await note.save();
    res.status(httpStatus.CREATED);
    res.json(savedNote.transform());
  } catch (error) {
    next(error);
  }
};

/**
 * Update existing note
 * @public
 */
exports.update = (req, res, next) => {
  const note = Object.assign(req.locals.note, req.body);
  note
    .save()
    .then(savedNote => res.json(savedNote.transform()))
    .catch(error=>next(error));
};

/**
 * Get note list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const notes = await Note.list(req.query);
    const transformedNotes = notes.map(note => note.transform());
    res.json(transformedNotes);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete note
 * @public
 */
exports.remove = (req, res, next) => {
  const note = req.locals.note;
  
  note
    .remove()
    .then(removedNote => res.json(removedNote.transform()))
    .catch(e => next(e));
};
