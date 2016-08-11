const J = require("./common")
const imgur = require("imgur")
const env = require("dotenv-helper")
console.log("deyan8284@gmail.com", env.getEnv("imgurPassword"), env.getEnv("imgur"))
imgur.setCredentials("deyan8284@gmail.com", env.getEnv("imgurPassword"), env.getEnv("imgur"))
imgur.uploadFile("test.png").then(incoming=>{
    console.log(incoming.data.link)
})
