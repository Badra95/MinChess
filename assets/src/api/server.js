// var app = require ('./ app');
module.exports = (expressApp) => {

const server = (app) => {

  var port = 3000;

  app.listen ( function () {
  console.log ('Express serveur écoute sur le port ' + port);
});

};

return server(expressApp);
};
