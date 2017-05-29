require('./config/config.js');

const path = require('path');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose')
var {Score} = require('./models/score');
var {enableCORS} = require('./middleware/enableCORS');

const publicPath = path.join(__dirname, '/public');
const port = process.env.PORT;
var app = express();

app.set('x-powered-by', false);
app.set('json spaces', 2);
app.use(bodyParser.json());
app.use(express.static(publicPath));

app.post('/api/scores', (req, res) => {
    var score = new Score({
        name: req.body.name,
        score: req.body.score
    });

    score.save().then((doc) => {
        res.jsonp(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/api/scores', enableCORS, (req, res) => {
    Score.find({}).sort({score: -1}).then((scores) => {
        res.jsonp({scores});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/api/scores/top', enableCORS, (req, res) => {
    Score.find({}).sort({score: -1}).limit(10).then((scores) => {
        res.jsonp({scores});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/api/scores/:name', (req, res) => {
    var name = req.params.name;

    Score.find({name}).then((scores) => {
        if (!scores) {
            return res.status(404).send();
        }

        res.jsonp({scores});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};
