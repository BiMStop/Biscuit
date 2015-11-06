var require = parent.require;
var fs = require('fs');
var dialog = require('remote').require('dialog');
document.querySelector("#btn-save").addEventListener("click", function() {
  var content = document.querySelector("#write").value;
  dialog.showSaveDialog(function(pathz) {
    pathz = pathz.replace('.txt', '');
    fs.writeFile(pathz+'.txt', content, function(err) {
      if (err) {
        console.log('File could not be saved');
      } else {
        console.log('File has been saved');
      }
    });
  });
});
