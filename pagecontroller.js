$(document).ready(function() {
  $("body").fadeIn(300);
});

function loadcamera() {
  $("iframe").fadeOut(300);
  $('#iframe').attr('src', 'camera.html').load(function() {
    $("iframe").fadeIn(300);
  });
}

function loadhome() {
  $("iframe").fadeOut(300);
  $('#iframe').attr('src', 'indexc.html').load(function() {
    $("iframe").fadeIn(300);
  });
}

function loadaudio() {
  $("iframe").fadeOut(300);
  $('#iframe').attr('src', 'audio.html').load(function() {
    $("iframe").fadeIn(300);
  });
}

function loadwrite() {
  $("iframe").fadeOut(300);
  $('#iframe').attr('src', 'write.html').load(function() {
    $("iframe").fadeIn(300);
  });
}

function loadabout() {
  $("iframe").fadeOut(300);
  $('#iframe').attr('src', 'camera.html').load(function() {
    $("iframe").fadeIn(300);
  });
}
