/**
 * ChecksController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

 module.exports = {


  /**
   * Action blueprints:
   *    `/checks/index`
   *    `/checks`
   */
   index: function (req, res) {

    var checks = [
    {
      _id: "201404161714QV398-LHS1EMUY",
      label: "app2.nj",
      type: "HTTP",
      enabled: "active",
      public: false,
      uuid: "pwyoa3id-p2nu-4b7o-8c1c-0qqfekcaukl7",
      live: true
    }
    ]

    return res.json(checks);
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ChecksController)
   */
   _config: {}


 };
