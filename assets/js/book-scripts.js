"use strict";
/* globals $ */

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
});
