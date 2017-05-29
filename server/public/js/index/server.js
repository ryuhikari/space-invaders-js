/**
 * Server module
 */
;var Server = (function($) {

    // URL of API REST on Heroku
    var serverURL = "https://infinite-lands-38583-spaceinv.herokuapp.com/api"

    /**
     * Get top scores
     * @param  {Function} callback Function to get called after getting the scores
     */
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

    /**
     * Get user scores
     * @param  {Function} callback Function to get called after getting the scores
     */
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

    /**
     * Export all the functions and variables that should be public and accessible
     */
    return {
        getTopScores: getTopScores,
        getUserScores: getUserScores
    };
})(jQuery);
