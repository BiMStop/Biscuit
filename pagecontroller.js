$(document).ready(function() {
  $("div.page").css("display", "none");
  $("div.page").fadeIn(100);
  $("a").click(function(event) {
    event.preventDefault();
    linkLocation = this.href;
    console.log(this.href);
    $("div.page").fadeOut(100, redirectPage);
  });

  function redirectPage(link) {
    console.log('12');
    var xhttp = new XMLHttpRequest();
    console.log('14');
    xhttp.onreadystatechange = function() {
      console.log('16');
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        console.log('18');
        document.getElementById("page").innerHTML = xhttp.responseText;
        console.log('20');
      }
      console.log('22');
    }
    console.log('24');
    xhttp.open("GET", link, true);
    console.log('26');
    xhttp.send();
    console.log('28');
  }
});
