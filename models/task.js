const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
 _id: mongoose.Schema.Types.ObjectId,
 title: {type: String, required: true, minlength: 1},
 description: {type: String, required: true, default: " "},
 completed: {type: Boolean, default: false},
 created_at: {type: Date, default: Date.now},
 updated_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Task', taskSchema);
