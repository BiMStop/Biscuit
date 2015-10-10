var curframe = 1;
window.addEventListener("DOMContentLoaded", function () {
		// Grab elements, create settings, etc.
		var canvas = document.getElementById("canvas"),
	context = canvas.getContext("2d"),
	video = document.getElementById("video"),
	videoObj = { "video": true },
	errBack = function (error) {
			console.log("Video capture error: ", error.code);
	};
		// Put video listeners into place
		if (navigator.getUserMedia) { // Standard
				navigator.getUserMedia(videoObj, function (stream) {
						video.src = stream;
						video.play();
				}, errBack);
		} else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
				navigator.webkitGetUserMedia(videoObj, function (stream) {
						video.src = window.webkitURL.createObjectURL(stream);
						video.play();
				}, errBack);
		}
		// Trigger photo take
		document.getElementById("snap").addEventListener("click", function () {
				context.drawImage(video, 0, 0, 320, 240);
				eval('var frame' + curframe + ' = canvas.toDataURL("image/png")');
				eval('var frame = '+"frame"+curframe+'');
				console.log(frame);
				console.log(frame1);
				document.getElementById("frame"+curframe).innerHTML = '<img width="160" height="120" src="'+frame+'"/>';
				curframe = parseInt(curframe);
				curframe = curframe + 1;
		});
}, false);
