const assert = require('chai').assert;
var abiLoader = require('../lib/abi-loader.js');
var RAW_TX_SAMPLES = [{
    rawTxHex: '0xcaeaec1e0000000000000000000000000000000000000000000000000000000000000004'
}]

RAW_TX_SAMPLES.forEach(function(sample,NN) {
    describe('Parse tx#' + NN + ' using preloaded abi', function () {
        var knownAbi;

        before('load abi', function(){
            return abiLoader.fromDir('./test/abi/*.abi.json')
                .then(function(loadedAbi){
                knownAbi = loadedAbi;
                console.log('=====================')
                console.log(loadedAbi)
            });
        });

        it('has defined rawTxHex',function(){
          assert.isDefined(sample.rawTxHex);
        });

        it('has loaded 1 abi',function(){
            assert.equal(1,knownAbi.length,"unexpected number of abi's loaded");
        });

    });
});