const express = require("express");
const validate = require("express-validation");
const controller = require("../../controllers/service.controller");
const { authorize, ADMIN, SUPERADMIN, LOGGED_USER } = require("../../middlewares/auth");
const {
  listServices,
  createService,
  replaceService,
  updateService
} = require("../../validations/service.validation");

const router = express.Router();

/**
 * Load service when API with serviceId route parameter is hit
 */
router.param("serviceId", controller.load);

router
  .route("/")
  /**
   * @api {get} v1/services List Services
   * @apiDescription Get a list of services
   * @apiVersion 1.0.0
   * @apiName ListServices
   * @apiGroup Service
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   Service's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Services per page
   * @apiParam  {String}             [name]       Service's name
   * @apiParam  {String}             [code]      Service's code
   * @apiParam  {String}             [branch]      Service's branch id
   * @apiParam  {Boolean}             [favorite]      Service's favorite
   * @apiParam  {Array}             [items]      Service's items
   *
   * @apiSuccess {Object[]} services List of services.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated services can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(authorize(LOGGED_USER), validate(listServices), controller.list)
  /**
   * @api {post} v1/services Create Service
   * @apiDescription Create a new service
   * @apiVersion 1.0.0
   * @apiName CreateService
   * @apiGroup Service
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   Service's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Services per page
   * @apiParam  {String}             [name]       Service's name
   * @apiParam  {String}             [code]      Service's code
   * @apiParam  {String}             [branch]      Service's branch id
   * @apiParam  {Boolean}             [favorite]      Service's favorite
   * @apiParam  {Array}             [items]      Service's items
   *
   * @apiSuccess (Created 201)  {String}             [name]       Service's name
   * @apiSuccess (Created 201)  {String}             [code]      Service's code
   * @apiSuccess (Created 201)  {String}             [branch]      Service's branch id
   * @apiSuccess (Created 201)  {Boolean}             [favorite]      Service's favorite
   * @apiSuccess (Created 201)  {Array}             [items]      Service's items
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated services can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(authorize(ADMIN), validate(createService), controller.create);

router
  .route("/:serviceId")
  /**
   * @api {get} v1/services/:id Get Service
   * @apiDescription Get service information
   * @apiVersion 1.0.0
   * @apiName GetService
   * @apiGroup Service
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   Service's access token
   *
   * @apiSuccess {String}             [name]       Service's name
   * @apiSuccess {String}             [code]      Service's code
   * @apiSuccess {String}             [branch]      Service's branch id
   * @apiSuccess {Boolean}             [favorite]      Service's favorite
   * @apiSuccess {Array}             [items]      Service's items
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated services can access the data
   * @apiError (Forbidden 403)    Forbidden    Only service with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     Service does not exist
   */
  .get(authorize(LOGGED_USER), controller.get)
  /**
   * @api {put} v1/services/:id Replace Service
   * @apiDescription Replace the whole service document with a new one
   * @apiVersion 1.0.0
   * @apiName ReplaceService
   * @apiGroup Service
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   Service's access token
   *
   * @apiParam  {String=service,admin}  [role]    Service's role
   * (You must be an admin to change the service's role)
   *
   * @apiSuccess {String}             [name]       Service's name
   * @apiSuccess {String}             [code]      Service's code
   * @apiSuccess {String}             [branch]      Service's branch id
   * @apiSuccess {Boolean}             [favorite]      Service's favorite
   * @apiSuccess {Array}             [items]      Service's items
   *
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated services can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only service with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Service does not exist
   */
  //   .put(authorize(LOGGED_USER), validate(replaceService), controller.replace)
  /**
   * @api {patch} v1/services/:id Update Service
   * @apiDescription Update some fields of a service document
   * @apiVersion 1.0.0
   * @apiName UpdateService
   * @apiGroup Service
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   Service's access token
   *
   * @apiParam  {String}             email     Service's email
   * @apiParam  {String{6..128}}     password  Service's password
   * @apiParam  {String{..128}}      [name]    Service's name
   * @apiParam  {String=service,admin}  [role]    Service's role
   * (You must be an admin to change the service's role)
   *
   * @apiSuccess {String}             [name]       Service's name
   * @apiSuccess {String}             [code]      Service's code
   * @apiSuccess {String}             [branch]      Service's branch id
   * @apiSuccess {Boolean}             [favorite]      Service's favorite
   * @apiSuccess {Array}             [items]      Service's items
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated services can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only service with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Service does not exist
   */
  .patch(authorize(ADMIN), validate(updateService), controller.update)
  /**
   * @api {patch} v1/services/:id Delete Service
   * @apiDescription Delete a service
   * @apiVersion 1.0.0
   * @apiName DeleteService
   * @apiGroup Service
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   Service's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated services can delete the data
   * @apiError (Forbidden 403)    Forbidden     Only service with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      Service does not exist
   */
  .delete(authorize(ADMIN), controller.remove);

module.exports = router;
