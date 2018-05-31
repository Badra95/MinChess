/* jshint esversion : 6 */

// ./src/api/api.js

const express = require("express");
const cors = require("cors");
const app = express();

const port = 3000;

app.use(express.static('assets'));
app.use(express.static('dashboard'));
app.use(cors());

// const bdd = require("./_connection")(app);
const db = require('./db');


const UserController = require ('./user/userController');
app.use ('/users', UserController);

const AuthController = require ('./auth/authController');
app.use ('/auth', AuthController);

const SavesController = require('./saves/savesController');
app.use ('/saves', SavesController);

const SaveController = require('./auth/saveController');
app.use ('/save', SavesController);

const online = require('./online')(app);

// app.get("/", (req, res) => {
//   res.send("hello node");
// });

// app.listen (port, function () {
// console.log ('Express serveur écoute sur le port ' + port);
// });
