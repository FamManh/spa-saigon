const express = require("express");
const validate = require("express-validation");
const controller = require("../../controllers/ledger.controller");
const { authorize, ADMIN, SUPERADMIN, LOGGED_USER } = require("../../middlewares/auth");
const {
  listLedgers,
  createLedger,
  reportLedger,
  updateLedger
} = require("../../validations/ledger.validation");

const router = express.Router();

/**
 * Load ledger when API with ledgerId route parameter is hit
 */
router.param("ledgerId", controller.load);


router
  .route("/report")
  .get(authorize(LOGGED_USER), validate(reportLedger), controller.report);

router
  .route("/")
  /**
   * @api {get} v1/ledgers List Ledgers
   * @apiDescription Get a list of ledgers
   * @apiVersion 1.0.0
   * @apiName ListLedgers
   * @apiGroup Ledger
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   Ledger's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Ledgers per page
   * @apiParam  {String}             [name]       Ledger's name
   * @apiParam  {String}             [email]      Ledger's email
   * @apiParam  {String=user,admin}  [role]       Ledger's role
   *
   * @apiSuccess {Object[]} ledgers List of ledgers.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated ledgers can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(authorize(LOGGED_USER), validate(listLedgers), controller.list)
  /**
   * @api {post} v1/ledgers Create Ledger
   * @apiDescription Create a new ledger
   * @apiVersion 1.0.0
   * @apiName CreateLedger
   * @apiGroup Ledger
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   Ledger's access token
   *
   * @apiParam  {String}             email     Ledger's email
   * @apiParam  {String{6..128}}     password  Ledger's password
   * @apiParam  {String{..128}}      [name]    Ledger's name
   * @apiParam  {String=ledger,admin}  [role]    Ledger's role
   *
   * @apiSuccess (Created 201) {String}  id         Ledger's id
   * @apiSuccess (Created 201) {String}  name       Ledger's name
   * @apiSuccess (Created 201) {String}  email      Ledger's email
   * @apiSuccess (Created 201) {String}  role       Ledger's role
   * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated ledgers can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(authorize(ADMIN), validate(createLedger), controller.create);

router
  .route("/:ledgerId")
  /**
   * @api {get} v1/ledgers/:id Get Ledger
   * @apiDescription Get ledger information
   * @apiVersion 1.0.0
   * @apiName GetLedger
   * @apiGroup Ledger
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   Ledger's access token
   *
   * @apiSuccess {String}  id         Ledger's id
   * @apiSuccess {String}  name       Ledger's name
   * @apiSuccess {String}  email      Ledger's email
   * @apiSuccess {String}  role       Ledger's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated ledgers can access the data
   * @apiError (Forbidden 403)    Forbidden    Only ledger with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     Ledger does not exist
   */
  .get(authorize(LOGGED_USER), controller.get)
  /**
   * @api {put} v1/ledgers/:id Replace Ledger
   * @apiDescription Replace the whole ledger document with a new one
   * @apiVersion 1.0.0
   * @apiName ReplaceLedger
   * @apiGroup Ledger
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   Ledger's access token
   *
   * @apiParam  {String=ledger,admin}  [role]    Ledger's role
   * (You must be an admin to change the ledger's role)
   *
   * @apiSuccess {String}  id         Ledger's id
   * @apiSuccess {String}  name       Ledger's name
   * @apiSuccess {String}  email      Ledger's email
   * @apiSuccess {String}  role       Ledger's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated ledgers can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only ledger with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Ledger does not exist
   */
  //   .put(authorize(LOGGED_USER), validate(replaceLedger), controller.replace)
  /**
   * @api {patch} v1/ledgers/:id Update Ledger
   * @apiDescription Update some fields of a ledger document
   * @apiVersion 1.0.0
   * @apiName UpdateLedger
   * @apiGroup Ledger
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   Ledger's access token
   *
   * @apiParam  {String}             email     Ledger's email
   * @apiParam  {String{6..128}}     password  Ledger's password
   * @apiParam  {String{..128}}      [name]    Ledger's name
   * @apiParam  {String=ledger,admin}  [role]    Ledger's role
   * (You must be an admin to change the ledger's role)
   *
   * @apiSuccess {String}  id         Ledger's id
   * @apiSuccess {String}  name       Ledger's name
   * @apiSuccess {String}  email      Ledger's email
   * @apiSuccess {String}  role       Ledger's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated ledgers can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only ledger with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Ledger does not exist
   */
  .patch(authorize(ADMIN), validate(updateLedger), controller.update)
  /**
   * @api {patch} v1/ledgers/:id Delete Ledger
   * @apiDescription Delete a ledger
   * @apiVersion 1.0.0
   * @apiName DeleteLedger
   * @apiGroup Ledger
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   Ledger's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated ledgers can delete the data
   * @apiError (Forbidden 403)    Forbidden     Only ledger with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      Ledger does not exist
   */
  .delete(authorize(ADMIN), controller.remove);


module.exports = router;
