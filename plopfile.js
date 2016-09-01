module.exports = ( plop ) => {

  plop.setGenerator( "model", {

    // …
    prompts: [
    {
      type: "input",
      name: "name",
      message: "What is your module name?"
    }
],
    actions: [
        {
          type: "add",
          path: "{{camelCase name}}.model.js",
          templateFile: "model.js"
        }
    ]

  } );

};
