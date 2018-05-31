const mongoose = require('mongoose');

var SavesSchema = new mongoose.Schema({
  id_users: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  game: String
});

mongoose.model('saves', SavesSchema);

module.exports = mongoose.model('saves');
