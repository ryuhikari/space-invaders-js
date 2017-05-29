var serverURL = "https://infinite-lands-38583-spaceinv.herokuapp.com/api"

function uploadScore(score) {
    var name = prompt("You got " + score + ". Write a username to upload to the server.");
    if (name) {
        addUserScore(score, name, processAddUserScore);
    }
}

function processAddUserScore(response) {
    if (response) {
        return true;
    } else {
        return false;
    }
}

function addUserScore(score, name, callback) {
    var newScore = {
        score: score,
        name: name
    };
    $.ajax({
        method: "POST",
        url: serverURL + "/scores",
        contentType: "application/json",
        data: JSON.stringify(newScore),
        success: function(response) {
            callback(response);
        },
        error: function(response) {
            callback(false);
        }
    });
}
