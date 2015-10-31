$(document).ready(function() {
  $("body").css("display", "none");
  $("body").fadeIn(2000);
  $("a").click(function(event) {
    event.preventDefault();
    linkLocation = this.href;
    $("body").fadeOut(2000, redirectPage);
  });

  function redirectPage() {
  if (location.href.indexOf('reload')==-1) location.replace(location.href+'?reload');
  window.location = linkLocation;
  }
});
