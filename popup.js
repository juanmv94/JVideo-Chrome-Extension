const depthlimit=2;

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	function tabscript(funcion,callback,...params) {
		chrome.scripting.executeScript({target: {tabId: tabs[0].id}, world: chrome.scripting.ExecutionWorld.MAIN, func: funcion, args: params}, res=>callback(res[0].result));
	}
	
	tabscript(limit=>{
		jvideo_res=[];
		function explora(dom,depth) {
			jvideo_res=jvideo_res.concat([...dom.querySelectorAll("video,audio")]);
			if (depth) for (let ifr of document.getElementsByTagName("iframe")) {
				try {explora(ifr.contentWindow.document,depth-1);} catch(err) {}	//no se puede acceder a algunos iframes
			}
		}
		explora(document,limit);
		return jvideo_res.map(r=>r.tagName);
	}, result => {
		console.log(result);
		if (!result.length) return;
		for (let boton of document.querySelectorAll("#velocidades button")) {boton.disabled=false; boton.onclick = e=>seleccionaVelocidad(e.target.innerText);}
		for (let boton of document.querySelectorAll("#otros button")) boton.disabled=false;
		audio0.onclick = e=>audioPitch(false); audio1.onclick = e=>audioPitch(true); fin.onclick=gotofin;
		for (let medio of result) {
			const label = document.createElement("label");
			label.className="icono "+medio;
			const input = document.createElement("input");
			const span = document.createElement("span");
			input.type="radio"; input.name="radio"; span.className="checkmark";
			input.addEventListener('change',seleccionaMedio);
			label.appendChild(input); label.appendChild(span); iconos.appendChild(label);
		}
		document.querySelector("input").checked=true;
		seleccionaMedio();
	},depthlimit);
	
	function seleccionaMedio() {
		let i=0;
		for (let medio of document.getElementsByTagName("input")) {
			if (medio.checked) break; else i++;
		}
		tabscript(id=>{
			jvideo_sel=jvideo_res[id];
			return jvideo_sel.currentSrc;
		}, result => {
			url.value=result;
			if (url.value=="") {
				texto.innerHTML="Medio no iniciado";
				texto.style.color="#FF3300";
				abrir.disabled=true; descargar.disabled=true; copiar.disabled=true;
			} else if (url.value.startsWith("blob")) {
				texto.innerHTML="Medio no descargable";
				texto.style.color="#FF3300";
				abrir.disabled=true; descargar.disabled=true; copiar.disabled=true;
			} else {
				texto.innerHTML="¡Medio descargable!";
				texto.style.color="green";
				abrir.disabled=false; descargar.disabled=false; copiar.disabled=false;
			}
		},i);
	}
	
	function seleccionaVelocidad(v) {
		tabscript(vel=>jvideo_sel.playbackRate=vel, ()=>{}, v);
	}
	
	function audioPitch(p) {
		tabscript(x=>jvideo_sel.preservesPitch=x, ()=>{}, p);
	}
	
	function gotofin() {
		tabscript(()=>jvideo_sel.currentTime=jvideo_sel.duration-3, ()=>{});
	}
	
});

abrir.onclick = function(element) {
	chrome.tabs.create({url:url.value},null);
	window.close();
};

descargar.onclick = function(element) {
	chrome.downloads.download({
	  url: url.value
	},function(v_id){chrome.tabs.create({url:"chrome://downloads/"},null);window.close();});
}

copiar.onclick = function(element) {
	navigator.clipboard.writeText(url.value);
	window.close();
}
