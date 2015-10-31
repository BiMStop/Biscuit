$(document).ready(function() {
  $("iframe").css("display", "none");
  $("body").css("display", "none");
  $("body").fadeIn(300);
  $("iframe").fadeIn(300);
});

function loadcamera() {
  $("iframe").fadeOut(1000);
  $("iframe").css("display", "none");
  $('#iframe').attr('src', 'camera.html').load(function() {
    $("iframe").fadeIn(1000);
  });
}

function loadhome() {
  $("iframe").fadeOut(1000);
  $("iframe").css("display", "none");
  $('#iframe').attr('src', 'indexc.html').load(function() {
    $("iframe").fadeIn(1000);
  });
}

function loadaudio() {
  $("iframe").fadeOut(1000);
  $("iframe").css("display", "none");
  $('#iframe').attr('src', 'audio.html').load(function() {
    $("iframe").fadeIn(1000);
  });
}

function loadwrite() {
  $("iframe").fadeOut(1000);
  $("iframe").css("display", "none");
  $('#iframe').attr('src', 'write.html').load(function() {
    $("iframe").fadeIn(1000);
  });
}

function loadabout() {
  $("iframe").fadeOut(1000);
  $("iframe").css("display", "none");
  $('#iframe').attr('src', 'camera.html').load(function() {
    $("iframe").fadeIn(1000);
  });
}
