const siege = require("siege")
siege()
  .on(3000)
  .concurrent(1000)
  .for(5000).times
  .get("/")
  .attack()
