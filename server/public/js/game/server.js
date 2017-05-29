/**
 * Server module
 */

// API REST URL
var serverURL = "https://infinite-lands-38583-spaceinv.herokuapp.com/api"

/**
 * Show a prompt to get user name and upload score to the server
 * @param  {number} score - number value
 */
function uploadScore(score) {
    // Get username
    var name = prompt("You got " + score + ". Write a username to upload to the server.");
    if (name) {
        // Upload score if user do not cancel
        addUserScore(score, name, processAddUserScore);
        return true;
    } else {
        return false;
    }
}

/**
 * Do something when score is uploaded
 * @param  {Object} response - server response
 */
function processAddUserScore(response) {
    if (response) {
        return true;
    } else {
        return false;
    }
}

/**
 * Make POST request to uplo score
 * @param {number}   score    - score value
 * @param {string}   name     - username
 * @param {Function} callback - function to call once the score is uploaded
 */
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
