 var errorCallback = function(e) {
    console.log('ERROR: Cannot use camera D:!', e);
  };
  navigator.getUserMedia({video: true, audio: true}, function(localMediaStream) {
    var video = document.querySelector('video');
    video.src = window.URL.createObjectURL(localMediaStream);
    video.onloadedmetadata = function(e) {
    };
  }, errorCallback);