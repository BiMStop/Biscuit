var fs = require('fs');
document.querySelector("#btn-save").addEventListener("click", function() {
  var filenameb4 = document.querySelector("#name").value;
  var filenameaftr = filenameb4.replace('.txt', '');
  var content = document.querySelector("#write").value;
  fs.writeFile(filenameaftr+'.txt', content, function(err) {
    if (err) {
      console.log('File could not be saved');
    } else {
      console.log('File has been saved');
    }
  });
});
