var https = require('https');
var config = require('config');

var nodeping_checks = config.nodeping.host + "/api/1/checks?token=" + config.nodeping.token;
var nodeping_current = config.nodeping.host + "/api/1/results/current?token=" + config.nodeping.token;

module.exports = {

  index: function (req, res) {

    var checks = [];

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

    }).on('error', function(e){console.log("Error: " + e.message);});

  },

   _config: {}


 };
