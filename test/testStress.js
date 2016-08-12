const J = require("../common")
let command = `stresser https://ilearnsmarter.com -c 10000 -n 10 -t 20000 --html=${__dirname}/inc/stressTest-${(new Date).toGMTString()}.html --threads=16 --force`
J.willRunFixedCommand(command).then(J.lg)
