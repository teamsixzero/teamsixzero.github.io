/* globals $ */
// TODO: convert these to es5

$(() => {
  const $drawerContainer = $('.book-drawer__container');
  const $drawerContentOverlay = $('.book-drawer__content-overlay');
  const $bookContent = $('.main-wrapper');
  const drawerVisibleClass = 'book-drawer__container--visible';

  // helpers
  // ----------------------------------
  const hideDrawer = () => {
    $drawerContainer.removeClass('book-drawer__container--visible');
    $bookContent.removeClass('main-wrapper__blur');
    $drawerContentOverlay.hide();
  };

  const toggleDrawer = () => {
    $drawerContainer.toggleClass(drawerVisibleClass);

    if ($drawerContainer.hasClass(drawerVisibleClass)) {
      $drawerContentOverlay.show();
      $bookContent.addClass('main-wrapper__blur');
      $drawerContainer.focus();
    } else {
      hideDrawer();
    }
  };

  // initializers
  // -----------------------------------
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
});
