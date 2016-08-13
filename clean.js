const del = require('del')
del(["*-*-*-*-*"]).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
})
