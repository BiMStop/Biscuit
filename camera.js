/*
Setup
*/
var require = parent.require;
console.log('camera.js loaded!')
var fs = parent.require('fs');
var ffmpeg = require('ffmpeg-static');
var dialog = require('remote').require('dialog');
console.log(dialog);
require('shelljs/global');
var tmp = parent.tempdir();
var $ = parent.$
// Variables to use later
var curframe = 1,
  framearr = [],
  scale = (1 + (1/3)),
  framez = '-i ',
  onion = true,
  pbarr = [],
  cur = 0,
  pb,
  ext,
  streamOpts = {
    "video": true
  };
// Shortcuts moved to bottom
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
    if (onion = true) {
      document.querySelector("#canvas").style.opacity = "0.5";
    } else {
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
    playbackimg = document.getElementById("playback"),
    QframePreview = document.querySelector("#area-frame-preview");

  fs.readFile(tmp+'Biscuit/framearr.biscuit', function(err, data) {
    var framearr = data;
  });
  fs.readFile(tmp+'Biscuit/pbarr.biscuit', function(err, data) {
    var pbarr = data;
  });
  fs.readFile(tmp+'Biscuit/curframe.biscuit', function(err, data) {
    var curframe = data;
  });

  // Display the video stream
  AdapterJS.webRTCReady(function(isUsingPlugin) {
    getUserMedia(streamOpts, function(stream) {
      window.stream = stream;
      video = attachMediaStream(video, stream);
      // Aparently things can't detect an object, and just wants to use it as a url.
      stream = stream.replace(/(.+)\//i, '');
      $("#video").attr("src", stream);
      video.src = stream;
      video.play();
    }, function() {});
  });
  // Take picture button
  document.querySelector("#snap").addEventListener("click", function() {
    // Draw the frame for both preview and export
    context.drawImage(video, 0, 0, 320, 240);
    // Convert the frame to JPG format
    var frame = canvas.toDataURL("image/jpeg");
    // Preview the captured frame
    QframePreview.insertAdjacentHTML('beforeend', '<img style="border: 2px solid #DDB05B;" class="frame" id="f' + curframe + '" width="160" height="120" src="' + frame + '"/>');
    $("#f"+curframe).css("display", "none");
    $("#f"+curframe).fadeIn(350);
    //QframePreview.insertAdjacentHTML('beforeend', '<script>document.querySelector("#f' + curframe + '").addEventListener("click",function(){framearr.splice("' + curframe + '");pbarr.splice("' + curframe + '");document.querySelector("#f' + curframe + '").width = 0;document.querySelector("#f' + curframe + '").height = 0;document.querySelector("#f' + curframe + '").src ="";});</script>')
      // Stuff after to not slow down frame preview
    contextuse.drawImage(video, 0, 0, 1280, 960);
    // Convert the frame to JPG format
    var frameuse = canvasuse.toDataURL("image/jpeg"),
      frameq = frameuse.replace('data:image/jpeg;base64,', '');
    // Store the frame for saving later
    framearr.push(frameq);
    // Store frame for playback
    pbarr.push(frame);
    fs.writeFile(tmp + 'Biscuit/framearr.biscuit', framearr, function(err) {});
    fs.writeFile(tmp + 'Biscuit/pbarr.biscuit', pbarr, function(err) {});
    fs.writeFile(tmp + 'Biscuit/curframe.biscuit', curframe, function(err) {});

    // Store frame for video export
    // Go to the next frame
    curframe++;
  });
  // Download button
  document.querySelector("#btn-download").addEventListener("click", function() {
    var go = 0;
    dialog.showOpenDialog({properties:['openDirectory']},function(pathz) {
      pathz = pathz + '/';
    // Setup
    for (var i = 0; i < framearr.length; i++) {
      //console.log("framearr: " + framearr);
      var frameprocess = framearr.length - go;
      //console.log("frameprocess: " + frameprocess);
      var framesave = framearr[i];
      //console.log("framesave: " + framesave);
      var frame64 = framesave.replace('data:image/jpeg;base64,', '');
      //console.log("frame64: " + frame64);
      var options = {
        filename: pathz + 'frame' + frameprocess
      };
      ext = '.jpg';
      var imageData = new parent.Buffer(frame64, 'base64');
      // Base64 image load.
      base64decoder(imageData, options, function(err, saved) {
        if (err) {
          //console.log(err);
        }
        //console.log(saved);
      });
      go = go - 1;
    }
    });
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
    pb = setInterval("playback()", (1000 / fr));
  });
  document.querySelector("img").addEventListener("click", function() {
    var selframe = document.querySelector(".frame").id;
    document.querySelector(".frame").src = "";
    document.querySelector(".frame").width = 0;
    document.querySelector(".frame").height = 0;
    framearr.splice(selframe);
  });
  // Using getElementById becuase querySelector didn't want to work.
  document.getElementById("btn-export").addEventListener("click", function() {
    parent.mkdir(tmp+'Biscuit');
    var frexst = document.querySelector("#exframerate").value
    var frex = parseInt(frexst);
    console.log(frex);
    console.log(ffmpeg.path);
    var path = '"'+ffmpeg.path+'"';
    var go = 0;
    var frameprocess = 1
    var add = '0000';
    // Setup
    for (var i = 0; i < framearr.length; i++) {
      if (frameprocess > 9 && frameprocess < 99){
        var add = '000';
      }
      if (frameprocess > 99 && frameprocess < 999){
        var add = '00';
      }
      if (frameprocess > 999 && frameprocess < 9999){
        var add = '0';
      }
      if (frameprocess > 9999 && frameprocess < 99999){
        var add = '';
      }
      var framesave = framearr[i];
      var frame64 = framesave.replace('data:image/jpeg;base64,', '');
      var options = {
        filename: tmp+'Biscuit/frame1'+add+frameprocess
      };
      console.log(tmp+'Biscuit/frame1'+add+frameprocess);
      ext = '.jpg';
      var imageData = new parent.Buffer(frame64, 'base64');
      base64decoder(imageData, options, function(err, saved) {});
      frameprocess++
    }
    dialog.showSaveDialog(function(pathz) {
      parent.exec(path+' -pattern_type glob -i "'+tmp+'Biscuit/frame*.jpg" -framerate '+frex+' -r '+frex+' -s 1280x920 "'+pathz+'"', function(code, output) {
      console.log('Program output:', output);
      console.log('Done');
      parent.rm('-rf', tmp+'Biscuit/*');
    });
    });
  });

}, false);

/*
Base64 Decode
*/
'use strict';

var base64encoder = function(url, options, callback) {
  options = options || {};

  if (typeof callback !== 'function') {
    throw new Error('Callback needs to be a function!');
  }

  if (url === undefined || url === null) {
    throw new Error('URL cannot be empty!');
  }

  var encoder = function(body, options) {
    var image;

    if (options && options.string === true) {
      image = body.toString('base64');
      return callback(null, image);
    } else {
      image = new parent.Buffer(body, 'base64');
      return callback(null, image);
    }
  };

  if (options && options.localFile === true) {
    fs.readFile(url, function(err, data) {
      if (err) {
        return callback(err);
      }

      return encoder(data, options);
    });
  } else {
    request({
      url: url,
      encoding: null
    }, function(err, res, body) {
      if (err) {
        return callback(err);
      }

      if (body && res.statusCode === 200) {
        return encoder(body, options);
      }
    });
  }

};

var base64decoder = function(imageBuffer, options, callback) {
  options = options || {};

  if (options && options.filename) {
    fs.writeFile(options.filename + ext, imageBuffer, 'base64', function(err) {
      if (err) {
        return callback(err);
      }
      return callback(null, 'Image saved successfully to disk!');
      alert('Frames Successfully Exported!');
    });
  }
};

/*module.exports = {
  base64encoder: base64encoder,
  base64decoder: base64decoder
};*/

/*
Shortcut functions
*/
// Take picture button
function takeframe() {
  // Draw the frame for both preview and export
  context.drawImage(video, 0, 0, 320, 240);
  // Convert the frame to JPG format
  var frame = canvas.toDataURL("image/jpeg");
  // Preview the captured frame
  QframePreview.insertAdjacentHTML('beforeend', '<img class="frame" id="f' + curframe + '" width="160" height="120" src="' + frame + '"/>');
  // Stuff after to not slow down frame preview
  contextuse.drawImage(video, 0, 0, 1280, 960);
  var framexvid = contextuse.getImageData(0,0,1280,960);
  // Store frame for video export
  exarr.push(framexvid);
  // Convert the frame to JPG format
  var frameuse = canvasuse.toDataURL("image/jpeg"),
    frameq = frameuse.replace('data:image/jpeg;base64,', '');
  // Store the frame for saving later
  framearr.push(frameq);
  // Store frame for playback
  pbarr.push(frame);
  // Store frame for video export

  // Go to the next frame
  curframe++;
};
/*
Setup
*/
// Variables to use later
  var exarr = [],
  streamOpts = {
    "video": true
  };

/*
Mousetrap Source
*/
/* mousetrap v1.5.3 craig.is/killing/mice */
(function(C,r,g){function t(a,b,h){a.addEventListener?a.addEventListener(b,h,!1):a.attachEvent("on"+b,h)}function x(a){if("keypress"==a.type){var b=String.fromCharCode(a.which);a.shiftKey||(b=b.toLowerCase());return b}return l[a.which]?l[a.which]:p[a.which]?p[a.which]:String.fromCharCode(a.which).toLowerCase()}function D(a){var b=[];a.shiftKey&&b.push("shift");a.altKey&&b.push("alt");a.ctrlKey&&b.push("ctrl");a.metaKey&&b.push("meta");return b}function u(a){return"shift"==a||"ctrl"==a||"alt"==a||
"meta"==a}function y(a,b){var h,c,e,g=[];h=a;"+"===h?h=["+"]:(h=h.replace(/\+{2}/g,"+plus"),h=h.split("+"));for(e=0;e<h.length;++e)c=h[e],z[c]&&(c=z[c]),b&&"keypress"!=b&&A[c]&&(c=A[c],g.push("shift")),u(c)&&g.push(c);h=c;e=b;if(!e){if(!k){k={};for(var m in l)95<m&&112>m||l.hasOwnProperty(m)&&(k[l[m]]=m)}e=k[h]?"keydown":"keypress"}"keypress"==e&&g.length&&(e="keydown");return{key:c,modifiers:g,action:e}}function B(a,b){return null===a||a===r?!1:a===b?!0:B(a.parentNode,b)}function c(a){function b(a){a=
a||{};var b=!1,n;for(n in q)a[n]?b=!0:q[n]=0;b||(v=!1)}function h(a,b,n,f,c,h){var g,e,l=[],m=n.type;if(!d._callbacks[a])return[];"keyup"==m&&u(a)&&(b=[a]);for(g=0;g<d._callbacks[a].length;++g)if(e=d._callbacks[a][g],(f||!e.seq||q[e.seq]==e.level)&&m==e.action){var k;(k="keypress"==m&&!n.metaKey&&!n.ctrlKey)||(k=e.modifiers,k=b.sort().join(",")===k.sort().join(","));k&&(k=f&&e.seq==f&&e.level==h,(!f&&e.combo==c||k)&&d._callbacks[a].splice(g,1),l.push(e))}return l}function g(a,b,n,f){d.stopCallback(b,
b.target||b.srcElement,n,f)||!1!==a(b,n)||(b.preventDefault?b.preventDefault():b.returnValue=!1,b.stopPropagation?b.stopPropagation():b.cancelBubble=!0)}function e(a){"number"!==typeof a.which&&(a.which=a.keyCode);var b=x(a);b&&("keyup"==a.type&&w===b?w=!1:d.handleKey(b,D(a),a))}function l(a,c,n,f){function e(c){return function(){v=c;++q[a];clearTimeout(k);k=setTimeout(b,1E3)}}function h(c){g(n,c,a);"keyup"!==f&&(w=x(c));setTimeout(b,10)}for(var d=q[a]=0;d<c.length;++d){var p=d+1===c.length?h:e(f||
y(c[d+1]).action);m(c[d],p,f,a,d)}}function m(a,b,c,f,e){d._directMap[a+":"+c]=b;a=a.replace(/\s+/g," ");var g=a.split(" ");1<g.length?l(a,g,b,c):(c=y(a,c),d._callbacks[c.key]=d._callbacks[c.key]||[],h(c.key,c.modifiers,{type:c.action},f,a,e),d._callbacks[c.key][f?"unshift":"push"]({callback:b,modifiers:c.modifiers,action:c.action,seq:f,level:e,combo:a}))}var d=this;a=a||r;if(!(d instanceof c))return new c(a);d.target=a;d._callbacks={};d._directMap={};var q={},k,w=!1,p=!1,v=!1;d._handleKey=function(a,
c,e){var f=h(a,c,e),d;c={};var k=0,l=!1;for(d=0;d<f.length;++d)f[d].seq&&(k=Math.max(k,f[d].level));for(d=0;d<f.length;++d)f[d].seq?f[d].level==k&&(l=!0,c[f[d].seq]=1,g(f[d].callback,e,f[d].combo,f[d].seq)):l||g(f[d].callback,e,f[d].combo);f="keypress"==e.type&&p;e.type!=v||u(a)||f||b(c);p=l&&"keydown"==e.type};d._bindMultiple=function(a,b,c){for(var d=0;d<a.length;++d)m(a[d],b,c)};t(a,"keypress",e);t(a,"keydown",e);t(a,"keyup",e)}var l={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",
20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"ins",46:"del",91:"meta",93:"meta",224:"meta"},p={106:"*",107:"+",109:"-",110:".",111:"/",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},A={"~":"`","!":"1","@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";",'"':"'","<":",",">":".","?":"/","|":"\\"},z={option:"alt",command:"meta","return":"enter",
escape:"esc",plus:"+",mod:/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"meta":"ctrl"},k;for(g=1;20>g;++g)l[111+g]="f"+g;for(g=0;9>=g;++g)l[g+96]=g;c.prototype.bind=function(a,b,c){a=a instanceof Array?a:[a];this._bindMultiple.call(this,a,b,c);return this};c.prototype.unbind=function(a,b){return this.bind.call(this,a,function(){},b)};c.prototype.trigger=function(a,b){if(this._directMap[a+":"+b])this._directMap[a+":"+b]({},a);return this};c.prototype.reset=function(){this._callbacks={};this._directMap=
{};return this};c.prototype.stopCallback=function(a,b){return-1<(" "+b.className+" ").indexOf(" mousetrap ")||B(b,this.target)?!1:"INPUT"==b.tagName||"SELECT"==b.tagName||"TEXTAREA"==b.tagName||b.isContentEditable};c.prototype.handleKey=function(){return this._handleKey.apply(this,arguments)};c.init=function(){var a=c(r),b;for(b in a)"_"!==b.charAt(0)&&(c[b]=function(b){return function(){return a[b].apply(a,arguments)}}(b))};c.init();C.Mousetrap=c;"undefined"!==typeof module&&module.exports&&(module.exports=
c);"function"===typeof define&&define.amd&&define(function(){return c})})(window,document);

// Shortcuts
Mousetrap.bind('command+shift+c', function() {
    window.location.href = "camera.html";
});
Mousetrap.bind('ctrl+shift+c', function() {
    window.location.href = "camera.html";
});
Mousetrap.bind('command+shift+h', function() {
    window.location.href = "index.html";
});
Mousetrap.bind('ctrl+shift+h', function() {
    window.location.href = "index.html";
});
Mousetrap.bind('command+shift+a', function() {
    window.location.href = "audio.html";
});
Mousetrap.bind('ctrl+shift+a', function() {
    window.location.href = "audio.html";
});
Mousetrap.bind('command+shift+w', function() {
    window.location.href = "write.html";
});
Mousetrap.bind('ctrl+shift+w', function() {
    window.location.href = "write.html";
});
Mousetrap.bind('r', function() {
    takeframe();
});
Mousetrap.bind('p', function() {
    playback();
});
Mousetrap.bind('command+shift+0', function() {
    mainWindow.openDevTools();
});
