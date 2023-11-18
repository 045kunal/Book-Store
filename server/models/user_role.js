const mongoose = require('mongoose');

const user_roleSchema = new mongoose.Schema({
    userid:{
        type: String,
        required: true
    },
    roleid:{
        type: String,
        required: true
    }
})

const UserRole = new mongoose.model('UserRole',user_roleSchema);

module.exports = UserRole;