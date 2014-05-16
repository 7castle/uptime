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

 var https = require('https');
 var config = require('../../config');
 module.exports = {


  /**
   * Action blueprints:
   *    `/checks/index`
   *    `/checks`
   */
   index: function (req, res) {

    var checks = [
    // {
    //   // _id: "201404161714QV398-LHS1EMUY",
    //   // label: "app2.nj",
    //   // type: "HTTP",
    //   // enabled: "active",
    //   // public: false,
    //   // uuid: "pwyoa3id-p2nu-4b7o-8c1c-0qqfekcaukl7",
    //   // live: true
    // }
    ]

    var nodeping_checks = "https://api.nodeping.com/api/1/checks?token=" + config.nodeping.token;
    var nodeping_current = "https://api.nodeping.com/api/1/results/current?token=" + config.nodeping.token;
    var checksObj;
    var currentObj;

    https.get(nodeping_checks, function(response){
      var data = '';
      response.on('data', function (chunk) {
        data += chunk;
      });

      response.on('end',function(){
        checksObj = JSON.parse(data);

        https.get(nodeping_current, function(currentRes){
          var currentData = '';
          currentRes.on('data', function(chunk){
            currentData+= chunk;
          });

          currentRes.on('end', function(){
            currentObj = JSON.parse(currentData);

            for(var obj in checksObj)
            {
              var live = true;
              if(currentObj[obj])
              {
                live = false;
              }
              var temp = {
                _id: checksObj[obj]._id,
                label: checksObj[obj].label,
                type: checksObj[obj].type,
                enabled: checksObj[obj].enable,
                public: checksObj[obj].public,
                uuid: checksObj[obj].uuid,
                live: live
              };

              checks.push(temp);

            }

            return res.json(checks);
          });
        }).on('error', function(e){
          console.log("Error: " + e.message);
        });
        
      });
      
    }).on('error', function(e){
      console.log("Error: " + e.message);
    });

  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ChecksController)
   */
   _config: {}


 };
