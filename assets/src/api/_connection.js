/*jshint esversion : 6 */

// ./src/api/geographie.js

module.exports = (expressApp) => {
  const mysql = require('mysql');
  const hostname = 'localhost';
  const port = 3000;

  const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'simplonco',
    database : 'titrePro'
  });

  connection.connect(function (err){
    if (err) throw err;
    console.log("Le serveur s'est bien connecté sur la base de donnée MYSQL")
    });


  const bdd = (app) => {

    app.listen( function(){
      console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port);
    });


  };

  return geographie(expressApp);
};
