'use strict';
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var glob = require("glob-promise");

var SolidityCoder = require('web3/lib/solidity/coder.js');

var lastImportedNr = web3.eth.blockNumber - 50;

function jsonifyArrayWithoutBrackets(a) {
  var output = [];
  for (var i=0; i<a.length; i++)
    output.push(JSON.stringify(a[i]));
  return output.join(',');
}

function mapMethodId(abi){
  var methodMap = {};
  abi.forEach(m => {
    var argtypes = m.inputs.map(m=>{return m.type});
    var signatur = m.name + '('+argtypes.join(',')+')';
    var methodId = web3.sha3(signatur).substring(2,10);
    methodMap[methodId] = { name: signatur, argtypes : argtypes };
  });
  return methodMap;
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

function parseMethodCall(rawTxHex){
  if (rawTxHex.startsWith('0x')) rawTxHex = rawTxHex.substring(2);
  var methodId = rawTxHex.substring(0,8);
  var methodInfo = parsedAbi[methodId];
  return SolidityCoder.decodeParams (
      methodInfo.argtypes,
      rawTxHex.substring(8)
  )
          //.map(bint=>{return bint.valueOf()});
}
//for(var blockNr=lastImportedNr; blockNr<web3.eth.blockNumber ; ++blockNr) {
//}

//var blk1723250_info = readFullBlockInfo(1723250);

//console.log(JSON.stringify(blk1723250_info));

//console.log(web3.sha3('bookFlightHours(uint64)'));


glob("./test/abi/*.abi.json")
.then( files => {
    var knownAbi = {};
    files.map(f => {
      var abiInfo = require(f);
      knownAbi[abiInfo.address] = abiInfo.abi;
    });
    return knownAbi;
  }).then(knownAbi => {
    console.log(knownAbi);
});
//    console.log(parseMethodCall(rawTxHex));

