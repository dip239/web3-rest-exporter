'use strict';
const assert = require('chai').assert;
const abiLoader = require('../lib/abi-loader.js');
const txParser = require('../lib/tx-abi-parser.js');

var RAW_TX_SAMPLES = [{
    rawTxHex: '0xcaeaec1e0000000000000000000000000000000000000000000000000000000000000004',
    address: "0x82f29ec6fe5e7edd336c9261522970d486b64119",
    rawTxDecoded: {name:'bookFlightHours', args:['4'] }
}]

RAW_TX_SAMPLES.forEach(function(sample,NN) {
    describe('Parse tx#' + NN + ' using preloaded abi', function () {
        var knownAbi = abiLoader.fromDir('./test/abi/*.abi.json');

        it('has defined rawTxHex ',function(){
          assert.isDefined(sample.rawTxHex);
        });

        it('has defined address',function(){
          assert.isDefined(knownAbi[sample.address]);
        });

        it('has contains tx call ',function(){
            var txMethod = txParser.parse(sample.rawTxHex,knownAbi[sample.address]);
            assert.deepEqual(sample.rawTxDecoded,txMethod, 'decoded methed mismatch')
        });

    });
});