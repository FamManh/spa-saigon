const express = require("express");
const validate = require("express-validation");
const controller = require("../../controllers/note.controller");
const { authorize, LOGGED_USER } = require("../../middlewares/auth");
const {
  listNotes,
  createNote,
  updateNote
} = require("../../validations/note.validation");

const router = express.Router();

/**
 * Load note when API with noteId route parameter is hit
 */
router.param("noteId", controller.load);

router
  .route("/")
  /**
   * @api {get} v1/notes List Notes
   * @apiDescription Get a list of notes
   * @apiVersion 1.0.0
   * @apiName ListNotes
   * @apiGroup Note
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   Note's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Notes per page
   * @apiParam  {String}             [name]       Note's name
   * @apiParam  {String}             [email]      Note's email
   * @apiParam  {String=user,admin}  [role]       Note's role
   *
   * @apiSuccess {Object[]} notes List of notes.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated notes can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(authorize(LOGGED_USER), validate(listNotes), controller.list)
  /**
   * @api {post} v1/notes Create Note
   * @apiDescription Create a new note
   * @apiVersion 1.0.0
   * @apiName CreateNote
   * @apiGroup Note
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   Note's access token
   *
   * @apiParam  {String}             email     Note's email
   * @apiParam  {String{6..128}}     password  Note's password
   * @apiParam  {String{..128}}      [name]    Note's name
   * @apiParam  {String=note,admin}  [role]    Note's role
   *
   * @apiSuccess (Created 201) {String}  id         Note's id
   * @apiSuccess (Created 201) {String}  name       Note's name
   * @apiSuccess (Created 201) {String}  email      Note's email
   * @apiSuccess (Created 201) {String}  role       Note's role
   * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated notes can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(authorize(LOGGED_USER), validate(createNote), controller.create);

router
  .route("/:noteId")
  /**
   * @api {get} v1/notes/:id Get Note
   * @apiDescription Get note information
   * @apiVersion 1.0.0
   * @apiName GetNote
   * @apiGroup Note
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   Note's access token
   *
   * @apiSuccess {String}  id         Note's id
   * @apiSuccess {String}  name       Note's name
   * @apiSuccess {String}  email      Note's email
   * @apiSuccess {String}  role       Note's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated notes can access the data
   * @apiError (Forbidden 403)    Forbidden    Only note with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     Note does not exist
   */
  .get(authorize(LOGGED_USER), controller.get)
  /**
   * @api {put} v1/notes/:id Replace Note
   * @apiDescription Replace the whole note document with a new one
   * @apiVersion 1.0.0
   * @apiName ReplaceNote
   * @apiGroup Note
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   Note's access token
   *
   * @apiParam  {String=note,admin}  [role]    Note's role
   * (You must be an admin to change the note's role)
   *
   * @apiSuccess {String}  id         Note's id
   * @apiSuccess {String}  name       Note's name
   * @apiSuccess {String}  email      Note's email
   * @apiSuccess {String}  role       Note's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated notes can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only note with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Note does not exist
   */
  //   .put(authorize(LOGGED_USER), validate(replaceNote), controller.replace)
  /**
   * @api {patch} v1/notes/:id Update Note
   * @apiDescription Update some fields of a note document
   * @apiVersion 1.0.0
   * @apiName UpdateNote
   * @apiGroup Note
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   Note's access token
   *
   * @apiParam  {String}             email     Note's email
   * @apiParam  {String{6..128}}     password  Note's password
   * @apiParam  {String{..128}}      [name]    Note's name
   * @apiParam  {String=note,admin}  [role]    Note's role
   * (You must be an admin to change the note's role)
   *
   * @apiSuccess {String}  id         Note's id
   * @apiSuccess {String}  name       Note's name
   * @apiSuccess {String}  email      Note's email
   * @apiSuccess {String}  role       Note's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated notes can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only note with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Note does not exist
   */
  .patch(authorize(LOGGED_USER), validate(updateNote), controller.update)
  /**
   * @api {patch} v1/notes/:id Delete Note
   * @apiDescription Delete a note
   * @apiVersion 1.0.0
   * @apiName DeleteNote
   * @apiGroup Note
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   Note's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated notes can delete the data
   * @apiError (Forbidden 403)    Forbidden     Only note with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      Note does not exist
   */
  .delete(authorize(LOGGED_USER), controller.remove);

module.exports = router;
