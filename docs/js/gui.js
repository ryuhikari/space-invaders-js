/**
* Navigation
*/
var navigation = document.getElementById("navigation");
var navigationSidebar = document.getElementById("nav-sidebar");

function hide(element) {
    element.style.display = "none";
}

function show(element) {
    element.style.display = "initial";
}
/**
* Open and close navigation sidebar
*/
function openNav() {
    hide(navigation);
    navigationSidebar.style.width = "100%";
    navigationSidebar.style.display = "block";
}

function closeNav() {
    show(navigation);
    hide(navigationSidebar);
}

var openNavButton = document.getElementById("open-nav-sidebar").addEventListener("click", function(event) {
    event.preventDefault();
    openNav();
});
var closeNavButton = document.getElementById("close-nav-sidebar").addEventListener("click", function(event) {
    event.preventDefault();
    closeNav();
});

/**
* Show map with user location
*/
var mapHolder = document.getElementById("map");
var showMapError = document.getElementById("map-errors");
var showLocationButton = document.getElementById("show-location-button");

/**
* Close panels
*/
var closePanel = document.getElementsByClassName("close-panel");
for (var i = 0; i < closePanel.length; i++) {
    closePanel[i].addEventListener("click", function(event) {
        event.preventDefault();

        var closeElement = this.getAttribute("data-close");
        console.log(closeElement);
        var closeElement = document.getElementById(closeElement);
        hide(closeElement);
    });
}

/**
* Show info messages
*/
function showInfo(data) {
    var modal = document.getElementById("show-info-modal");
    var modalHeader = document.getElementById("show-info-modal__header");
    var modalTitle = document.getElementById("show-info-modal__title");
    var modalContent = document.getElementById("show-info-modal__content");
    var modalFooter = document.getElementById("show-info-modal__footer");

    var title = data.from;
    switch (title) {
        case "createAccount":
            modalTitle.innerHTML = "Create account information";
            break;
        case "logIn":
            modalTitle.innerHTML = "Log in information";
            break;
        case "signOut":
            modalTitle.innerHTML = "Sign out information";
            break;
        case "addScore":
            modalTitle.innerHTML = "Add score information";
            break;
        default:
            break;
    }

    show(modal);
    setTimeout(function() {
        hide(modal);
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
