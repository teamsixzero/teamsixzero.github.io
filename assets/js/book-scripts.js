/* globals $ */
// TODO: convert these to es5

$(() => {
  // TODO: accept inputs for these selectors
  const DRAWER_VISIBLE_CLASS = 'book-drawer__container--visible';

  const $html = $('html');
  const $drawerContainer = $('.book-drawer__container');
  const $drawerContentOverlay = $('.book-drawer__content-overlay');
  const $mainContent = $('.main-wrapper');


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
  };

  const toggleDrawer = () => {
    if (isDrawerOpen()) {
      hideDrawer();
    } else {
      showDrawer();
    }
  };

  // initializers
  // -----------------------------------
  // NOTE: these are technically outside of the module scope, although still
  // useful in general and not that expensive to run
  $('.remove-if-js').remove();
  $('.visible-if-js').show();

  // listeners
  // --------------------------------------------
  $('.book-drawer__toggle').click(() => {
    toggleDrawer();
  });

  $('.book-drawer__content-overlay').click(() => {
    hideDrawer();
  });

  // Close drawer when an anchor tag is clicked
  $('.book-drawer__container a').click(() => {
    hideDrawer();
  });

  // TODO: add module interface
});
