/*
Setup
*/
var fs = require('fs');
var ffmpeg = require('ffmpeg-static');
var dialog = require('remote').require('dialog')
require('shelljs/global');
var tmp = tempdir();
// Variables to use later
var curframe = 1,
  framearr = [],
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
  // blog-util https://www.npmjs.com/package/blob-util
  !function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.blobUtil=e()}}(function(){return function e(t,n,r){function o(u,f){if(!n[u]){if(!t[u]){var c="function"==typeof require&&require;if(!f&&c)return c(u,!0);if(i)return i(u,!0);var a=new Error("Cannot find module '"+u+"'");throw a.code="MODULE_NOT_FOUND",a}var s=n[u]={exports:{}};t[u][0].call(s.exports,function(e){var n=t[u][1][e];return o(n?n:e)},s,s.exports,e,t,n,r)}return n[u].exports}for(var i="function"==typeof require&&require,u=0;u<r.length;u++)o(r[u]);return o}({1:[function(e,t,n){(function(e){function n(e){for(var t=0;t<e.length;t++){var n=e[t];if(n.buffer instanceof ArrayBuffer){var r=n.buffer;if(n.byteLength!==r.byteLength){var o=new Uint8Array(n.byteLength);o.set(new Uint8Array(r,n.byteOffset,n.byteLength)),r=o.buffer}e[t]=r}}}function r(e,t){t=t||{};var r=new i;n(e);for(var o=0;o<e.length;o++)r.append(e[o]);return t.type?r.getBlob(t.type):r.getBlob()}function o(e,t){return n(e),new Blob(e,t||{})}var i=e.BlobBuilder||e.WebKitBlobBuilder||e.MSBlobBuilder||e.MozBlobBuilder,u=function(){try{var e=new Blob(["hi"]);return 2===e.size}catch(t){return!1}}(),f=u&&function(){try{var e=new Blob([new Uint8Array([1,2])]);return 2===e.size}catch(t){return!1}}(),c=i&&i.prototype.append&&i.prototype.getBlob;t.exports=function(){return u?f?e.Blob:o:c?r:void 0}()}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],2:[function(e,t,n){},{}],3:[function(e,t,n){(function(n){"function"==typeof n.Promise?t.exports=n.Promise:t.exports=e(7)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{7:7}],4:[function(e,t,n){"use strict";function r(){}t.exports=r},{}],5:[function(e,t,n){"use strict";var r=e(8),o=e(10),i=e(11),u=e(4),f=e(6),c=o(new TypeError("must be an array"));t.exports=function(e){function t(e,t){function r(e){a[t]=e,++s===n&!o&&(o=!0,f.resolve(d,a))}i(e).then(r,function(e){o||(o=!0,f.reject(d,e))})}if("[object Array]"!==Object.prototype.toString.call(e))return c;var n=e.length,o=!1;if(!n)return i([]);for(var a=new Array(n),s=0,l=-1,d=new r(u);++l<n;)t(e[l],l);return d}},{10:10,11:11,4:4,6:6,8:8}],6:[function(e,t,n){"use strict";function r(e){var t=e&&e.then;return e&&"object"==typeof e&&"function"==typeof t?function(){t.apply(e,arguments)}:void 0}var o=e(14),i=e(12),u=e(13);n.resolve=function(e,t){var f=o(r,t);if("error"===f.status)return n.reject(e,f.value);var c=f.value;if(c)i.safely(e,c);else{e.state=u.FULFILLED,e.outcome=t;for(var a=-1,s=e.queue.length;++a<s;)e.queue[a].callFulfilled(t)}return e},n.reject=function(e,t){e.state=u.REJECTED,e.outcome=t;for(var n=-1,r=e.queue.length;++n<r;)e.queue[n].callRejected(t);return e}},{12:12,13:13,14:14}],7:[function(e,t,n){t.exports=n=e(8),n.resolve=e(11),n.reject=e(10),n.all=e(5)},{10:10,11:11,5:5,8:8}],8:[function(e,t,n){"use strict";function r(e){if(!(this instanceof r))return new r(e);if("function"!=typeof e)throw new TypeError("reslover must be a function");this.state=f.PENDING,this.queue=[],this.outcome=void 0,e!==i&&u.safely(this,e)}var o=e(15),i=e(4),u=e(12),f=e(13),c=e(9);t.exports=r,r.prototype["catch"]=function(e){return this.then(null,e)},r.prototype.then=function(e,t){if("function"!=typeof e&&this.state===f.FULFILLED||"function"!=typeof t&&this.state===f.REJECTED)return this;var n=new r(i);if(this.state!==f.PENDING){var u=this.state===f.FULFILLED?e:t;o(n,u,this.outcome)}else this.queue.push(new c(n,e,t));return n}},{12:12,13:13,15:15,4:4,9:9}],9:[function(e,t,n){"use strict";function r(e,t,n){this.promise=e,"function"==typeof t&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),"function"==typeof n&&(this.onRejected=n,this.callRejected=this.otherCallRejected)}var o=e(6),i=e(15);t.exports=r,r.prototype.callFulfilled=function(e){o.resolve(this.promise,e)},r.prototype.otherCallFulfilled=function(e){i(this.promise,this.onFulfilled,e)},r.prototype.callRejected=function(e){o.reject(this.promise,e)},r.prototype.otherCallRejected=function(e){i(this.promise,this.onRejected,e)}},{15:15,6:6}],10:[function(e,t,n){"use strict";function r(e){var t=new o(i);return u.reject(t,e)}var o=e(8),i=e(4),u=e(6);t.exports=r},{4:4,6:6,8:8}],11:[function(e,t,n){"use strict";function r(e){if(e)return e instanceof o?e:u.resolve(new o(i),e);var t=typeof e;switch(t){case"boolean":return f;case"undefined":return a;case"object":return c;case"number":return s;case"string":return l}}var o=e(8),i=e(4),u=e(6);t.exports=r;var f=u.resolve(new o(i),!1),c=u.resolve(new o(i),null),a=u.resolve(new o(i),void 0),s=u.resolve(new o(i),0),l=u.resolve(new o(i),"")},{4:4,6:6,8:8}],12:[function(e,t,n){"use strict";function r(e,t){function n(t){f||(f=!0,o.reject(e,t))}function r(t){f||(f=!0,o.resolve(e,t))}function u(){t(r,n)}var f=!1,c=i(u);"error"===c.status&&n(c.value)}var o=e(6),i=e(14);n.safely=r},{14:14,6:6}],13:[function(e,t,n){n.REJECTED=["REJECTED"],n.FULFILLED=["FULFILLED"],n.PENDING=["PENDING"]},{}],14:[function(e,t,n){"use strict";function r(e,t){var n={};try{n.value=e(t),n.status="success"}catch(r){n.status="error",n.value=r}return n}t.exports=r},{}],15:[function(e,t,n){"use strict";function r(e,t,n){o(function(){var r;try{r=t(n)}catch(o){return i.reject(e,o)}r===e?i.reject(e,new TypeError("Cannot resolve promise with itself")):i.resolve(e,r)})}var o=e(16),i=e(6);t.exports=r},{16:16,6:6}],16:[function(e,t,n){"use strict";function r(){u=!1,f&&f.length?l=f.concat(l):s=-1,l.length&&o()}function o(){u=!0;for(var e=l.length,t=setTimeout(r);e;){for(f=l,l=[];++s<e;)f[s]();s=-1,e=l.length}s=-1,u=!1,clearTimeout(t)}function i(e){1!==l.push(e)||u||c()}for(var u,f,c,a=[e(2),e(18),e(17),e(19),e(20)],s=-1,l=[],d=-1,p=a.length;++d<p;)if(a[d]&&a[d].test&&a[d].test()){c=a[d].install(o);break}t.exports=i},{17:17,18:18,19:19,2:2,20:20}],17:[function(e,t,n){(function(e){"use strict";n.test=function(){return e.setImmediate?!1:"undefined"!=typeof e.MessageChannel},n.install=function(t){var n=new e.MessageChannel;return n.port1.onmessage=t,function(){n.port2.postMessage(0)}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],18:[function(e,t,n){(function(e){"use strict";var t=e.MutationObserver||e.WebKitMutationObserver;n.test=function(){return t},n.install=function(n){var r=0,o=new t(n),i=e.document.createTextNode("");return o.observe(i,{characterData:!0}),function(){i.data=r=++r%2}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],19:[function(e,t,n){(function(e){"use strict";n.test=function(){return"document"in e&&"onreadystatechange"in e.document.createElement("script")},n.install=function(t){return function(){var n=e.document.createElement("script");return n.onreadystatechange=function(){t(),n.onreadystatechange=null,n.parentNode.removeChild(n),n=null},e.document.documentElement.appendChild(n),t}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],20:[function(e,t,n){"use strict";n.test=function(){return!0},n.install=function(e){return function(){setTimeout(e,0)}}},{}],21:[function(e,t,n){"use strict";function r(e){for(var t=e.length,n=new ArrayBuffer(t),r=new Uint8Array(n),o=-1;++o<t;)r[o]=e.charCodeAt(o);return n}function o(e){for(var t="",n=new Uint8Array(e),r=n.byteLength,o=-1;++o<r;)t+=String.fromCharCode(n[o]);return t}function i(e,t){return new B(function(n,r){var o=new Image;t&&(o.crossOrigin=t),o.onload=function(){n(o)},o.onerror=r,o.src=e})}function u(e){var t=document.createElement("canvas");t.width=e.width,t.height=e.height;var n=t.getContext("2d");return n.drawImage(e,0,0,e.width,e.height,0,0,e.width,e.height),t}function f(e,t){return t=t||{},"string"==typeof t&&(t={type:t}),new m(e,t)}function c(e){return(window.URL||window.webkitURL).createObjectURL(e)}function a(e){return(window.URL||window.webkitURL).revokeObjectURL(e)}function s(e){return new B(function(t,n){var r=new FileReader,i="function"==typeof r.readAsBinaryString;r.onloadend=function(e){var n=e.target.result||"";return i?t(n):void t(o(n))},r.onerror=n,i?r.readAsBinaryString(e):r.readAsArrayBuffer(e)})}function l(e,t){return B.resolve().then(function(){var n=[r(atob(e))];return t?f(n,{type:t}):f(n)})}function d(e,t){return B.resolve().then(function(){return l(btoa(e),t)})}function p(e){return s(e).then(function(e){return btoa(e)})}function h(e){return B.resolve().then(function(){var t=e.match(/data:([^;]+)/)[1],n=e.replace(/^[^,]+,/,""),o=r(atob(n));return f([o],{type:t})})}function v(e,t,n){return t=t||"image/png",i(e,n).then(function(e){return u(e)}).then(function(e){return e.toDataURL(t)})}function y(e,t){return B.resolve().then(function(){return"function"==typeof e.toBlob?new B(function(n){e.toBlob(n,t)}):h(e.toDataURL(t))})}function w(e,t,n){return t=t||"image/png",i(e,n).then(function(e){return u(e)}).then(function(e){return y(e,t)})}function b(e,t){return B.resolve().then(function(){return f([e],t)})}function g(e){return new B(function(t,n){var r=new FileReader;r.onloadend=function(e){var n=e.target.result||new ArrayBuffer(0);t(n)},r.onerror=n,r.readAsArrayBuffer(e)})}var m=e(1),B=e(3);t.exports={createBlob:f,createObjectURL:c,revokeObjectURL:a,imgSrcToBlob:w,imgSrcToDataURL:v,canvasToBlob:y,dataURLToBlob:h,blobToBase64String:p,base64StringToBlob:l,binaryStringToBlob:d,blobToBinaryString:s,arrayBufferToBlob:b,blobToArrayBuffer:g}},{1:1,3:3}]},{},[21])(21)});
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
    // Convert the frame to JPG format
    var frame = canvas.toDataURL("image/jpeg");

    // Preview the captured frame
    QframePreview.insertAdjacentHTML('beforeend', '<img class="frame" id="f' + curframe + '" width="160" height="120" src="' + frame + '"/>');
    // Stuff after to not slow down frame preview
    contextuse.drawImage(video, 0, 0, 1280, 960);
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
  });


  // Download button
  document.querySelector("#btn-download").addEventListener("click", function() {
    var go = 0;
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
        filename: 'frame' + frameprocess
      };
      ext = '.jpg';
      var imageData = new Buffer(frame64, 'base64');
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
      image = new Buffer(body, 'base64');
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

module.exports = {
  base64encoder: base64encoder,
  base64decoder: base64decoder
};

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
document.querySelector("#btn-export").addEventListener("click", function() {
  mkdir(tmp+'Biscuit');
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
    var imageData = new Buffer(frame64, 'base64');
    base64decoder(imageData, options, function(err, saved) {});
    frameprocess++
  }
  dialog.showSaveDialog(function(pathz) {
    exec(path+' -pattern_type glob -i "'+tmp+'Biscuit/frame*.jpg" -framerate '+frex+' -r '+frex+' -s 1280x920 "'+pathz+'"', function(code, output) {
    console.log('Program output:', output);
    console.log('Done');
    rm('-rf', tmp+'Biscuit/*');
  });
  });
});

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
