const madge = require('madge');
madge(`${__dirname}/hapi/routes/index.js`).then(res => {
        console.log(res.obj())
        console.log(res.depends())
        console.log(res.circular())
    })
    // https://github.com/pahen/madge
