const mongoose = require('mongoose');

var PartiesSchema = new mongoose.Schema({
  joueur1: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  joueur2: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  vainqueur: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }
});

mongoose.model('parties', PartiesSchema);

module.exports = mongoose.model('parties');
