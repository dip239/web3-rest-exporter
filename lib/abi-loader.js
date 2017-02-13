'use strict';
const glob = require('glob-fs')({ gitignore: true });
const path = require('path');

module.exports = function(){
    function mapMethodId(web3,abi){
        var methodMap = {};
        abi.forEach(function(m){
            var argtypes = m.inputs.map(m=>{return m.type;});
            if (m.type=='function' || m.type=='event') {
                var signatur = m.name + '(' + argtypes.join(',') + ')';
                var sigHash = web3.sha3(signatur);
                var methodId = sigHash.substring(2, 10);
                methodMap[methodId] = {name: m.name, argtypes: argtypes};
            }
        });
        return methodMap;
    }

    return function (web3) {
        return {
            fromDir: function (abiGlob) {
                var knownAbiMap = {};
                glob.readdirSync(abiGlob).map(function (f) {
                    var abiInfo = require(path.join(process.cwd(), f));
                    knownAbiMap[abiInfo.address] = mapMethodId(web3,abiInfo.abi);
                });
                return knownAbiMap;
            }
        }
    }
}();
