;var GUI = (function($) {
    var showLoggedInElements = $(".show-logged-in");
    var showLoggedOutElements = $(".show-logged-out");

    function showLoggedIn() {
        showLoggedInElements.show();
        showLoggedOutElements.hide();
    }
    function showLoggedOut() {
        showLoggedInElements.hide();
        showLoggedOutElements.show();
    }
    showLoggedOut();

    // Navigation
    var navigation = $("#navigation");
    var navigationSidebar = $("#nav-sidebar");

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

    function openNav() {
        navigation.hide();
        navigationSidebar.show();
    }
    function closeNav() {
        navigation.show();
        navigationSidebar.hide();
    }

    // Panels
    $(".close-panel").on("click", function(event) {
        event.preventDefault();
        var closeElement = $(this).attr("data-close");
        var closeElement = $(closeElement);
        closeElement.hide();
    });

    // Errors
    var errorsPanels = {
        signUp: $("#sign-up-errors-panel"),
    };
    var errorsLists = {
        signUp: $("#sign-up-errors-list"),
    };

    function renderErrors(errors, errorType) {
        if (!errorType) {
            Object.keys(errorsPanels).forEach(function(key) {
                errorsPanels[key].hide();
            });
            return;
        }
        switch (errorType) {
            case "sign-up":
                if (errors) {
                    var HTMLid = errorsLists.signUp.attr('id');
                    w3DisplayData(HTMLid, {errors: errors});
                    errorsPanels.signUp.show();
                } else {
                    errorsPanels.signUp.hide();
                }
                break;
            default:
                Object.keys(errorsPanels).forEach(function(key) {
                    errorsPanels[key].hide();
                });
        }
    }
    renderErrors();

    // Info messages
    function showInfo(errors, type, data) {
        var modal = $("#show-info-modal");
        var modalHeader = $("#show-info-modal__header");
        var modalTitle = $("#show-info-modal__title");
        var modalContent = $("#show-info-modal__content");
        var modalFooter = $("#show-info-modal__footer");

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

        if (errors) {
            w3DisplayData("show-info-modal__content", {info: errors});

            modalHeader.addClass("info-error");
            modalFooter.addClass("info-error");
        } else {
            w3DisplayData("show-info-modal__content", {info: [data]});

            modalHeader.removeClass("info-error");
            modalFooter.removeClass("info-error");
        }

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

    var topScoreTable = $("#top-score-table");
    topScoreTable.hide();
    function renderTopScores(scores) {
        if (scores.scores.length > 0) {
            topScoreTable.show();
            scores.scores.forEach(function(score, index) {
                var date = moment(score.createdAt).format("YYYY-MM-DD");
                score.createdAt = date;
                score.position = index + 1;
            });
            w3DisplayData("top-score-table-body", scores);
        } else {
            showInfo(['Problem getting top scores.'], 'topScores', undefined);
            topScoreTable.hide();
        }
    }

    var userScoreTable = $("#user-score-table");
    userScoreTable.hide();
    function renderUserScores(scores) {
        if (scores.scores.length > 0) {
            userScoreTable.show();
            scores.scores.forEach(function(score, index) {
                var date = moment(score.createdAt).format("YYYY-MM-DD");
                score.createdAt = date;
                score.position = index + 1;
            });
            w3DisplayData("user-score-table-body", scores);
        } else {
            showInfo(['Problem getting user scores or that user does not exist.'], 'userScores', undefined);
            userScoreTable.hide();
        }
    }

    return {
        renderTopScores: renderTopScores,
        renderUserScores: renderUserScores
    };
})(jQuery);
