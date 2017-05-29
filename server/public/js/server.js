var serverURL = "https://infinite-lands-38583-spaceinv.herokuapp.com/api"

function getTopScores(callback) {
    $.ajax({
        method: "GET",
        url: serverURL + "/scores/top",
        dataType: 'jsonp',
        jsonp: "callback",
        success: function(response) {
            callback(response);
        },
        error: function(response) {
            callback(false);
        }
    });
}

function getUserScores(name, callback) {
    $.ajax({
        method: "GET",
        url: serverURL + "/scores/" + name,
        dataType: 'jsonp',
        jsonp: "callback",
        success: function(response) {
            callback(response);
        },
        error: function(response) {
            callback(false);
        }
    });
}

function addUserScore(score, name, callback) {
    var newScore = {
        score: score,
        name: name
    };
    console.log(newScore);
    $.ajax({
        method: "POST",
        url: serverURL + "/scores",
        contentType: "application/json",
        data: JSON.stringify(newScore),
        success: function(response) {
            console.log(response);
            callback(response);
        },
        error: function(response) {
            console.log(response);
            callback(false);
        }
    });
}
function testScore(response) {
}
