const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const moment = require('moment');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
mongoose.connect(`mongodb+srv://khachiep:khachiep12@cluster0.75k6z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connect to DB")
    })
    .catch(console.error)

const Todo = require('./models/Todo');
const { query } = require('express');



app.get("/todos", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const todos = await Todo.find(req.query).sort({ "due_date": req.query.order })
    const itemPage = todos.slice(startIndex, endIndex)
    const pages = {
        pageCount: Math.ceil(todos.length / 4),
        page: page,
        limit: limit,
    }
    res.json({ pages, itemPage });
})

app.post('/todo/new', (req, res) => {
    const todo = new Todo({
        content: req.body.content,
        due_date: req.body.due_date || moment().format("L"),
    })
    todo.save();

    res.json(todo);
})

app.get('/todo/status/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.status = !todo.status;
    todo.save();
    res.json(todo);
})

app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
})

app.put('/todo/update/:id', async (req, res) => {
    const result = await Todo.findByIdAndUpdate(req.params.id, { content: req.body.content })
    res.json(result);
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
