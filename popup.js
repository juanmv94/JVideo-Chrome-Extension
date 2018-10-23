window.onload=function()
{
var ver = document.getElementById('ver');
var descargar = document.getElementById('descargar');
var texto = document.getElementById('texto');
var vidurl;

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'try{document.getElementsByTagName("video")[0].currentSrc;} catch(err){\
		var iframes=document.getElementsByTagName("iframe");\
		for (let i=0; i<iframes.length;i++) {try{iframes[i].contentWindow.document.getElementsByTagName("video")[0].currentSrc; break;} catch(err){}}\
		\}'},
		function(result){
			vidurl=result[0];
			if (vidurl!=null && vidurl!="") {
				if (vidurl.slice(0,4)=="blob")
				{
					texto.innerHTML="Video incompatible";
				}
				else
				{
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
/*
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'window.open("'+vidurl+'","_blank");'});
  });
  */
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
