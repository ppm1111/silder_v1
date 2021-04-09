function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
function appendHtml(el, str) {
  var div = document.createElement('div'); //container to append to
  div.innerHTML = str;
  while (div.children.length > 0) {
    el.appendChild(div.children[0]);
  }
}
document.addEventListener("DOMContentLoaded", function(){
  let url = "";
  if (isMobile() || isMobileWidth()) {
    url = "https://juststarinfo.com/sponsor/mobile_config.php";
  } else {
    url = "https://juststarinfo.com/sponsor/desktop_config.php";
  }
	readTextFile(url, function(res) {
    let json = JSON.parse(res);
    json.images.forEach(function(item) {
      var aTag = document.createElement("a");
      aTag.setAttribute("href", item.website);
      var imgTag = document.createElement("img");
      imgTag.setAttribute("src", item.url);
      imgTag.setAttribute("alt", item.alt);
      imgTag.setAttribute("width", item.width);
      imgTag.setAttribute("height", item.height);
      aTag.appendChild(imgTag);
      document.getElementById("slider-images").appendChild(aTag);
    });
	})
	document.getElementsByClassName("close")[0].addEventListener("click", function( event ) {
	   document.getElementById('slider-images').remove()
	}, false);
});

function isMobile() {
  let ua = navigator.userAgent;
  return /Android|webOS|iPhone|iPad|iPod/i.test(ua);
}

function isMobileWidth() {
  return window.innerWidth <= 768;
}