const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const User = require('./user');

// CREATES A NEW USER
router.post('/', function (req, res) {
    User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        },
        function (err, user) {
            if (err) return res.status(500).send("Un problème est survenu lors de l'ajout des informations à la base de données.");
            res.status(200).send(user);
        });
});
// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("Un problème est survenu lors de la recherche des utilisateurs.");
        res.status(200).send(users);
    });
});
// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("Un problème est survenu lors de la recherche de l'utilisateur.");
        if (!user) return res.status(404).send("Aucun utilisateur trouvé.");
        res.status(200).send(user);
    });
});
// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("Un problème est survenu lors de la suppression de l'utilisateur.");
        res.status(200).send("User "+ user.name +" a été supprimé.");
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req, res) {

    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("Un problème est survenu lors de la mise à jour de l'utilisateur.");
        res.status(200).send(user);
    });
});

module.exports = router;
