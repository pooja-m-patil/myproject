var cfenv = require("cfenv");
var request = require("request");
var login;


// load local VCAP configuration  and service credentials
var vcapLocal;
try {
  vcapLocal = require('./vcap-local.json');
  console.log("Loaded local VCAP", vcapLocal);
} catch (e) { }

const appEnvOpts = vcapLocal ? { vcap: vcapLocal} : {}

const appEnv = cfenv.getAppEnv(appEnvOpts);

if (appEnv.services['cloudantNoSQLDB'] || appEnv.getService(/cloudant/)) {
  // Load the Cloudant library.
  var Cloudant = require('cloudant');

  // Initialize database with credentials
  if (appEnv.services['cloudantNoSQLDB']) {
     // CF service named 'cloudantNoSQLDB'
     var cloudant = Cloudant(appEnv.services['cloudantNoSQLDB'][0].credentials);
  } else {
     // user-provided service with 'cloudant' in its name
     var cloudant = Cloudant(appEnv.getService(/cloudant/).credentials);
  }

  //database name
  var dbName = 'login';

  // Create a new "mydb" database.
  cloudant.db.create(dbName, function(err, data) {
    if(!err) //err if database doesn't already exists
      console.log("Created database: " + dbName);
  });

  // Specify the database we are going to use (mydb)...
  login = cloudant.db.use(dbName);
}




// exports.getLoginInfo=function(callback)
// {
//   console.log("data");
//   var deviceId='asdcv';
//   var name='a';
//   login.insert({'deviceId':deviceId,'name':name},function(data) {
//     //console.log('Error:', err);
//     console.log(data);
//     callback(data);
// });
// }

exports.getLoginInfo=function(uname,pass,callback)
{
  var request = require("request");

var options = { method: 'POST',
  url: 'https://722fa7b8-0c41-4d59-ac8c-1c02d25eaef5-bluemix.cloudant.com/login/_find',
  headers: 
   { 'postman-token': '18067db6-21b2-15be-7192-1a7b93b4d29b',
     'cache-control': 'no-cache',
     'content-type': 'application/json',
     authorization: 'Basic NzIyZmE3YjgtMGM0MS00ZDU5LWFjOGMtMWMwMmQyNWVhZWY1LWJsdWVtaXg6YjdkZGQyOGJmNzU1ODk1Nzg4NjA3NDU3YmRmMjgyZGJmNzJkY2EzMTg3YzA1ZDIwMTZjYjAzNGU5MDI1MDFhNw==' },
  body: 
   { selector: { _id: { '$gt': '0' }, username: uname, password: pass },
     fields: [],
     sort: [ { _id: 'asc' } ] },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
    callback(body.bookmark);
  
});

}