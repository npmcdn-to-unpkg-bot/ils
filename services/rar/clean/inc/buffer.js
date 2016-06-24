var every = require("schedule").every
var Firebase = require("firebase")
var refId = new Firebase("https://boiling-heat-3122.firebaseio.com/id")
var ref = new Firebase("https://boiling-heat-3122.firebaseio.com/pocket")
var access_token = "inenv"

var bufferAPI = require("buffer-node"),
    api = bufferAPI(access_token)

every("10m").do(function() {
    refId.once("value",function(snapshot) {
        console.log("I start once every 20m")
        var lastId = snapshot.val().id

        ref.orderByChild("id").limitToLast(1).on("child_added",function(snapshot) {
            if(snapshot.val().id !== lastId) {
                console.log("will work")
                refId.set({id: lastId + 1})

                api.updates.create(snapshot.val().data.text + " | " + snapshot.val().data.url,["envbuffersecond"],{"media":snapshot.val().data.url}).then(
                        function(response) {
                            console.log("success")
                        },
                        function(err) {
                            console.log(err)
                        })
            }
        },
            function (errorObject) {
                console.log("The read failed: " + errorObject.code)
            })
    })
})
