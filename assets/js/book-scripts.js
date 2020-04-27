/* globals $ */
// TODO: convert these to es5

$(() => {
  $('.remove-if-js').remove();
  $('.visible-if-js').show();

  $('.book-drawer__toggle').click(() => {
    // toggle drawer visibility class
    $('.book-drawer__container').toggleClass('book-drawer__container--visible');
  });

  $('.book-drawer__container a').click(() => {
    $('.book-drawer__container').toggleClass('book-drawer__container--visible');
  });
});
