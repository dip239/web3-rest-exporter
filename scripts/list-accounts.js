#!/usr/bin/env node
'use strict';
var Web3 = require('web3');
var Promise = require('bluebird');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

return new Promise(function(resolve,reject) {
   web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
         alert("There was an error fetching your accounts.");
         reject(err);
      }
      accs.forEach(function (acc) {
         var balance = web3.eth.getBalance(acc);
         console.log(acc + ' '+ balance);
      });
      resolve(accs);
   });
});

