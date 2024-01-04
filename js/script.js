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
    navText: [
      '<img src="./images/triangle-left.png">',
      '<img src="./images/triangle-right.png">',
    ], // Replace the classes with your preferred icon classes

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
    navText: [
      '<img src="./images/triangle-left.png">',
      '<img src="./images/triangle-right.png">',
    ], // Replace the classes with your preferred icon classes

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

  $('.box-prof').click(function(){
    // Pause all videos and show their play buttons
    $('video').each(function(){
        this.pause();
        $(this).siblings('.play-button').show();
    });

    // Find the video and the play button inside the clicked .box-prof
    var video = $(this).find('video')[0];
    var playButton = $(this).find('.play-button');

    // Toggle play/pause for the clicked video and update the play button visibility
    if(video.paused){
        video.play();
        playButton.hide();
    } else {
        video.pause();
        playButton.show();
    }
});

  $(".custom-select .custom-option").on("click", function () {
    // Remove 'selected' class from all .custom-option elements
    $(".custom-select  .custom-option").removeClass("selected");
    // Add 'selected' class to the clicked .custom-option element
    $(this).addClass("selected");
  });

  // Function to update step indicators
  function updateStepIndicator(stepNumber) {
    $(".step-dot").each(function (index) {
      if (index < stepNumber) {
        $(".step-dot").removeClass("active-dot");
        $(this).addClass("active-dot");
      } else {
        $(this).removeClass("active-dot");
      }
    });
  }

  // Function to go to the next step
  function goToNextStep(currentStep, nextStep) {
    $("#" + currentStep).hide();
    $("#" + nextStep).show();
    updateStepIndicator(parseInt(nextStep.split("-")[1]));
  }

  // Function to go to the previous step
  function goToPrevStep(currentStep, prevStep) {
    $("#" + currentStep).hide();
    $("#" + prevStep).show();
    updateStepIndicator(parseInt(prevStep.split("-")[1]) - 1);
  }

  // Event handler for 'Next' button
  $(".next-btn").on("click", function () {
    var currentStep = $(this).closest(".form-step").attr("id");
    var nextStep = "step-" + (parseInt(currentStep.split("-")[1]) + 1);
    goToNextStep(currentStep, nextStep);
  });

  // Event handler for 'Back' button
  $(".prev-btn").on("click", function () {
    var currentStep = $(this).closest(".form-step").attr("id");
    var prevStep = "step-" + (parseInt(currentStep.split("-")[1]) - 1);
    goToPrevStep(currentStep, prevStep);
  });

  // Initialize the first step to be visible and the first dot active
  $("#step-1").show();
  updateStepIndicator(1);
});

document.addEventListener("DOMContentLoaded", function () {
  var observer = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          startCountAnimation(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  var boxes = document.querySelectorAll(".box");
  boxes.forEach(function (box) {
    observer.observe(box);
  });

  function startCountAnimation(target) {
    var startCount = 0;
    var endCount = parseInt(
      target.getAttribute("data-count").replace(/,/g, "")
    ); // Convert to integer
    var duration = 3000; // 3 seconds

    function animateCount(timestamp) {
      var progress = timestamp - startTimestamp;
      var percentage = Math.min(progress / duration, 1);

      target.querySelector(".number").textContent = formatNumber(
        Math.floor(percentage * endCount)
      );

      if (progress < duration) {
        requestAnimationFrame(animateCount);
      } else {
        target.querySelector(".number").textContent = formatNumber(endCount);
      }
    }

    function formatNumber(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    var startTimestamp;
    requestAnimationFrame(function (timestamp) {
      startTimestamp = timestamp;
      requestAnimationFrame(animateCount);
    });

    // Show the box when counting starts
    target.style.opacity = 1;
  }
});

function showClass(className) {
  var allClasses = ["one", "tow", "three"];

  allClasses.forEach(function (cls) {
    if (cls === className) {
      $("." + cls)
        .removeClass("hidden")
        .addClass("visible");
    } else {
      $("." + cls)
        .removeClass("visible")
        .addClass("hidden");
    }
  });
}

// Ensure 'one' is initially visible
$(".tow").addClass("visible");


var inst = $("[data-remodal-id=modal]").remodal();
