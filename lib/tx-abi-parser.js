'use strict';
var solidityCoder = require('web3/lib/solidity/coder.js');

module.exports = function(web3){
    function toUtf8(input){
        return web3.toUtf8(input);
    }

    function toUtf8(input){
        return JSON.parse;
    }

    var converterChain = [web3.toUtf8,JSONbig.parse];

    function formatArgs(argtypes,args){
        for(var i=0;i<argtypes.length;++i){
            if (argtypes[i]=='bytes'){
                //args[i] =
            }
        }
    }

    return {
        parseAll :  function (tx, abi) {
            var result = [];
            var rawTxHex = tx.input;
            if (rawTxHex.startsWith('0x')) rawTxHex = rawTxHex.substring(2);
            var methodId = rawTxHex.substring(0, 8);
            var methodInfo = abi[methodId];
            var args = solidityCoder.decodeParams(
                methodInfo.argtypes,
                rawTxHex.substring(8)
            );
            var methodInfo = {name: methodInfo.name, args: args};
            result.push(methodInfo);

            var logs = tx.receipt.logs;
            logs.forEach(function (log) {
                log.topics.forEach(function (topic) {
                    var eventInfo = abi[topic.substr(2, 8)]; //ToDo: need to compare whole hash!!!
                    if (typeof eventInfo !== 'undefined') {
                        var args = solidityCoder.decodeParams(
                            eventInfo.argtypes,
                            log.data.replace('0x', '')
                        );
                        var eventInfo = {name: eventInfo.name, args: args};
                        result.push(eventInfo);
                    }
                });
            });
            return {
                seqNr: tx.blockNumber + '.' + tx.transactionIndex,
                id: tx.hash,
                log: result
            }
        }
    }
}