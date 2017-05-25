getTopScores(GUI.renderTopScores);
var userScoreTable = $("#user-score-table");

$("#get-user-scores-form").on("submit", function(event) {
    event.preventDefault();
    var name = $(this).find("input[name=name]").val();
    getUserScores(name, GUI.renderUserScores);
});
