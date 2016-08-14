var critical = require('critical');

critical.generate({
    // Inline the generated critical-path CSS
    // - true generates HTML
    // - false generates CSS
    inline: true,

    // Your base directory
    base: 'dist/',

    // HTML source
    //html: '<html>...</html>',

    // HTML source file
    src: 'index.html', // zB the downloaded code of ilearnsmarter.com/index

    // Your CSS Files (optional)
//    css: ['dist/styles/main.css'],

    // Viewport width
    width: 1300,

    // Viewport height
    height: 900,

    // Target for final HTML output.
    // use some css file when the inline option is not set
dest: 'dest/main.css',
    // Minify critical-path CSS when inlining

    // Extract inlined styles from referenced stylesheets
    extract: true,

    // Complete Timeout for Operation
    timeout: 30000,

    // Prefix for asset directory

    // overwrite default options
    ignoreOptions: {}
})
