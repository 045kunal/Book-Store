const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    role:{
        type: String,
        required: true
    }
})

const Role = new mongoose.model('Role',roleSchema);

module.exports = Role;