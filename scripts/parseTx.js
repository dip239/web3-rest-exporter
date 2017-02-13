#!/usr/bin/env node
'use strict';
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const abiLoader = require('../lib/abi-loader.js')(web3);
const txParser = require('../lib/tx-abi-parser.js');
const JSONbig = require('json-bigint');
const fs = require('fs');
const Promise = require('bluebird');


const knownAbi = abiLoader.fromDir('../test/abi/*.abi.json');


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
   return result.filter(function(e){
      return e != null;
   })
   .map(function(tx){
      if (typeof knownAbi[tx.to] != 'undefined') {
         return txParser.parseAll(tx, knownAbi[tx.to]);
      }
   })
   .filter(function(e){return typeof e !== 'undefined'})
   .sort(function(a,b){return a.seqNr === b.seqNr ? 0 : a.seqNr < b.seqNr ? -1: 1 });
}).then(function(events){
   fs.writeFileSync('parsedCalls.json',JSONbig.stringify(events));
});

