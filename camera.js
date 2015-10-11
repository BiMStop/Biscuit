var curframe = 1;
//Variables to use later
window.addEventListener("DOMContentLoaded", function() {
    // Grab elements, create settings, etc.
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
        // Make grab image from video.
        eval('var frame' + curframe + ' = canvas.toDataURL("image/png")');
        // Get Image URL
        eval('var frame = ' + "frame" + curframe + '');
        // Set current frame based on variable that changes
        document.getElementById("frame" + curframe).innerHTML = '<img width="160" height="120" src="' + frame + '"/>';
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
		var fs = require('fs');
		var http = require('http');
		var file = fs.createWriteStream("file.jpg");
		var request = http.get(frame, function(response) {
  response.pipe(file);
	});
});

}, false);
