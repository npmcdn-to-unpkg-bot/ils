var mongoose = require('mongoose');

module.exports = {
    create: function(inputObj, modelName, callback) {
        var modelHolder = mongoose.model(modelName);
        modelHolder.create(inputObj, function(error, data) {
            if (error) {
                callback(error, null);
                console.error('after callback!')
            }

            callback(null, data);
            console.log('Model name: ', modelName, ' succeeded');
        })
    },
    createSingle: function(inputObj, callback) {
        this.create(inputObj, "singleInstance", function(){
            callback()
        })
    },
    create: function(inputObj, callback) {
        this.create(inputObj, "singleInstance", function(){
            callback()
        })
    },
    deleteAll: function(callback) {
        var modelHolder = mongoose.model('singleInstance');
        modelHolder.remove({}, function(error) {
            if (error) {
                callback(error, null);
                console.error('after callback!')
            }
            callback(null, null);
        })
    }
};