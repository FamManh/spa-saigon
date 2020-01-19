const express = require("express");
const validate = require("express-validation");
const controller = require("../../controllers/shift.controller");
const { authorize, ADMIN, SUPERADMIN, LOGGED_USER } = require("../../middlewares/auth");
const {
  listShifts,
  createShift,
  replaceShift,
  updateShift
} = require("../../validations/shift.validation");

const router = express.Router();

/**
 * Load shift when API with shiftId route parameter is hit
 */
router.param("shiftId", controller.load);

router
  .route("/")
  /**
   * @api {get} v1/shifts List Shifts
   * @apiDescription Get a list of shifts
   * @apiVersion 1.0.0
   * @apiName ListShifts
   * @apiGroup Shift
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   Shift's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Shifts per page
   * @apiParam  {String}             [name]       Shift's name
   * @apiParam  {String}             [email]      Shift's email
   * @apiParam  {String=user,admin}  [role]       Shift's role
   *
   * @apiSuccess {Object[]} shifts List of shifts.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated shifts can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(authorize(LOGGED_USER), validate(listShifts), controller.list)
  /**
   * @api {post} v1/shifts Create Shift
   * @apiDescription Create a new shift
   * @apiVersion 1.0.0
   * @apiName CreateShift
   * @apiGroup Shift
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   Shift's access token
   *
   * @apiParam  {String}             email     Shift's email
   * @apiParam  {String{6..128}}     password  Shift's password
   * @apiParam  {String{..128}}      [name]    Shift's name
   * @apiParam  {String=shift,admin}  [role]    Shift's role
   *
   * @apiSuccess (Created 201) {String}  id         Shift's id
   * @apiSuccess (Created 201) {String}  name       Shift's name
   * @apiSuccess (Created 201) {String}  email      Shift's email
   * @apiSuccess (Created 201) {String}  role       Shift's role
   * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated shifts can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(authorize(ADMIN), validate(createShift), controller.create);

router
  .route("/:shiftId")
  /**
   * @api {get} v1/shifts/:id Get Shift
   * @apiDescription Get shift information
   * @apiVersion 1.0.0
   * @apiName GetShift
   * @apiGroup Shift
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   Shift's access token
   *
   * @apiSuccess {String}  id         Shift's id
   * @apiSuccess {String}  name       Shift's name
   * @apiSuccess {String}  email      Shift's email
   * @apiSuccess {String}  role       Shift's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated shifts can access the data
   * @apiError (Forbidden 403)    Forbidden    Only shift with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     Shift does not exist
   */
  .get(authorize(LOGGED_USER), controller.get)
  /**
   * @api {put} v1/shifts/:id Replace Shift
   * @apiDescription Replace the whole shift document with a new one
   * @apiVersion 1.0.0
   * @apiName ReplaceShift
   * @apiGroup Shift
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   Shift's access token
   *
   * @apiParam  {String=shift,admin}  [role]    Shift's role
   * (You must be an admin to change the shift's role)
   *
   * @apiSuccess {String}  id         Shift's id
   * @apiSuccess {String}  name       Shift's name
   * @apiSuccess {String}  email      Shift's email
   * @apiSuccess {String}  role       Shift's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated shifts can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only shift with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Shift does not exist
   */
  //   .put(authorize(LOGGED_USER), validate(replaceShift), controller.replace)
  /**
   * @api {patch} v1/shifts/:id Update Shift
   * @apiDescription Update some fields of a shift document
   * @apiVersion 1.0.0
   * @apiName UpdateShift
   * @apiGroup Shift
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   Shift's access token
   *
   * @apiParam  {String}             email     Shift's email
   * @apiParam  {String{6..128}}     password  Shift's password
   * @apiParam  {String{..128}}      [name]    Shift's name
   * @apiParam  {String=shift,admin}  [role]    Shift's role
   * (You must be an admin to change the shift's role)
   *
   * @apiSuccess {String}  id         Shift's id
   * @apiSuccess {String}  name       Shift's name
   * @apiSuccess {String}  email      Shift's email
   * @apiSuccess {String}  role       Shift's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated shifts can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only shift with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Shift does not exist
   */
  .patch(authorize(ADMIN), validate(updateShift), controller.update)
  /**
   * @api {patch} v1/shifts/:id Delete Shift
   * @apiDescription Delete a shift
   * @apiVersion 1.0.0
   * @apiName DeleteShift
   * @apiGroup Shift
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   Shift's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated shifts can delete the data
   * @apiError (Forbidden 403)    Forbidden     Only shift with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      Shift does not exist
   */
  .delete(authorize(ADMIN), controller.remove);

module.exports = router;
