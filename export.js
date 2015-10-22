/*
Setup
*/
var fs = require('fs');
// Variables to use later
var curframe = 1,
  exarr = [],
  streamOpts = {
    "video": true
  };
document.querySelector("#snap").addEventListener("click", function() {
  var framexvid = canvasuse.toDataURL("image/webp");
  // Store frame for video export
  exarr.push(framexvid);

  // Go to the next frame
  curframe++;
});
document.querySelector("#btn-export").addEventListener("click", function() {
  var frexst = document.querySelector("#exframerate").value
  var frex = parseInt(frexst);
  var encoder = new Whammy.Video(frex);
  var gox = 0;
  for (var i = 0; i < exarr.length; i++) {
    var framexprocess = exarr.length - gox;
    var framex = exarr[i];
    console.log(framex);
    encoder.add(framex);
    if (i = exarr.length) {
      var output = encoder.compile();
      var url = (window.webkitURL || window.URL).createObjectURL(output);
      document.querySelector("#video-dl").href = url;
      console.log(url);
      // document.querySelector("#video-dl").innerHTML = "Download Video";
    }
    gox = gox - 1;
  }
});
