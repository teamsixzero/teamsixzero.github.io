/* globals $ */
// TODO: convert these to es5

$(() => {
  const $drawerContainer = $('.book-drawer__container');
  const $drawerContentOverlay = $('.book-drawer__content-overlay');
  const drawerVisibleClass = 'book-drawer__container--visible';

  // helpers
  // ----------------------------------
  const hideDrawer = () => {
    $drawerContainer.removeClass('book-drawer__container--visible');
    $drawerContentOverlay.hide();
  };

  const toggleDrawer = () => {
    $drawerContainer.toggleClass(drawerVisibleClass);

    if ($drawerContainer.hasClass(drawerVisibleClass)) {
      $drawerContentOverlay.show();
    } else {
      $drawerContentOverlay.hide();
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
