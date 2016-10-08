var glob = require('glob-promise')
//var glob = require('glob-fs')

module.exports = {
    fromDir: function (abiDir) {
        return glob(abiDir)
            .then(function (files) {
                var knownAbi = {};
                console.log(files)
                files.map(function (f) {
                    var abiInfo = require(f);
                    knownAbi[abiInfo.address] = abiInfo.abi;
                });
                return knownAbi;
            });
    }
}
