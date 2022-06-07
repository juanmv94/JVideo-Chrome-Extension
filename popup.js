window.onload=function()
{
var ver = document.getElementById('ver');
var descargar = document.getElementById('descargar');
var texto = document.getElementById('texto');
var vidurl;

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	chrome.scripting.executeScript({target: {tabId: tabs[0].id}, func: ()=>{
		try {return document.getElementsByTagName("video")[0].currentSrc;} catch(err) {
			for (let ifr of document.getElementsByTagName("iframe")) {
				try {return ifr.contentWindow.document.getElementsByTagName("video")[0].currentSrc;} catch(err) {}
			}
		}
	}, args: []}, result => {
		vidurl=result[0].result;
		if (vidurl!=null && vidurl!="") {
			if (vidurl.startsWith("blob")) texto.innerHTML="Video incompatible";
			else {
				texto.innerHTML="¡Video detectado!";
				texto.style.color="green";
				ver.disabled=false;
				descargar.disabled=false;
			}
		}
	});
});

ver.onclick = function(element) {
if (vidurl==null && vidurl!="") return;
  chrome.tabs.create({url:vidurl},null);
  window.close();
};

descargar.onclick = function(element) {
if (vidurl==null && vidurl!="") return;
chrome.downloads.download({
  url: vidurl
},function(v_id){chrome.tabs.create({url:"chrome://downloads/"},null);window.close();});
};
};
