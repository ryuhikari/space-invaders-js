/**
 * GUI module
 */
;var GUI = (function($) {
    /**
     * Navigation
     */
    var navigation = $("#navigation");
    var navigationSidebar = $("#nav-sidebar");

    /**
     * Hide and show navigation sidebar
     */
    function openNav() {
        navigation.hide();
        navigationSidebar.show();
    }
    function closeNav() {
        navigation.show();
        navigationSidebar.hide();
    }

    /**
     * Events to open and close navigation sidebar
     */
    $("#open-nav-sidebar").on("click", function(event) {
        event.preventDefault();
        openNav();
    });
    $("#close-nav-sidebar").on("click", function(event) {
        event.preventDefault();
        closeNav();
    });
    navigationSidebar.on("click", function(event) {
        closeNav();
    })

    /**
     * X button to close the element in the data-close attribute
     */
    $(".close-panel").on("click", function(event) {
        event.preventDefault();
        var closeElement = $(this).attr("data-close");
        var closeElement = $(closeElement);
        closeElement.hide();
    });

    /**
     * Modal to show different info messages
     * @param  {string array}   errors String array with all the errors to show
     * @param  {string}         type   Type of info to choose in the switch-case
     * @param  {string array}   data   String array with all the data to show
     */
    function showInfo(errors, type, data) {
        // Get all DOM elements
        var modal = $("#show-info-modal");
        var modalHeader = $("#show-info-modal__header");
        var modalTitle = $("#show-info-modal__title");
        var modalContent = $("#show-info-modal__content");
        var modalFooter = $("#show-info-modal__footer");

        // Select the title based on type variable
        switch (type) {
            case "topScores":
                modalTitle.html("Top scores information");
                break;
            case "userScores":
                modalTitle.html("User scores information");
                break;
            default:
                modal.hide();
                return;
        }

        // Change color green or red if it is an error or not
        if (errors) {
            w3DisplayData("show-info-modal__content", {info: errors});

            modalHeader.addClass("info-error");
            modalFooter.addClass("info-error");
        } else {
            w3DisplayData("show-info-modal__content", {info: [data]});

            modalHeader.removeClass("info-error");
            modalFooter.removeClass("info-error");
        }

        // Show the final configuration
        modal.show();
    }
    showInfo();

    /**
    * Smooth scroll
    *
    * The following code was adapted from a post:
    * Add smooth scrolling to page anchors
    * at:
    * https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_eff_animate_smoothscroll
    * Accessed: 2017-04-30
    */
    $(".smooth").on('click', function(event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 50
            }, 800, function(){

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });

    /**
     * Top score table
     */
    var topScoreTable = $("#top-score-table");
    // Hide table by default
    topScoreTable.hide();
    /**
     * Show scores on the table
     * @param  {object array} scores Each object has name,
     *                               score and createdAt properties
     */
    function renderTopScores(scores) {
        // If server do not return scores an info message is shown
        if (!scores) {
            topScoreTable.hide();
            showInfo(["Problem getting scores"], "topScores", false);
            return;
        }

        // If there is no scores to show, the table is hidden
        if (scores.scores.length === 0) {
            topScoreTable.hide();
            return;
        }

        // Render scores
        if (scores.scores.length > 0) {
            topScoreTable.show();
            // Transform timestamp into a readable date format
            // and get the position of each element
            scores.scores.forEach(function(score, index) {
                var date = moment(score.createdAt).format("YYYY-MM-DD");
                score.createdAt = date;
                score.position = index + 1;
            });

            // Show the scores on the table
            w3DisplayData("top-score-table-body", scores);
            return;
        }
    }

    /**
     * User score table
     */
    var userScoreTable = $("#user-score-table");
    // Hide table by default
    userScoreTable.hide();
    /**
     * Show scores on the table
     * @param  {object array} scores Each object has name,
     *                               score and createdAt properties
     */
    function renderUserScores(scores) {
        // If server do not return scores an info message is shown
        if (!scores) {
            userScoreTable.hide();
            showInfo(["Problem getting scores"], "userScores", false);
            return;
        }

        // If there is no scores to show, the table is hidden
        if (scores.scores.length === 0) {
            userScoreTable.hide();
            return;
        }

        // Render scores
        if (scores.scores.length > 0) {
            userScoreTable.show();
            // Transform timestamp into a readable date format
            // and get the position of each element
            scores.scores.forEach(function(score, index) {
                var date = moment(score.createdAt).format("YYYY-MM-DD");
                score.createdAt = date;
                score.position = index + 1;
            });

            // Show the scores on the table
            w3DisplayData("user-score-table-body", scores);
            return;
        }
    }

    /**
     * Export all the functions and variables that should be public and accessible
     */
    return {
        renderTopScores: renderTopScores,
        renderUserScores: renderUserScores
    };
})(jQuery);
