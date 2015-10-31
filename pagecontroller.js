$(document).ready(function() {
  $("iframe").css("display", "none");
  $("body").fadeIn(300);
  $("iframe").fadeIn(300);
});

function loadcamera() {
  $("iframe").fadeOut(300);
  $("iframe").css("display", "none");
  $('#iframe').attr('src', 'camera.html').load(function() {
    $("iframe").fadeIn(300);
  });
}

function loadhome() {
  $("iframe").fadeOut(300);
  $("iframe").css("display", "none");
  $('#iframe').attr('src', 'indexc.html').load(function() {
    $("iframe").fadeIn(300);
  });
}

function loadaudio() {
  $("iframe").fadeOut(300);
  $("iframe").css("display", "none");
  $('#iframe').attr('src', 'audio.html').load(function() {
    $("iframe").fadeIn(300);
  });
}

function loadwrite() {
  $("iframe").fadeOut(300);
  $("iframe").css("display", "none");
  $('#iframe').attr('src', 'write.html').load(function() {
    $("iframe").fadeIn(300);
  });
}

function loadabout() {
  $("iframe").fadeOut(300);
  $("iframe").css("display", "none");
  $('#iframe').attr('src', 'camera.html').load(function() {
    $("iframe").fadeIn(300);
  });
}
