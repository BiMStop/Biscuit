$(document).ready(function() {
  $("div.page").css("display", "none");
  $("div.page").fadeIn(100);
  $("a").click(function(event) {
    event.preventDefault();
    linkLocation = this.href;
    $("div.page").fadeOut(100, redirectPage);
  });

  function redirectPage() {
  var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (xhttp.readyState == 4 && xhttp.status == 200) {
    document.querySelector("#page").innerHTML = xhttp.responseText;
  }
}
xhttp.open("GET", linkLocation, true);
xhttp.send();
}
  }
});
