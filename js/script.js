$(function () { // Same as document.addEventListener("DOMContentLoaded"...
  // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  });
});

(function (global) {
var cw = {};

var homeHtmlUrl = "snippets/home-snippet.html";
var rsvpHtmlUrl = "snippets/rsvp-snippet.html";
var directionsHtmlUrl = "snippets/directions-snippet.html";
var giftsHtmlUrl = "snippets/gifts-snippet.html";

// Convenience function for inserting innerHTML for 'select'
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='images/ajax-loader.gif'></div>";
  insertHtml(selector, html);
};

// Return substitute of '{{propName}}' 
// with propValue in given 'string' 
var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string
    .replace(new RegExp(propToReplace, "g"), propValue);
  return string;
};

// Remove the class 'active' from home and switch to Menu button
var switchMenuToActive = function (buttonIndex) {
  // Remove 'active' from home button
  var classes = document.querySelector("#navHomeButton").className;
  classes = classes.replace(new RegExp("active", "g"), "");
  document.querySelector("#navHomeButton").className = classes;

  var classes = document.querySelector("#navMenuRSVPButton").className;
  classes = classes.replace(new RegExp("active", "g"), "");
  document.querySelector("#navMenuRSVPButton").className = classes;

  var classes = document.querySelector("#navMenuDirButton").className;
  classes = classes.replace(new RegExp("active", "g"), "");
  document.querySelector("#navMenuDirButton").className = classes;

  var classes = document.querySelector("#navMenuGiftButton").className;
  classes = classes.replace(new RegExp("active", "g"), "");
  document.querySelector("#navMenuGiftButton").className = classes;

  var menuSelector;
  if (buttonIndex==1){menuSelector="#navMenuRSVPButton";}
  else if (buttonIndex==2){menuSelector="#navMenuDirButton";}
  else if (buttonIndex==3){menuSelector="#navMenuGiftButton";}
  // Add 'active' to menu button if not already there
  classes = document.querySelector(menuSelector).className;
  if (classes.indexOf("active") == -1) {
    classes += " active";
    document.querySelector(menuSelector).className = classes;
  }
};

// On page load (before images or CSS)
document.addEventListener("DOMContentLoaded", function (event) {


  
// On first load, show home view
showLoading("#main-content");
$ajaxUtils.sendGetRequest(
  homeHtmlUrl, 
  buildAndShowHomeHTML, 
  false); // Explicitely setting the flag to get JSON from server processed into an object literal
});

// Builds HTML for the home page based on categories array
// returned from the server.
function buildAndShowHomeHTML (categories) {
  // Load home snippet page
  $ajaxUtils.sendGetRequest(
    homeHtmlUrl,
    function (homeHtml) {
      insertHtml("#main-content",homeHtml);
    },
    false); // False here because we are getting just regular HTML from the server, so no need to process JSON.
}

cw.loadRSVPPage = function () {
  showLoading("#main-content");
  switchMenuToActive(1);
  $ajaxUtils.sendGetRequest(
    rsvpHtmlUrl,
    function(rsvpHtml){
       insertHtml("#main-content",rsvpHtml);
    },false);
};

cw.loadDirectionsPage = function () {
  showLoading("#main-content");
  switchMenuToActive(2);
  $ajaxUtils.sendGetRequest(
    directionsHtmlUrl,
    function(directionsHtml){
       insertHtml("#main-content",directionsHtml);
    },false);
};

cw.loadGiftsPage = function () {
  showLoading("#main-content");
  switchMenuToActive(3);
  $ajaxUtils.sendGetRequest(
    giftsHtmlUrl,
    function(giftsHtml){
       insertHtml("#main-content",giftsHtml);
    },false);
};

global.$cw = cw;

})(window);

