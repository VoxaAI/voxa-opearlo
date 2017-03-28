'use strict'

let path = require('path');

exports.appNameFromDir = function(dir){
  dir = dir || __dirname;
  let re = /([^\/]+)\/node_modules/
  let match = re.exec(dir);
  if(!match) return null;
  return match[1]
}

exports.appNameFromEnv = function(dir){
 return process.env.AWS_LAMBDA_FUNCTION_NAME
}

exports.appName = function () {
  return exports.appNameFromEnv() ||  exports.appNameFromDir() || 'unknown'
}

exports.versionFromEnv = function () {
 let version = process.env.AWS_LAMBDA_FUNCTION_VERSION;
 if(version === '$Latest') return null;
 return version || null;
}

exports.versionFromPackage = function () {
  try {
    var json = require(path.join(__dirname,'../../../package.json'))
    return json.version || null;
  }
  catch(e) { return null; }
}

exports.appVersion = function () {
  return exports.versionFromEnv() ||  exports.versionFromPackage() || null;
}
