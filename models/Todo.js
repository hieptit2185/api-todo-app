const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const date = moment().format("L");

const TodoSchema = new Schema({
    id: {
        type: Number,
        default: Math.floor(Math.random() * 100)
    },
    content: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    due_date: {
        type: String,
        required: false,
    },
    create_at: {
        type: String,
        default: date,
    }
})

const Todo = mongoose.model("Todo", TodoSchema)

module.exports = Todo;