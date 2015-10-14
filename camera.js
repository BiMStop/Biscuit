var fs     = require('fs'),
    base64 = require('node-base64-image');

// Variables to use later
var curframe   = 1,
    framearr   = [],
    onion      = true,
    streamOpts = { "video": true };


window.addEventListener("DOMContentLoaded", function() {
  // Connect to the required DOM elements
  var canvasuse     = document.querySelector("#canvasuse"),
      contextuse    = canvasuse.getContext("2d"),
      canvas        = document.querySelector("#canvas"),
      context       = canvas.getContext("2d"),
      video         = document.getElementById("video"),
      QframePreview = document.querySelector("#area-frame-preview");


  function errBack(error) {
    console.log("Video capture error: ", error.code);
  };

  // Display the video stream
  // Standardized version
  if (navigator.getUserMedia) {
    navigator.getUserMedia(streamOpts, function(stream) {
      video.src = stream;
      video.play();
    }, errBack);

    // WebKit-prefixed version
  } else if (navigator.webkitGetUserMedia) {
    navigator.webkitGetUserMedia(streamOpts, function(stream) {
      video.src = window.URL.createObjectURL(stream);
      video.play();
    }, errBack);
  }


  // Take picture button
  document.querySelector("#snap").addEventListener("click", function() {
    // Draw the frame for both preview and export
    context.drawImage(video, 0, 0, 320, 240);
    contextuse.drawImage(video, 0, 0, 1280, 960);

    // Convert the frame to JPG format
    var frame    = canvas.toDataURL("image/jpeg"),
        frameuse = canvasuse.toDataURL("image/jpeg"),
        frameq   = frameuse.replace('data:image/jpeg;base64,', '');

    // Store the frame for saving later
    framearr.push(frameq);

    // Preview the captured frame
    QframePreview.insertAdjacentHTML('beforeend', '<img id="f' + curframe + '" width="160" height="120" src="' + frame + '"/>');

    // Go to the next frame
    curframe++;
  });


  // Download button
  document.querySelector("#btn-download").addEventListener("click", function() {
    var go = 0;
      // Setup
    for (var i = 0; i < framearr.length; i++) {
      console.log("framearr: " + framearr);
      var frameprocess = framearr.length - go;
      console.log("frameprocess: " + frameprocess);
      var framesave = framearr[i];
      console.log("framesave: " + framesave);
      var frame64 = framesave.replace('data:image/jpeg;base64,', '');
      console.log("frame64: " + frame64);
      var options = {
        filename: 'frame' + frameprocess
      };
      var imageData = new Buffer(frame64, 'base64');
      // Base64 image load.
      base64.base64decoder(imageData, options, function(err, saved) {
        if (err) {
          console.log(err);
        }
        console.log(saved);
      });
      go = go - 1;
    }
  });
  document.querySelector("#btn-onion").addEventListener("click", function() {
    if (onion){
      console.log("onion: "+onion);
      document.querySelector("#canvas").style.opacity = "0";
      console.log(document.querySelector("#canvas").style.opacity);
      onion = false;
    }else {
      console.log("onion: "+onion);
      document.querySelector("#canvas").style.opacity = "0.5";
      console.log(document.querySelector("#canvas").style.opacity);
      onion = true;
    }
    });

}, false);
