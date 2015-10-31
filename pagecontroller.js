$(document).ready(function() {
  $("div.page").css("display", "none");
  $("div.page").fadeIn(100);
  $("a").click(function(event) {
    event.preventDefault();
    linkLocation = this.href;
    console.log(this.href);
    $("div.page").fadeOut(100, redirectPage);
  });

  function redirectPage() {
    $.ajax({
      url: "camera.html",
      context: document.body
    }).done(function() {
      $( this ).addClass( "done" );
    });
  }
});
