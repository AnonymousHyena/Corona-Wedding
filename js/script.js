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

var lb = {};

var homeHtmlUrl = "snippets/home-snippet.html";
var allCategoriesUrl = "categories.json";
var categoriesTitleHtml = "snippets/categories-title-snippet.html";
var simCategoriesTitleHtml = "snippets/simulation-categories-title-snippet.html";
var categoryHtml = "snippets/category-snippet.html";
var menuItemsUrl = "categories/";
var menuItemsTitleHtml = "snippets/menu-items-title.html";
var menuItemHtml = "snippets/menu-item.html";
var tutorialHtml = "snippets/tutorial-snippet.html";
var simulationHtml = "snippets/simulation-snippet.html";
var aboutHtml = "snippets/about-snippet.html";
var type;

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

  var classes = document.querySelector("#navMenuTutButton").className;
  classes = classes.replace(new RegExp("active", "g"), "");
  document.querySelector("#navMenuTutButton").className = classes;

  var classes = document.querySelector("#navMenuSimButton").className;
  classes = classes.replace(new RegExp("active", "g"), "");
  document.querySelector("#navMenuSimButton").className = classes;

  var classes = document.querySelector("#navMenuAboutButton").className;
  classes = classes.replace(new RegExp("active", "g"), "");
  document.querySelector("#navMenuAboutButton").className = classes;

  var menuSelector;
  if (buttonIndex==1){menuSelector="#navMenuTutButton";}
  else if (buttonIndex==2){menuSelector="#navMenuSimButton";}
  else if (buttonIndex==3){menuSelector="#navMenuAboutButton";}
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
  allCategoriesUrl, 
  buildAndShowHomeHTML, 
  true); // Explicitely setting the flag to get JSON from server processed into an object literal
});

lb.contctUs = function(){
  window.open('mailto:thessaloniki-it@best.eu.org?Subject=Yo%20Problemo');
}
// Builds HTML for the home page based on categories array
// returned from the server.
function buildAndShowHomeHTML (categories) {
  
  // Load home snippet page
  $ajaxUtils.sendGetRequest(
    homeHtmlUrl,
    function (homeHtml) {

      var chosenCategoryShortName = chooseRandomCategory(categories).short_name;

      var homeHtmlToInsertIntoMainPage = insertProperty(homeHtml, "randomCategoryShortName", "'"+chosenCategoryShortName+"'") ;
      
      insertHtml("#main-content",homeHtmlToInsertIntoMainPage);

      var monthNames = ["January", "February", "March", "April", "May", 
      "June","July", "August", "September", "October", "November", "December"];

      var d = new Date();
      document.querySelector("#month").innerHTML=monthNames[d.getMonth()];
      
    },
    false); // False here because we are getting just regular HTML from the server, so no need to process JSON.
}


// Given array of category objects, returns a random category object.
function chooseRandomCategory (categories) {
  // Choose a random index into the array (from 0 inclusively until array length (exclusively))
  var randomArrayIndex = Math.floor(Math.random() * categories.length);
  if (categories[randomArrayIndex].type=="sim"){type="sim";}
  else{type="tut";}
  // return category object with that randomArrayIndex
  return categories[randomArrayIndex];
}


lb.loadAboutPage = function () {
  showLoading("#main-content");
  switchMenuToActive(3);
  $ajaxUtils.sendGetRequest(
    aboutHtml,
    function(aboutHtml){
       insertHtml("#main-content",aboutHtml);
    },false);
};

// Load the menu categories view
lb.loadTutorialCategories = function () {
  showLoading("#main-content");
  type="tut";
  $ajaxUtils.sendGetRequest(
    allCategoriesUrl,
    buildAndShowCategoriesHTML);
};

lb.loadSimulationCategories = function () {//!
  showLoading("#main-content");
  type="sim";
  $ajaxUtils.sendGetRequest(
    allCategoriesUrl,
    buildAndShowSimCategoriesHTML);
};

// Load the menu items view
// 'categoryShort' is a short_name for a category
lb.loadMenuItems = function (categoryShort) {//!
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    menuItemsUrl + categoryShort+".json",
    buildAndShowMenuItemsHTML);
};

lb.loadSingle = function (vid,short,fvid) {
  showLoading("#main-content");
  buildAndShowVidHTML(vid,short,fvid);
};


// Builds HTML for the categories page based on the data
// from the server
function buildAndShowCategoriesHTML (categories) {
  // Load title snippet of categories page
  $ajaxUtils.sendGetRequest(
    categoriesTitleHtml,
    function (categoriesTitleHtml) {
      // Retrieve single category snippet
      $ajaxUtils.sendGetRequest(
        categoryHtml,
        function (categoryHtml) {
          // Switch CSS class active to menu button
          switchMenuToActive(1);

          var categoriesViewHtml = 
            buildCategoriesViewHtml(categories, 
                                    categoriesTitleHtml,
                                    categoryHtml,
                                    "tut");
          insertHtml("#main-content", categoriesViewHtml);
        },
        false);
    },
    false);
}

function buildAndShowSimCategoriesHTML(categories) {
  // Load title snippet of categories page
  $ajaxUtils.sendGetRequest(
    simCategoriesTitleHtml,
    function (simCategoriesTitleHtml) {
      // Retrieve single category snippet
      $ajaxUtils.sendGetRequest(
        categoryHtml,
        function (categoryHtml) {
          // Switch CSS class active to menu button
          switchMenuToActive(2);

          var categoriesViewHtml = 
            buildCategoriesViewHtml(categories, 
                                    simCategoriesTitleHtml,
                                    categoryHtml,
                                    "sim");
          insertHtml("#main-content", categoriesViewHtml);
        },
        false);
    },
    false);
}

// Using categories data and snippets html
// build categories view HTML to be inserted into page
function buildCategoriesViewHtml(categories, 
                                 categoriesTitleHtml,
                                 categoryHtml,
                                 type) {
  
  var finalHtml = categoriesTitleHtml;
  finalHtml += "<section class='row'>";

  // Loop over categories
  for (var i = 0; i < categories.length; i++) {
    // Insert category values
    if(categories[i].type != type){continue;}
    var html = categoryHtml;
    var name = "" + categories[i].name;
    var short_name = categories[i].short_name;
    html = 
      insertProperty(html, "name", name);
    html = 
      insertProperty(html, 
                     "short_name",
                     short_name);
    finalHtml += html;
  }

  finalHtml += "</section>";
  return finalHtml;
}



// Builds HTML for the single category page based on the data
// from the server
function buildAndShowMenuItemsHTML (categoryMenuItems) {
  // Load title snippet of menu items page
  $ajaxUtils.sendGetRequest(
    menuItemsTitleHtml,
    function (menuItemsTitleHtml) {
      // Retrieve single menu item snippet
      $ajaxUtils.sendGetRequest(
        menuItemHtml,
        function (menuItemHtml) {
          // Switch CSS class active to menu button
          if(type=="tut"){switchMenuToActive(1);}
          else{switchMenuToActive(2);}  
          var menuItemsViewHtml = 
            buildMenuItemsViewHtml(categoryMenuItems, 
                                    menuItemsTitleHtml,
                                    menuItemHtml);
          insertHtml("#main-content", menuItemsViewHtml);
        },
        false);
    },
    false);
}


// Using category and menu items data and snippets html
// build menu items view HTML to be inserted into page
function buildMenuItemsViewHtml(categoryMenuItems, 
                                menuItemsTitleHtml,
                                menuItemHtml) {
  
  menuItemsTitleHtml = 
    insertProperty(menuItemsTitleHtml,
                   "name",
                   categoryMenuItems.category.name);
  menuItemsTitleHtml = 
    insertProperty(menuItemsTitleHtml,
                   "desc",
                   categoryMenuItems.category.desc);

  var finalHtml = menuItemsTitleHtml;
  finalHtml += "<section class='row'>";

  // Loop over menu items
  var menuItems = categoryMenuItems.items;
  var catShortName = categoryMenuItems.category.short_name;
  for (var i = 0; i < menuItems.length; i++) {
    // Insert menu item values
    var html = menuItemHtml;
    html =
      insertProperty(html, "url", menuItems[i].url);//vid url
    html =
      insertProperty(html, "furl", menuItems[i].furl);//feedback vid url
    html = 
      insertProperty(html, "short_name", menuItems[i].short_name);
    html = 
      insertProperty(html, 
                     "catShortName",
                     catShortName);
    html = 
      insertProperty(html, 
                     "name",
                     menuItems[i].name);
    html = 
      insertProperty(html, 
                     "description",
                     menuItems[i].description);

    // Add clearfix after every second menu item
    if (i % 2 != 0) {
      html += 
        "<div class='clearfix visible-lg-block visible-md-block'></div>";
    }

    finalHtml += html;
  }

  finalHtml += "</section>";
  return finalHtml;
}


function buildAndShowVidHTML (vid,short,fvid) {
  if(type=="tut"){
    $ajaxUtils.sendGetRequest(
      tutorialHtml,
      function (tutorialHtml) {

      var htmlToInsertIntoMainPage = insertProperty(tutorialHtml, "video", vid);

      $ajaxUtils
            .sendGetRequest("videos/scripts/"+short+".json", 
              function (request) {
                var name = request.text;

                document.querySelector("#script")
                  .innerHTML = name;
              });

      insertHtml("#main-content",htmlToInsertIntoMainPage);
      },
      false);}
  else{
    $ajaxUtils.sendGetRequest(
      simulationHtml,
      function (simulationHtml) {

      var htmlToInsertIntoMainPage = insertProperty(simulationHtml, "video", vid);
      htmlToInsertIntoMainPage = insertProperty(htmlToInsertIntoMainPage, "fvideo", fvid);

      insertHtml("#main-content",htmlToInsertIntoMainPage);
      },
      false);}
}


global.$lb = lb;

})(window);

