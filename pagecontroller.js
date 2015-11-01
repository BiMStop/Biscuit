$(document).ready(function() {
  $("iframe").css("display", "none");
  $("body").css("display", "none");
  $(".content").css("display", "none");
  $("iframe").width = 0;
  $("iframe").height = 0;
  $("body").fadeIn(300);
  $(".content").fadeIn(300);
  $("iframe").fadeIn(300);
});

function loadcamera() {
  $("iframe").fadeOut(350);
  $(".content").fadeOut(350);
  $("iframe").css("display", "none");
  $(".content").css("display", "none");
  $('#iframe').attr('src', 'camera.html').load(function() {
    $("iframe").fadeIn(350);
  });
}

function loadhome() {
  $("iframe").fadeOut(350);
  $(".content").fadeOut(350);
  $("iframe").css("display", "none");
  $('#iframe').attr('src', 'indexc.html').load(function() {
    $("iframe").fadeIn(350);
  });
}

function loadaudio() {
  $("iframe").fadeOut(350);
  $(".content").fadeOut(350);
  $("iframe").css("display", "none");
  $('#iframe').attr('src', 'audio.html').load(function() {
    $("iframe").fadeIn(350);
  });
}

function loadwrite() {
  $("iframe").fadeOut(350);
  $(".content").fadeOut(350);
  $("iframe").css("display", "none");
  $('#iframe').attr('src', 'write.html').load(function() {
    $("iframe").fadeIn(350);
  });
}

function loadabout() {
  $("iframe").fadeOut(350);
  $(".content").fadeOut(350);
  $("iframe").css("display", "none");
  $('#iframe').attr('src', 'about.html').load(function() {
    $("iframe").fadeIn(350);
  });
}
