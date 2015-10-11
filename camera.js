var curframe = 1;
//Variables to use later
window.addEventListener("DOMContentLoaded", function() {
  var base64 = require('node-base64-image');
  // Grab elements, create settings, etc.
  var canvasuse = document.getElementById("canvasuse");
  var contextuse = canvasuse.getContext("2d");
  var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    video = document.getElementById("video"),
    videoObj = {
      "video": true
    },
    errBack = function(error) {
      console.log("Video capture error: ", error.code);
    };
  // Put video listeners into place
  if (navigator.getUserMedia) { // Standard
    navigator.getUserMedia(videoObj, function(stream) {
      video.src = stream;
      video.play();
      // Show what is on camera.
    }, errBack);
  } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
    navigator.webkitGetUserMedia(videoObj, function(stream) {
      video.src = window.webkitURL.createObjectURL(stream);
      video.play();
    }, errBack);
  }
  // Trigger photo take
  document.getElementById("snap").addEventListener("click", function() {
    context.drawImage(video, 0, 0, 320, 240);
    // Make grab image from video. Grab for preview
    contextuse.drawImage(video, 0, 0, 1280, 960);
    // Grab for export.
    eval('var frame' + curframe + ' = canvas.toDataURL("image/jpeg")');
    // Get Image URL
    eval('var frameuse' + curframe + ' = canvasuse.toDataURL("image/jpeg")');
    // Get Image URL for export
    eval('var frame = ' + "frame" + curframe + '');
    // Set current frame based on variable that changes aka variable variable.... ha. haha.
    document.getElementById("framez" + curframe).innerHTML = '<img id="f' + curframe + '" width="160" height="120" src="' + frame + '"/>';
    //
    eval('var frameuse = ' + "frameuse" + curframe + '');
    // Same.
    document.getElementById("framezuse" + curframe).innerHTML = '<img id="fu' + curframe + '" width="1280" height="960" src="' + frameuse + '"/>';
    // More export
    console.log(frame1);
    // Debug
    // Show image taken on page, based on current frame.
    console.log("cur1: " + curframe);
    // Debug
    curframe = curframe + 1;
    // Make current frame the next frame.
    console.log("cur2: " + curframe)
      // Debug
    if (curframe >= 5) {
      // if the current frame is now 5 or higher (needs to check for higher becuase the equal was changing the variable)
      console.log("curif: " + curframe);
      // Debug
      curframe = 1;
      // Set the current frame to 1 so preview can be updated accordingly.
    }

  });
  document.getElementById("download").addEventListener("click", function() {
    // Check for button press.
    var farem = document.getElementById("fu1").src;
    // Get source of hidden image.
    console.log("farem: " + farem);
    // Debug
    var frames1 = farem.replace('data:image/jpeg;base64,', '');
    // Convert to only being a base64 string.
    console.log("frames1: " + frames1);
    // Debug
    var options = {
      filename: 'testz'
    };
    // Set filename, will be dynamic later.
    var imageData = new Buffer(frames1, 'base64');
    // Base64 image load.

    base64.base64decoder(imageData, options, function(err, saved) {
      if (err) {
        console.log(err);
      }
      console.log(saved);
    });
    // Export image to filesystem.
    var fs = require('fs');
    // Require the filesystem to be accessable.
  });

}, false);
