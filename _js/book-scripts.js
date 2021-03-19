/* globals $ */
/* eslint-env browser */

// general
// -------------------------------------------------------------------------
$(() => {
  // initializers
  // -----------------------------------
  $('.remove-if-js').remove();
  $('.visible-if-js').show();
});


// ebook navigation
// -------------------------------------------------------------------------
$(() => {
  // TODO: accept inputs for these selectors
  const DRAWER_VISIBLE_CLASS = 'book-drawer__container--visible';
  const $html = $('html');
  const $drawerContainer = $('.book-drawer__container');
  const $drawerContentOverlay = $('.book-drawer__content-overlay');
  const $mainContent = $('.main-wrapper'); // helpers


  // helpers
  // ----------------------------------
  const isDrawerOpen = () => $drawerContainer.hasClass(DRAWER_VISIBLE_CLASS);

  const hideDrawer = () => {
    $html.removeClass('prevent-scrolling');
    $drawerContainer.removeClass('book-drawer__container--visible');
    $mainContent.removeClass('main-wrapper__blur');
    $drawerContentOverlay.attr('aria-hidden', true);
    $drawerContentOverlay.hide();
    $mainContent.focus();
  };

  const showDrawer = () => {
    $html.addClass('prevent-scrolling');
    $drawerContainer.addClass('book-drawer__container--visible');
    $mainContent.addClass('main-wrapper__blur');
    $drawerContentOverlay.attr('aria-hidden', false);
    $drawerContentOverlay.show();
    $drawerContainer.focus();
    setTimeout(() => {
      try {
        const chapterListContainer = $('.book-toc').find('.active').parents('ul').first()
          .parent()[0];

        if (chapterListContainer) {
          chapterListContainer.scrollIntoView();
        }
      } catch (error) { // do nothing
      }
    }, 100);
  };

  const toggleDrawer = () => {
    if (isDrawerOpen()) {
      hideDrawer();
    } else {
      showDrawer();
    }
  };


  // listeners
  // --------------------------------------------
  $('.book-drawer__toggle').click(() => {
    toggleDrawer();
  });
  $('.book-drawer__content-overlay').click(() => {
    hideDrawer();
  }); // Close drawer when an anchor tag is clicked

  $('.book-drawer__container a').click(() => {
    hideDrawer();
  }); // TODO: add module interface
});


// navigation highlighting
// --------------------------------------------------------------------------
$(() => {
  function wrapSections() {
    $('.book-content .book-section-header').each(function () {
      const $this = $(this);
      const id = $this.attr('id');

      if (!id) {
        // TODO: only run in non-production
        console.warn(`All '.book-section-header' elements must also have an id. Please add an id to the page header with text '${$this.text().trim()}'`);
      } else {
        $this
          .nextUntil('.book-section-header')
          .addBack()
          .wrapAll(`<div data-content-id="${id}" class="content-section />`);
      }
    });
  }

  function scrollHandler() {
    const $pageLinks = $('#page-navigation > li > a');
    const $bookLinks = $('#book-navigation a');
    const $sections = $('.content-section').get().reverse();

    // throttle function, enforces a minimum time interval
    function throttle(fn, interval) {
      let lastCall; let
        timeoutId;
      return function () {
        const now = new Date().getTime();

        if (lastCall && now < lastCall + interval) {
          // if we are inside the interval we wait
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
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
      const SCROLLTOP_OFFSET = ($(window).height() * 0.35);
      const scrollPosition = $(window).scrollTop() + SCROLLTOP_OFFSET;

      // eslint-disable-next-line func-names,consistent-return
      $sections.each(function () {
        const currentSection = $(this); // get the position of the section
        const sectionTop = currentSection.offset().top; // if the user has scrolled over the top of the section

        if (scrollPosition >= sectionTop) {
          const contentID = currentSection.attr('data-content-id');
          const sectionLinkSearchString = '#page-navigation a[href="#'.concat(contentID, '"]');
          const $sectionLink = $(sectionLinkSearchString);
          const isSectionLinkPresent = $sectionLink.length > 0;

          if (isSectionLinkPresent && !$sectionLink.hasClass('active')) {
            $pageLinks.removeClass('active');
            $sectionLink.addClass('active');
          }

          const $bookLink = $('#book-navigation a[href="'.concat(window.location.pathname, '#').concat(contentID, '"]'));

          if ($bookLink && !$bookLink.hasClass('active')) {
            $bookLinks.removeClass('active');
            $bookLink.addClass('active');
          }

          return false;
        }
      });
    }

    $(window).scroll(throttle(highlightNavigation, 100));
    highlightNavigation();
  }

  wrapSections();
  scrollHandler();
});
