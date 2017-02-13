'use strict';
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var glob = require("glob-promise");

var SolidityCoder = require('web3/lib/solidity/coder.js');

var lastImportedNr = web3.eth.blockNumber - 50;

function jsonifyArrayWithoutBrackets(a) {
  var output = [];
  for (var i=0; i<a.length; i++) {
    output.push(JSON.stringify(a[i]));
  }
  return output.join(',');
}

function readFullBlockInfo(blockNr){
  var blockInfo = web3.eth.getBlock(blockNr);
  var txCount = web3.eth.getBlockTransactionCount(blockNr);
  blockInfo.txInfo = [];
  for(var txNr = 0; txNr < txCount; ++txNr) {
    var txInfo = web3.eth.getTransactionFromBlock(blockNr,txNr);
    var txReceipt = web3.eth.getTransactionReceipt(txInfo.hash);
    txInfo.txReceipt=txReceipt;
    blockInfo.txInfo.push(txInfo);
//    console.log(txInfo);
  }
  return blockInfo;
}

var rawTxHex='0xcaeaec1e0000000000000000000000000000000000000000000000000000000000000004';

var aerocraftAddr = '';
var txHash = '0x6d3b2ce4d5280e20faae49d674b4fd3ea26310e6e37023bc4007f9a7546b4ed7';

var tx = web3.eth.getTransaction(txHash);
var txReceipt = web3.eth.getTransactionReceipt(txHash);
console.log(JSON.stringify({tx:tx,receipt:txReceipt}));


//for(var blockNr=lastImportedNr; blockNr<web3.eth.blockNumber ; ++blockNr) {
//}

//var blk1723250_info = readFullBlockInfo(1723250);

//console.log(JSON.stringify(blk1723250_info));

//console.log(web3.sha3('bookFlightHours(uint64)'));
