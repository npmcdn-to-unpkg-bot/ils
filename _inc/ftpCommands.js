"use script"
const JSFtp = require( "jsftp" )
const env = require( "dotenv-helper" )
const fs = require( "fs-extra" )

let ftp = new JSFtp( {
    host: "ftp.odz-lokomotiv.com",
    port: 21,
    user: "only@freetimehub.com",
    pass: env.getEnv( "freeTimeHub" )
} )
function put( fileIs ) {
    return new Promise( ( resolve )=>{
        ftp.put( `${__dirname}/_inc/fth/${fileIs}`,fileIs,( hadError ) => {
            if ( !hadError )
                console.log( "File transferred successfully!" )
            resolve( true )
        } )
    } )
}

function get( fileIs ) {
    return new Promise( ( resolve )=>{
        ftp.get( fileIs,`${__dirname}/_inc/fth/${fileIs}`,( hadError ) => {
            if ( !hadError )
                console.log( "File transferred successfully!" )
            resolve( true )
        } )
    } )
}

//put( "index.html" ).then( ()=>{process.exit( 1 )} )
var items = [] // files, directories, symlinks, etc
fs.walk(`${__dirname}/_inc/fth/`)
  .on('readable', function () {
    var item
    while ((item = this.read())) {
      items.push(item.path)
    }
  })
  .on('end', function () {
    console.dir(items) // => [ ... array of files]
  })
