/*
Setup
*/
/*
Base64 Decode
*/
'use strict';
var fs = require('fs');

var base64encoder = function (url, options, callback) {
  options = options || {};

  if (typeof callback !== 'function') {
    throw new Error('Callback needs to be a function!');
  }

  if (url === undefined || url === null) {
    throw new Error('URL cannot be empty!');
  }

  var encoder = function (body, options) {
    var image;

    if (options && options.string === true) {
      image = body.toString('base64');
      return callback(null, image);
    } else {
      image = new Buffer(body, 'base64');
      return callback(null, image);
    }
  };

  if (options && options.localFile === true) {
    fs.readFile(url, function (err, data) {
      if (err) { return callback(err); }

      return encoder(data, options);
    });
  } else {
    request({url: url, encoding: null}, function (err, res, body) {
      if (err) { return callback(err); }

      if (body && res.statusCode === 200) {
        return encoder(body, options);
      }
    });
  }

};

var base64decoder = function (imageBuffer, options, callback) {
  options = options || {};

  if (options && options.filename) {
    fs.writeFile(options.filename + '.jpg', imageBuffer, 'base64', function (err) {
      if (err) { return callback(err); }
      return callback(null, 'Image saved successfully to disk!');
    });
  }
};

module.exports = {
  base64encoder: base64encoder,
  base64decoder: base64decoder
};
/*
Directly got base64 decorder
*/
var fs = require('fs');


// Variables to use later
var curframe = 1,
  framearr = [],
  onion = true,
  pbarr = [],
  cur = 0,
  pb,
  streamOpts = {
    "video": true
  };

function playback() {
  document.querySelector("#playback").src = pbarr[cur];
  console.log(pbarr[cur]);
  console.log(cur);
  cur = cur + 1;
  if (cur >= pbarr.length) {
    cur = 0;
    clearInterval(pb);
    document.querySelector("#playback").style.opacity = "0";
    document.querySelector("#video").style.opacity = "1";
    if (onion = true){
    document.querySelector("#canvas").style.opacity = "0.5";
  }else {
    cur = 0;
    document.querySelector("#canvas").style.opacity = "0";
  }
  }
}

window.addEventListener("DOMContentLoaded", function() {
  // Connect to the required DOM elements
  var canvasuse = document.querySelector("#canvasuse"),
    contextuse = canvasuse.getContext("2d"),
    canvas = document.querySelector("#canvas"),
    context = canvas.getContext("2d"),
    video = document.getElementById("video"),
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
    var frame = canvas.toDataURL("image/jpeg"),
      frameuse = canvasuse.toDataURL("image/jpeg"),
      frameq = frameuse.replace('data:image/jpeg;base64,', '');

    // Store the frame for saving later
    framearr.push(frameq);
    // Store frame for playback
    pbarr.push(frame);

    // Preview the captured frame
    QframePreview.insertAdjacentHTML('beforeend', '<img class="frame" id="f' + curframe + '" width="160" height="120" src="' + frame + '"/>');

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
      base64decoder(imageData, options, function(err, saved) {
        if (err) {
          console.log(err);
        }
        console.log(saved);
      });
      go = go - 1;
    }
  });
  // Toggle onion skinning
  document.querySelector("#btn-onion").addEventListener("click", function() {
    if (onion) {
      console.log("onion: " + onion);
      document.querySelector("#canvas").style.opacity = "0";
      console.log(document.querySelector("#canvas").style.opacity);
      onion = false;
    } else {
      console.log("onion: " + onion);
      document.querySelector("#canvas").style.opacity = "0.5";
      console.log(document.querySelector("#canvas").style.opacity);
      onion = true;
    }
  });
  // Start playback
  document.querySelector("#btn-playback").addEventListener("click", function() {
    clearInterval(pb);
    var fr = document.querySelector("#framerate").value;
    document.querySelector("#playback").style.opacity = "1";
    document.querySelector("#video").style.opacity = "0";
    document.querySelector("#canvas").style.opacity = "0";
    fr = parseInt(fr);
    pb = setInterval("playback()", (1000/fr));
  });
  document.querySelector("img").addEventListener("click", function() {
    var selframe = document.querySelector(".frame").id;
    document.querySelector(".frame").src = "";
    document.querySelector(".frame").width = 0;
    document.querySelector(".frame").height = 0;
    framearr.splice(selframe);
  });

}, false);
