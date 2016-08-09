var sf = require('jsforce');

    exports.Connect = function conn(callback) {
        var conn = new sf.Connection({
          // you can change loginUrl to connect to sandbox or prerelease env.
          // loginUrl : 'https://test.salesforce.com'
        });
        conn.login('iamnode@salesforce.com', 'nodelife12369trd8Xf40Lkyv3Sfaurr1Cx', function(err, userInfo) {
          if (err) { return callback(err, null); }
          // Now you can get the access token and instance URL information.
          // Save them to establish connection next time.
          // ...
          return callback(null, conn); //return connection on callback
        });
    }