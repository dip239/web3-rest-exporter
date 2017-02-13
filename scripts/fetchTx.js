#!/usr/bin/env node
'use strict';
const abiLoader = require('../lib/abi-loader.js');
const txParser = require('../lib/tx-abi-parser.js');
const JSONbig = require('json-bigint');
const fs = require('fs');
const Promise = require('bluebird')

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var knownAbi = abiLoader.fromDir('../test/abi/*.abi.json');
var txList = require('../test/data/txList.json');

return Promise.all(
   txList.map(function(txId,NN) {
      return new Promise(function(resolve,reject){
         web3.eth.getTransaction(txId,function(err,data){
            if(err !== null) return reject(err);
            if (data != null) {
               data.receipt = web3.eth.getTransactionReceipt(txId);
            } else {
               console.log('internal Tx: '+txId)
            }
            resolve(data);
         });
      });
   })
).then(function (result) {
   var resultNoNulls = result.filter(function(e){
      return e != null;
   });
   fs.writeFileSync('result.json',JSONbig.stringify(resultNoNulls));
});

