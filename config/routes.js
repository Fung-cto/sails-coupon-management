/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  //'/': { view: 'pages/homepage' },
  //'/': { view: 'pages/index' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/
 'GET /coupon/create': 'CouponController.create',
 'POST /coupon/create': 'CouponController.create',

 'GET /': 'CouponController.index',
 'GET /coupon': 'CouponController.list',
 'GET /coupon/list': 'CouponController.list',
 'GET /coupon/json': 'CouponController.json',

 'GET /coupon/read/:id': 'CouponController.read',
 //'POST /coupon/delete/:id': 'CouponController.delete',
 'DELETE /coupon/delete/:id': 'CouponController.delete',
 'GET /coupon/update/:id': 'CouponController.update',
 'POST /coupon/update/:id': 'CouponController.update',

 'GET /coupon/search': 'CouponController.search',
 'GET /coupon/paginate': 'CouponController.paginate',

 'GET /user': 'UserController.login',
 'GET /user/login': 'UserController.login',
 'POST /user/login': 'UserController.login',
 'POST /user/logout': 'UserController.logout',

 'GET /coupon/:id/belong': 'CouponController.populate',
 'GET /user/:id/owners': 'UserController.populate',
 'POST /user/:id/owners/add/:fk': 'UserController.add',
 'GET /user/:id/owners/check/:fk': 'UserController.check',
 'POST /user/:id/owners/remove/:fk': 'UserController.remove',
};
