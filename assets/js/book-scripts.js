/* globals $ */
// TODO: convert these to es5

$(() => {
  const $drawerContainer = $('.book-drawer__container');
  const $drawerContentOverlay = $('.book-drawer__content-overlay');
  const $bookContent = $('.book-content');
  const drawerVisibleClass = 'book-drawer__container--visible';

  // helpers
  // ----------------------------------
  const hideDrawer = () => {
    $drawerContainer.removeClass('book-drawer__container--visible');
    $bookContent.removeClass('book-content__blur');
    $drawerContentOverlay.hide();
  };

  const toggleDrawer = () => {
    $drawerContainer.toggleClass(drawerVisibleClass);

    if ($drawerContainer.hasClass(drawerVisibleClass)) {
      $drawerContentOverlay.show();
      $bookContent.addClass('book-content__blur');
    } else {
      $drawerContentOverlay.hide();
      $bookContent.removeClass('book-content__blur');
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
