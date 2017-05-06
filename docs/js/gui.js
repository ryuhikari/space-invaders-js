/**
* Navigation
*/
var navigation = $("#navigation");
var navigationSidebar = $("#nav-sidebar");

/**
* Open and close navigation sidebar
*/
function openNav() {
    navigation.hide();
    navigationSidebar.css({"width": "100%", "display": "block"});
}

function closeNav() {
    navigation.show();
    navigationSidebar.hide();
}

var openNavButton = $("#open-nav-sidebar").on("click", function(event) {
    event.preventDefault();
    openNav();
});
var closeNavButton = $("#close-nav-sidebar").on("click", function(event) {
    event.preventDefault();
    closeNav();
});

/**
* Close panels
*/
var closePanel = $(".close-panel").on("click", function(event) {
    event.preventDefault();

    var closeElement = $(this).attr("data-close");
    var closeElement = $(closeElement);
    closeElement.hide();
});

/**
* Show info messages
*/
function showInfo(data) {
    var modal = $("#show-info-modal");
    var modalHeader = $("#show-info-modal__header");
    var modalTitle = $("#show-info-modal__title");
    var modalContent = $("#show-info-modal__content");
    var modalFooter = $("#show-info-modal__footer");

    var title = data.from;
    console.log(title);
    switch (title) {
        case "createAccount":
            modalTitle.html("Create account information");
            break;
        case "logIn":
            modalTitle.html("Log in information");
            break;
        case "signOut":
            modalTitle.html("Sign out information");
            break;
        case "addScore":
            modalTitle.html("Add score information");
            break;
        default:
            return;
    }

    if (data.status === 200) {
        modalHeader.css({"background-color": "green", "color": "white"});
        modalFooter.css({"background-color": "green", "color": "white"});
    } else {
        modalHeader.css({"background-color": "red", "color": "white"});
        modalFooter.css({"background-color": "red", "color": "white"});
    }
    w3DisplayData("show-info-modal__content", data);

    modal.show();

    setTimeout(function() {
        modal.fadeOut();
    }, 2000);
}

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
    closeNav();
});
