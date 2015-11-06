var audio_context;
var recorder;

function startUserMedia(stream) {
  var input = audio_context.createMediaStreamSource(stream);

  recorder = new Recorder(input, {
    numChannels: 1
  });
}

document.querySelector("#btn-rec").addEventListener("click", function() {
    recorder && recorder.record();
    button.disabled = true;
    button.nextElementSibling.disabled = false;
)}

function stopRecording(button) {
  recorder && recorder.stop();
  button.disabled = true;
  button.previousElementSibling.disabled = false;
  createDownloadLink();

  recorder.clear();
}

function createDownloadLink() {
  recorder && recorder.exportWAV(function(blob) {});
}

window.onload = function init() {
  try {
    // webkit shim
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = (navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia);
    window.URL = window.URL || window.webkitURL;

    audio_context = new AudioContext;
  }

  navigator.getUserMedia({
    audio: true
  }, startUserMedia, function(e) {});
};
