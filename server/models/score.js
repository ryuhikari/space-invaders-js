var mongoose = require('mongoose');

const _ = require('lodash');

var ScoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    score: {
        type: Number,
        required: true
    },
});

ScoreSchema.methods.toJSON = function() {
    var score = this;
    var scoreObject = score.toObject();
    var scoreModified = {
        score: scoreObject.score,
        name: scoreObject.name,
        createdAt: new Date(scoreObject._id.getTimestamp()).getTime()
    };

    return scoreModified;
};

var Score = mongoose.model('Score', ScoreSchema);

module.exports = {Score};
