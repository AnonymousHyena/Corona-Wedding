$(function () { // Same as document.addEventListener("DOMContentLoaded"...
  // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
  $("#navbarToggle").blur(function(event){
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');}
  });
});
(function (global) {
var cw = {};
var language = 0;//0 english, 1 greek
var active = 0;
var homeHtmlUrl = "snippets/home-snippet.html";
var homeHtmlUrlGr = "snippets/home-snippet-gr.html";
var rsvpHtmlUrl = "snippets/rsvp-snippet.html";
var directionsHtmlUrl = "snippets/directions-snippet.html";
var directionsHtmlUrlGr = "snippets/directions-snippet-gr.html";
var giftsHtmlUrl = "snippets/gifts-snippet.html";
var giftsHtmlUrlGr = "snippets/gifts-snippet-gr.html";
var teamHtmlUrl = "snippets/about-snippet.html";
var teamHtmlUrlGr = "snippets/about-snippet-gr.html";
var koumparoi = [
  {"image":"teo","name":"Theodore Vasiloudis","title":"Best Man","namegr":"Θοδωρής Βασιλούδης","titlegr":"Κουμπάρος"},
  {"image":"jason","name":"Jason Loukaidis","title":"Best Man","namegr":"Ιάσονας Λουκαΐδης","titlegr":"Κουμπάρος"},
  {"image":"eugenia","name":"Eugenia Bozika","title":"Best Woman","namegr":"Ευγενία Μποζίκα","titlegr":"Κουμπάρα"},
  {"image":"statics","name":"Stathis Bozikas","title":"Best Man","namegr":"Στάθης Μποζίκας","titlegr":"Κουμπάρος"},
  {"image":"maliaros","name":"Giorgos Malliaros","title":"Best Man","namegr":"Γιώργος Μαλλιαρός","titlegr":"Κουμπάρος"},
  {"image":"lafa","name":"Christos Lafantaris","title":"Best Man","namegr":"Χρήστος Λαφαντάρης","titlegr":"Κουμπάρος"}
  ]
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
var shuffle = function(array){
  var currentIndex = array.length, temporaryValue, randomIndex;
  while(0!=currentIndex){
    randomIndex = Math.floor(Math.random()*currentIndex);
    currentIndex -=1;
    temporaryValue = array[currentIndex];
    array[currentIndex]=array[randomIndex];
    array[randomIndex]=temporaryValue;
  }
  return array;

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

  var classes = document.querySelector("#navMenuTeamButton").className;
  classes = classes.replace(new RegExp("active", "g"), "");
  document.querySelector("#navMenuTeamButton").className = classes;

  var menuSelector;
  active = buttonIndex;
  if (buttonIndex==0){menuSelector="#navHomeButton";}
  else if (buttonIndex==1){menuSelector="#navMenuRSVPButton";}
  else if (buttonIndex==2){menuSelector="#navMenuDirButton";}
  else if (buttonIndex==3){menuSelector="#navMenuGiftButton";}
  else if (buttonIndex==4){menuSelector="#navMenuTeamButton";}
  // Add 'active' to menu button if not already there
  classes = document.querySelector(menuSelector).className;
  if (classes.indexOf("active") == -1) {
    classes += " active";
    document.querySelector(menuSelector).className = classes;
  }
};
// On page load (before images or CSS), show home view
document.addEventListener("DOMContentLoaded",function(event){cw.loadHomePage();});

cw.loadHomePage = function () {
  showLoading("#main-content");
  switchMenuToActive(0);
  if (language==0){
  $ajaxUtils.sendGetRequest(
    homeHtmlUrl,
    function(homeHtml){insertHtml("#main-content",homeHtml);},
    false);} // Explicitely setting the flag to get JSON from server processed into an object literal
  else{
$ajaxUtils.sendGetRequest(
    homeHtmlUrlGr,
    function(homeHtml){insertHtml("#main-content",homeHtml);},
    false);}
};
cw.loadRSVPPage = function(){
  showLoading("#main-content");
  switchMenuToActive(1);
  $ajaxUtils.sendGetRequest(
    rsvpHtmlUrl,
    function(rsvpHtml){insertHtml("#main-content",rsvpHtml);},
    false);
};
cw.loadDirectionsPage = function(){
  showLoading("#main-content");
  switchMenuToActive(2);
  if (language == 0){
    $ajaxUtils.sendGetRequest(
      directionsHtmlUrl,
      function(directionsHtml){insertHtml("#main-content",directionsHtml);},
      false);}
  else{
      $ajaxUtils.sendGetRequest(
      directionsHtmlUrlGr,
      function(directionsHtml){insertHtml("#main-content",directionsHtml);},
      false);}
};
cw.loadGiftsPage = function(){
  showLoading("#main-content");
  switchMenuToActive(3);
  if (language == 0){
    $ajaxUtils.sendGetRequest(
      giftsHtmlUrl,
      function(giftsHtml){insertHtml("#main-content",giftsHtml);},
      false);}
  else{
    $ajaxUtils.sendGetRequest(
    giftsHtmlUrlGr,
    function(giftsHtml){insertHtml("#main-content",giftsHtml);},
    false);}
};
cw.loadTeamPage = function(){
  showLoading("#main-content");
  switchMenuToActive(4);
  if (language == 0){
    $ajaxUtils.sendGetRequest(
      teamHtmlUrl,
      function(teamHtml){
        koumparoi = shuffle(koumparoi);
        var rnd;
        for (var i = 0; i < 6; i++) {
          rnd = Math.random();
          if (rnd<=0.025){
            teamHtml = insertProperty(teamHtml,"img"+i,koumparoi[i].image+"_egg")
          }
          else{
            teamHtml = insertProperty(teamHtml,"img"+i,koumparoi[i].image)
          }
          teamHtml = insertProperty(teamHtml,"name"+i,koumparoi[i].name)
          teamHtml = insertProperty(teamHtml,"title"+i,koumparoi[i].title)
        }
        insertHtml("#main-content",teamHtml);},
      false);}
  else{
    $ajaxUtils.sendGetRequest(
      teamHtmlUrlGr,
      function(teamHtml){
        koumparoi = shuffle(koumparoi);
        var rnd;
        for (var i = 0; i < 6; i++) {
          rnd == Math.random();
          if(rnd<=0.025){
            teamHtml = insertProperty(teamHtml,"img"+i,koumparoi[i].image+"_egg")
          }
          else{
            teamHtml = insertProperty(teamHtml,"img"+i,koumparoi[i].image)
          }
          teamHtml = insertProperty(teamHtml,"name"+i,koumparoi[i].namegr)
          teamHtml = insertProperty(teamHtml,"title"+i,koumparoi[i].titlegr)
        }
        insertHtml("#main-content",teamHtml);},
      false);}
};
cw.toggleLanguage = function(){
  if (language==1){
    document.querySelector("#navHomeButton").innerHTML = document.querySelector("#navHomeButton").innerHTML.replace(' Αρχική',' Home');
    document.querySelector("#navMenuDirButton").innerHTML = document.querySelector("#navMenuDirButton").innerHTML.replace(' Πώς να έρθετε',' Get Directions');
    document.querySelector("#navMenuGiftButton").innerHTML = document.querySelector("#navMenuGiftButton").innerHTML.replace(' Γαμήλιο Δώρο',' Gift Registry');
    document.querySelector("#navMenuLanButton").innerHTML = document.querySelector("#navMenuLanButton").innerHTML.replace(' English',' Ελληνικά'); 
    document.querySelector("#navMenuTeamButton").innerHTML = document.querySelector("#navMenuTeamButton").innerHTML.replace(' H Ομάδα',' Meet the Team'); 
  }
  else{
    document.querySelector("#navHomeButton").innerHTML = document.querySelector("#navHomeButton").innerHTML.replace(' Home',' Αρχική');
    document.querySelector("#navMenuDirButton").innerHTML = document.querySelector("#navMenuDirButton").innerHTML.replace(' Get Directions',' Πώς να έρθετε');
    document.querySelector("#navMenuGiftButton").innerHTML = document.querySelector("#navMenuGiftButton").innerHTML.replace(' Gift Registry',' Γαμήλιο Δώρο');
    document.querySelector("#navMenuLanButton").innerHTML = document.querySelector("#navMenuLanButton").innerHTML.replace(' Ελληνικά',' English');
    document.querySelector("#navMenuTeamButton").innerHTML = document.querySelector("#navMenuTeamButton").innerHTML.replace(' Meet the Team',' H Ομάδα');
   }
  language = 1-language;
  if (active==0){cw.loadHomePage();}
  else if (active==1){cw.loadRSVPPage();}
  else if (active==2){cw.loadDirectionsPage();}
  else if (active==3){cw.loadGiftsPage();}
  else if (active==4){cw.loadTeamPage();}
  };

global.$cw = cw;

})(window);