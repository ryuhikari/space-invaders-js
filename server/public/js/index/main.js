/**
 * Main module
 */
;var Main = (function($) {
    /**
     * Get top scores from the server
     */
    Server.getTopScores(GUI.renderTopScores);

    /**
     * Submit event of search scores
     * It gets all the scores of the user specified in the input
     * If no user is specified, it gets all the scores on the server
     */
    $("#get-user-scores-form").on("submit", function(event) {
        event.preventDefault();
        // Get input
        var name = $(this).find("input[name=name]").val();
        // Get scores and render them
        Server.getUserScores(name, GUI.renderUserScores);
    });
})(jQuery);
