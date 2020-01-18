const express = require("express");
const validate = require("express-validation");
const controller = require("../../controllers/staff.controller");
const { authorize, ADMIN, SUPERADMIN, LOGGED_USER } = require("../../middlewares/auth");
const {
  listStaffs,
  createStaff,
  replaceStaff,
  updateStaff
} = require("../../validations/staff.validation");

const router = express.Router();

/**
 * Load staff when API with staffId route parameter is hit
 */
router.param("staffId", controller.load);

router
  .route("/")
  /**
   * @api {get} v1/staffs List Staffs
   * @apiDescription Get a list of staffs
   * @apiVersion 1.0.0
   * @apiName ListStaffs
   * @apiGroup Staff
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   Staff's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Staffs per page
   * @apiParam  {String}             [name]       Staff's name
   * @apiParam  {String}             [email]      Staff's email
   * @apiParam  {String=user,admin}  [role]       Staff's role
   *
   * @apiSuccess {Object[]} staffs List of staffs.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated staffs can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(authorize(LOGGED_USER), validate(listStaffs), controller.list)
  /**
   * @api {post} v1/staffs Create Staff
   * @apiDescription Create a new staff
   * @apiVersion 1.0.0
   * @apiName CreateStaff
   * @apiGroup Staff
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   Staff's access token
   *
   * @apiParam  {String}             email     Staff's email
   * @apiParam  {String{6..128}}     password  Staff's password
   * @apiParam  {String{..128}}      [name]    Staff's name
   * @apiParam  {String=staff,admin}  [role]    Staff's role
   *
   * @apiSuccess (Created 201) {String}  id         Staff's id
   * @apiSuccess (Created 201) {String}  name       Staff's name
   * @apiSuccess (Created 201) {String}  email      Staff's email
   * @apiSuccess (Created 201) {String}  role       Staff's role
   * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated staffs can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(authorize(ADMIN), validate(createStaff), controller.create);

router
  .route("/:staffId")
  /**
   * @api {get} v1/staffs/:id Get Staff
   * @apiDescription Get staff information
   * @apiVersion 1.0.0
   * @apiName GetStaff
   * @apiGroup Staff
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   Staff's access token
   *
   * @apiSuccess {String}  id         Staff's id
   * @apiSuccess {String}  name       Staff's name
   * @apiSuccess {String}  email      Staff's email
   * @apiSuccess {String}  role       Staff's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated staffs can access the data
   * @apiError (Forbidden 403)    Forbidden    Only staff with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     Staff does not exist
   */
  .get(authorize(LOGGED_USER), controller.get)
  /**
   * @api {put} v1/staffs/:id Replace Staff
   * @apiDescription Replace the whole staff document with a new one
   * @apiVersion 1.0.0
   * @apiName ReplaceStaff
   * @apiGroup Staff
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   Staff's access token
   *
   * @apiParam  {String=staff,admin}  [role]    Staff's role
   * (You must be an admin to change the staff's role)
   *
   * @apiSuccess {String}  id         Staff's id
   * @apiSuccess {String}  name       Staff's name
   * @apiSuccess {String}  email      Staff's email
   * @apiSuccess {String}  role       Staff's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated staffs can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only staff with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Staff does not exist
   */
  //   .put(authorize(LOGGED_USER), validate(replaceStaff), controller.replace)
  /**
   * @api {patch} v1/staffs/:id Update Staff
   * @apiDescription Update some fields of a staff document
   * @apiVersion 1.0.0
   * @apiName UpdateStaff
   * @apiGroup Staff
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   Staff's access token
   *
   * @apiParam  {String}             email     Staff's email
   * @apiParam  {String{6..128}}     password  Staff's password
   * @apiParam  {String{..128}}      [name]    Staff's name
   * @apiParam  {String=staff,admin}  [role]    Staff's role
   * (You must be an admin to change the staff's role)
   *
   * @apiSuccess {String}  id         Staff's id
   * @apiSuccess {String}  name       Staff's name
   * @apiSuccess {String}  email      Staff's email
   * @apiSuccess {String}  role       Staff's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated staffs can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only staff with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Staff does not exist
   */
  .patch(authorize(ADMIN), validate(updateStaff), controller.update)
  /**
   * @api {patch} v1/staffs/:id Delete Staff
   * @apiDescription Delete a staff
   * @apiVersion 1.0.0
   * @apiName DeleteStaff
   * @apiGroup Staff
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   Staff's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated staffs can delete the data
   * @apiError (Forbidden 403)    Forbidden     Only staff with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      Staff does not exist
   */
  .delete(authorize(ADMIN), controller.remove);

module.exports = router;
