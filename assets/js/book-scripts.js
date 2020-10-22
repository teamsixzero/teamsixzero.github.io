"use strict";
/* globals $ */
// ebook navigation
// -------------------------------------------------------------------------

$(function () {
  // TODO: accept inputs for these selectors
  var DRAWER_VISIBLE_CLASS = 'book-drawer__container--visible';
  var $html = $('html');
  var $drawerContainer = $('.book-drawer__container');
  var $drawerContentOverlay = $('.book-drawer__content-overlay');
  var $mainContent = $('.main-wrapper'); // helpers
  // ----------------------------------

  var isDrawerOpen = function isDrawerOpen() {
    return $drawerContainer.hasClass(DRAWER_VISIBLE_CLASS);
  };

  var hideDrawer = function hideDrawer() {
    $html.removeClass('prevent-scrolling');
    $drawerContainer.removeClass('book-drawer__container--visible');
    $mainContent.removeClass('main-wrapper__blur');
    $drawerContentOverlay.attr('aria-hidden', true);
    $drawerContentOverlay.hide();
    $mainContent.focus();
  };

  var showDrawer = function showDrawer() {
    $html.addClass('prevent-scrolling');
    $drawerContainer.addClass('book-drawer__container--visible');
    $mainContent.addClass('main-wrapper__blur');
    $drawerContentOverlay.attr('aria-hidden', false);
    $drawerContentOverlay.show();
    $drawerContainer.focus();
    setTimeout(function () {
      try {
        var chapterListContainer = $('.book-toc').find('.active').parents('ul').first().parent()[0];

        if (chapterListContainer) {
          chapterListContainer.scrollIntoView();
        }
      } catch (error) {// do nothing
      }
    }, 100);
  };

  var toggleDrawer = function toggleDrawer() {
    if (isDrawerOpen()) {
      hideDrawer();
    } else {
      showDrawer();
    }
  }; // initializers
  // -----------------------------------
  // NOTE: these are technically outside of the module scope, although still
  // useful in general and not that expensive to run


  $('.remove-if-js').remove();
  $('.visible-if-js').show(); // listeners
  // --------------------------------------------

  $('.book-drawer__toggle').click(function () {
    toggleDrawer();
  });
  $('.book-drawer__content-overlay').click(function () {
    hideDrawer();
  }); // Close drawer when an anchor tag is clicked

  $('.book-drawer__container a').click(function () {
    hideDrawer();
  }); // TODO: add module interface
}); // navigation highlighting
// --------------------------------------------------------------------------
// TODO: make es5 compat

$(function () {
  function wrapSections() {
    $('.book-content .book-section-header').each(function () {
      var $this = $(this);
      var id = $this.attr('id');

      if (!id) {
        console.warn("All '.book-section-header' elements must also have an id. Please add an id to the page header with text '".concat($this.text().trim(), "'"));
      }

      $this.nextUntil('.book-section-header').addBack().wrapAll("<div data-content-id=\"".concat(id, "\" class=\"content-section\" />"));
    });
  }

  function scrollHandler() {
    var $pageLinks = $('#page-navigation > li > a');
    var $bookLinks = $('#book-navigation a');
    var $sections = $($('.content-section').get().reverse()); // throttle function, enforces a minimum time interval

    function throttle(fn, interval) {
      var lastCall, timeoutId;
      return function () {
        var now = new Date().getTime();

        if (lastCall && now < lastCall + interval) {
          // if we are inside the interval we wait
          clearTimeout(timeoutId);
          timeoutId = setTimeout(function () {
            lastCall = now;
            fn.call();
          }, interval - (now - lastCall));
        } else {
          // otherwise, we directly call the function
          lastCall = now;
          fn.call();
        }
      };
    }

    function highlightNavigation() {
      // get the current vertical position of the scroll bar
      var SCROLLTOP_OFFSET = ($(window).height() * 0.35);
      var contentID;

      var scrollPosition = $(window).scrollTop() + SCROLLTOP_OFFSET;

      $sections.each(function () {
        var currentSection = $(this); // get the position of the section

        var sectionTop = currentSection.offset().top; // if the user has scrolled over the top of the section

        if (scrollPosition >= sectionTop) {
          contentID = currentSection.attr('data-content-id');
          var sectionLinkSearchString = "#page-navigation a[href=\"#".concat(contentID, "\"]");
          var $sectionLink = $(sectionLinkSearchString);
          var isSectionLinkPresent = $sectionLink.length > 0;

          if (isSectionLinkPresent && !$sectionLink.hasClass('active')) {
            $pageLinks.removeClass('active');
            $sectionLink.addClass('active');
          }

          var $bookLink = $("#book-navigation a[href=\"".concat(window.location.pathname, "#").concat(contentID, "\"]"));

          if ($bookLink && !$bookLink.hasClass('active')) {
            $bookLinks.removeClass('active');
            $bookLink.addClass('active');
          }

          return false;
        }
      });
    }

    $(window).scroll(throttle(highlightNavigation, 100));
    // $pageLinks.click(function () {
    //   var $this = $(this);
    //   setTimeout(function () {
    //     if (!$this.hasClass('active')) {
    //       $pageLinks.removeClass('active');
    //       $this.addClass('active');
    //     }
    //   }, 100);
    // })
    highlightNavigation();
  }

  wrapSections();
  scrollHandler();
});
