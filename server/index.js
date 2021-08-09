const express = require('express');
const app = express();

const port = 3001;

const cors = require('cors');
app.use(cors());

app.use(express.json());


app.listen(port, () => console.log(`Server started at port ${port}`));

let items = [];
app.get('/items', (req, res) => {
    try {
        res.send({
            items,
        });
    } catch (e) {
        res.send(e);
    }
});

app.post('/item', (req, res) => {
    try {
        items.push(req.body);
        res.end();
    } catch (e) {
        res.send(e);
    }
});

app.delete('/item/:id', (req, res) => {
    try {
        items = items.filter((f) => f.id !== parseInt(req.params.id));
        res.end();
    } catch (e) {
        res.send(e);
    }
});
