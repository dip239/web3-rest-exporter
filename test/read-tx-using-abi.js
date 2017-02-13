#!/usr/bin/env mocha
'use strict';
const assert = require('chai').assert;
const mocha = require('mocha');
const abiLoader = require('../lib/abi-loader.js');
const txParser = require('../lib/tx-abi-parser.js');
const JSONbig = require('json-bigint');

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var RAW_TX_SAMPLES = [{
    rawTxHex: '0xcaeaec1e0000000000000000000000000000000000000000000000000000000000000004',
    address: "0x82f29ec6fe5e7edd336c9261522970d486b64119",
    rawTxDecoded: {name:'bookFlightHours', args:['4'] }
}]

var txList = require('../test/data/txList.json');
var knownAbi = abiLoader.fromDir('./abi/*.abi.json');
['0x6d3b2ce4d5280e20faae49d674b4fd3ea26310e6e37023bc4007f9a7546b4ed7'].forEach(function(txId,NN) {

    describe('Parse tx#' + NN + ' using preloaded abi', function () {
        var tx;
        before(' load Tx #'+NN, function () {
           console.log(txId);
           tx = web3.eth.getTransaction(txId);
           console.log(JSONbig.stringify(tx));
        });

        it('has defined rawTxHex ');

    });
});