'use strict';
module.exports = function(serverConfig) {
  let logParams = serverConfig;
  delete logParams.ssl;
  delete logParams.log;
  delete logParams.user;
  delete logParams.proxy;
  console.log(logParams);
};
