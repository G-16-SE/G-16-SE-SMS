const mongoose = require('mongoose');

const managerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: { type: String, required: true},
    contact: { type: String, required: true , $size: 10},
    join_date: { type: Date, required: true , default: Date.now() }
});

module.exports = mongoose.model('Manager', managerSchema);