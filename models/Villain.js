var mongoose = require('mongoose');
var VillainSchema = new mongoose.Schema({

    name: String,
    evilPowers: String,
    img: String
});

module.exports = mongoose.model('Villain', VillainSchema);
