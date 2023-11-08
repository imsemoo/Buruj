$(document).ready(function () {
  "use strict";

    // JQ to toggle the mobile menu
    const mobileMenuIcon = $(".mobile-menu-icon");
    const menu = $(".navbar nav .menu");
  
    mobileMenuIcon.click(function () {
      mobileMenuIcon.toggleClass("active");
      menu.toggleClass("active");
    });
  
    // Close the mobile menu when a menu item is clicked
    const menuItems = $(".navbar nav .menu li a");
  
    menuItems.click(function () {
      mobileMenuIcon.removeClass("active");
      menu.removeClass("active");
    });

  var owlExperience = $("#owl_experience");
  owlExperience.owlCarousel({
    items: 3,
    loop: true,
    margin: 30,
    dots: false,
    nav: true,
    navText: ['<img src="../images/triangle-left.png">', '<img src="../images/triangle-right.png">'], // Replace the classes with your preferred icon classes

    responsive: {
      0: {
        items: 1,
        stagePadding: 30,

      },
      600: {
        items: 1,
      },
      1000: {
        items: 3,
      },
    },
  });

  var owlExperience = $("#owl_topFive");
  owlExperience.owlCarousel({
    items: 1,
    loop: true,
    margin: 30,
    dots: false,
    nav: true,
    navText: ['<img src="../images/triangle-left.png">', '<img src="../images/triangle-right.png">'], // Replace the classes with your preferred icon classes

    responsive: {
      0: {
        items: 1,
        stagePadding: 20,

      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });

});
