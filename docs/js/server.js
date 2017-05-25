var serverURL = "https://serene-caverns-32800.herokuapp.com/api"

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
