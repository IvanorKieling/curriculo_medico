//Função assíncrona para inserir dados
async function postAPI(obj, apiUrl) {

    const body = JSON.stringify(obj);           
	//console.log(body);
    const response = await fetch(apiUrl, { method: "POST", body});
    const jsonResponse = await response.json();

    // Caso de successo
    if (response.status === 200) {

		//Redireciona a página após o tempo de fade-out.
        $("body").fadeOut(500);
        setTimeout(function(){
            location = "http://localhost/web/curriculo/curriculo.html";
        }, 490);        
            
    // Caso de erro
    } else {
        alert(jsonResponse.error);
    }
}

//Função assíncrona para receber dados
async function getAPI(obj, apiUrl) {

    const body = JSON.stringify(obj);         
    const response = await fetch(apiUrl, { method: "POST", body});
    const jsonResponse = await response.json().then(function(obj){
		return obj;
	})

    // Caso de successo
    if (response.status === 200) {
        return jsonResponse;        
            
    // Caso de erro
    } else {
        alert(jsonResponse.error);
    }
}

function doCapture(crm, uf) {
    window.scrollTo(0, 0);

    let div = document.querySelector("#divImg");
    div.style.position="absolute";
    div.style.top="0px";
	div.style.left="0px";

    div.style.display="block";

    html2canvas(document.getElementById("divImg")).then(function (canvas) {
        
        let image = {};
		image.crm = crm;
		image.uf = uf;
        image.image=canvas.toDataURL("image/png", 1);
        div.style.display="none";
        const apiUrl = "http://localhost/web/curriculo/php/save-capture.php";
        
        postImg(image, apiUrl);
    });
} 

async function postImg(obj, apiUrl) {

    const body = JSON.stringify(obj);           

    const response = await fetch(apiUrl, { method: "POST", body});
    const jsonResponse = await response.json().then(
		function(obj){
			if(obj.status == "Ok")
				console.log("Imagem armazenada com sucesso.");
		}
	);
}

//Armazena o crm e uf no dispositivo do usuario
function storage(crm, uf){
	localStorage.setItem("crm", crm);
	localStorage.setItem("uf", uf);
}
//Cria os elementos html em tempo de execução
function addCurso(i){
            
	let container = document.querySelector("#containerFormacao");
	let hr = document.createElement("hr");
	container.appendChild(hr);
	let divCurso = document.createElement("div");
	container.appendChild(divCurso);
	divCurso.setAttribute("class", "form-group");
	let labelCurso = document.createElement("label");
	divCurso.appendChild(labelCurso);
	labelCurso.setAttribute("for", "curso"+i);
	labelCurso.innerHTML="Curso";
	let inputCurso = document.createElement("input");
	divCurso.appendChild(inputCurso);
	inputCurso.setAttribute("type", "text");
	inputCurso.setAttribute("class", "form-control shadow letras");
	inputCurso.setAttribute("id", "curso"+i);
	inputCurso.setAttribute("placeholder", "EX.: Bacharel em Medicina");

	let divFaculdade = document.createElement("div");
	container.appendChild(divFaculdade);
	divFaculdade.setAttribute("class", "form-group");
	let labelFaculdade = document.createElement("label");
	divFaculdade.appendChild(labelFaculdade);
	labelFaculdade.setAttribute("for", "faculdade"+i);
	labelFaculdade.innerHTML="Faculdade";
	let inputFaculdade = document.createElement("input");
	divFaculdade.appendChild(inputFaculdade);
	inputFaculdade.setAttribute("type", "text");
	inputFaculdade.setAttribute("class", "form-control shadow letras");
	inputFaculdade.setAttribute("id", "faculdade"+i);
	inputFaculdade.setAttribute("placeholder", "Ex.: Pontifícia Universidade Católica do Rio Grande do Sul(PUCRS)");

	let labelAnoIng = document.createElement("label");
	container.appendChild(labelAnoIng);
	labelAnoIng.innerHTML="Período";
	let divRow = document.createElement("div");
	container.appendChild(divRow);
	divRow.setAttribute("class", "row justify-content-between m-0 p-0 col-md-6");
	let divAnoIng = document.createElement("div");
	divRow.appendChild(divAnoIng);
	divAnoIng.setAttribute("class", "form-group col-5 col-md pl-0");
	let inputAnoIng = document.createElement("input");
	divAnoIng.appendChild(inputAnoIng);
	inputAnoIng.setAttribute("type", "number");
	let ano = new Date().getFullYear();
	inputAnoIng.setAttribute("min", ano-70);
	inputAnoIng.setAttribute("max", ano);
	inputAnoIng.setAttribute("step", "1");
	inputAnoIng.setAttribute("class", "form-control shadow numeros");
	inputAnoIng.setAttribute("id", "anoIng"+i);
	inputAnoIng.setAttribute("placeholder", "Ex.: 2013");

	let divAte = document.createElement("div");
	divRow.appendChild(divAte);
	divAte.setAttribute("class", "mt-2");
	let labelAte = document.createElement("label");
	divAte.appendChild(labelAte);
	labelAte.setAttribute("class", "col-md-0");
	labelAte.innerHTML="até";

	let divAnoConc = document.createElement("div");
	divRow.appendChild(divAnoConc);
	divAnoConc.setAttribute("class", "form-group col-5 col-md pr-0");
	let inputAnoConc = document.createElement("input");
	divAnoConc.appendChild(inputAnoConc);
	inputAnoConc.setAttribute("type", "number");
	inputAnoConc.setAttribute("min", ano-70);
	inputAnoConc.setAttribute("max", ano);
	inputAnoConc.setAttribute("step", "1");
	inputAnoConc.setAttribute("class", "form-control shadow numeros");
	inputAnoConc.setAttribute("id", "anoConc"+i);
	inputAnoConc.setAttribute("placeholder", "Ex.: 2018");

	container.appendChild(hr);

}
//Cria os elementos html em tempo de execução
function addEmpresa(i){
	let container = document.querySelector("#containerExperiencias");
	let hr = document.createElement("hr");
	container.appendChild(hr);
	let divEmpresa = document.createElement("div");
	container.appendChild(divEmpresa);
	divEmpresa.setAttribute("class", "form-group");
	let labelEmpresa = document.createElement("label");
	divEmpresa.appendChild(labelEmpresa);
	labelEmpresa.setAttribute("for", "empresa"+i);
	labelEmpresa.innerHTML="Empresa";
	let inputEmpresa = document.createElement("input");
	divEmpresa.appendChild(inputEmpresa);
	inputEmpresa.setAttribute("type", "text");
	inputEmpresa.setAttribute("class", "form-control shadow letras");
	inputEmpresa.setAttribute("id", "empresa"+i);
	inputEmpresa.setAttribute("placeholder", "EX.: Hospital São Francisco");

	let divCargo = document.createElement("div");
	container.appendChild(divCargo);
	divCargo.setAttribute("class", "form-group p-0");
	let labelCargo = document.createElement("label");
	divCargo.appendChild(labelCargo);
	labelCargo.setAttribute("for", "cargo"+i);
	labelCargo.innerHTML="Cargo";
	let inputCargo = document.createElement("input");
	divCargo.appendChild(inputCargo);
	inputCargo.setAttribute("type", "text");
	inputCargo.setAttribute("class", "form-control shadow letras");
	inputCargo.setAttribute("id", "cargo"+i);
	inputCargo.setAttribute("placeholder", "Ex.: Médico Clínico Geral");

	let labelAnoAdm = document.createElement("label");
	container.appendChild(labelAnoAdm);
	labelAnoAdm.innerHTML="Período";
	let divRow = document.createElement("div");
	container.appendChild(divRow);
	divRow.setAttribute("class", "row justify-content-between m-0 p-0 col-md-6");
	let divAnoAdm = document.createElement("div");
	divRow.appendChild(divAnoAdm);
	divAnoAdm.setAttribute("class", "form-group col-5 col-md pl-0");
	let inputAnoAdm = document.createElement("input");
	divAnoAdm.appendChild(inputAnoAdm);
	inputAnoAdm.setAttribute("type", "number");
	let ano = new Date().getFullYear();
	inputAnoAdm.setAttribute("min", ano-70);
	inputAnoAdm.setAttribute("max", ano);
	inputAnoAdm.setAttribute("step", "1");
	inputAnoAdm.setAttribute("class", "form-control shadow numeros");
	inputAnoAdm.setAttribute("id", "anoAdm"+i);
	inputAnoAdm.setAttribute("placeholder", "Ex.: 2013");

	let divAte = document.createElement("div");
	divRow.appendChild(divAte);
	divAte.setAttribute("class", "mt-2");
	let labelAte = document.createElement("label");
	divAte.appendChild(labelAte);
	labelAte.setAttribute("class", "col-md-0");
	labelAte.innerHTML="até";

	let divAnoDem = document.createElement("div");
	divRow.appendChild(divAnoDem);
	divAnoDem.setAttribute("class", "form-group col-5 col-md pr-0");
	let inputAnoDem = document.createElement("input");
	divAnoDem.appendChild(inputAnoDem);
	inputAnoDem.setAttribute("type", "number");
	inputAnoDem.setAttribute("min", ano-70);
	inputAnoDem.setAttribute("max", ano);
	inputAnoDem.setAttribute("step", "1");
	inputAnoDem.setAttribute("class", "form-control shadow numeros");
	inputAnoDem.setAttribute("id", "anoDem"+i);
	inputAnoDem.setAttribute("placeholder", "Ex.: 2018");

	container.appendChild(hr);
}
//Cria os elementos html em tempo de execução
function addHabilidade(rowHabilidades, divHabilidade, cont){
	rowHabilidades.appendChild(divHabilidade);
	divHabilidade.setAttribute("class", "form-group col-md-7 col-lg-9");
	let hr = document.createElement("hr");
	divHabilidade.appendChild(hr);
	hr.setAttribute("class", "d-md-none mt-0")
	let inputHabilidade = document.createElement("input");
	divHabilidade.appendChild(inputHabilidade);
	inputHabilidade.setAttribute("class", "form-control shadow mb-0");
	inputHabilidade.setAttribute("id", "habilidade"+cont);

	let divStars = document.createElement("div");
	rowHabilidades.appendChild(divStars);
	divStars.setAttribute("class", "rating pt-0 mt-0 ml-3 ml-md-0");
	for(i=5; i>0; i--){
		let input = document.createElement("input");
		divStars.appendChild(input);
		input.setAttribute("type", "radio");
		input.setAttribute("name", cont+"rating");
		input.setAttribute("value", i);
		input.setAttribute("id", cont+"star"+i)
		let label = document.createElement("label");
		divStars.appendChild(label);
		label.setAttribute("for", cont+"star"+i);
		label.innerHTML="☆";
	}
}

function mostrar(){
	mostrarImagem($("#nomeCompleto").val(), $("#profissao").val(), $("#crm").val(), $("#uf").val(),$("#crq").val(), false);
}

//Função para fazer a comunicação entre os arquivos
let mostrando=false;
let temImagem = false;
function mostrarImagem(nome, profissao, crm, uf, crq, escondido){
	if(temImagem && !escondido){
		$("#divImg").show();
		return;
	}
	if(!mostrando){
		let base = localStorage.baseImg;
		let divImg = document.querySelector("#divImg");
		divImg.style.position="relative";
		divImg.style.background="white";
		divImg.style.border="1px solid white";
		let img = document.createElement("img");
		divImg.appendChild(img);
		img.setAttribute("class", "ml-0 pl-0 mt-3 mb-3 col-12");
		img.setAttribute("id", "imgAssinatura");
		img.setAttribute("src", base);

		let pNome = document.createElement("p");		
		divImg.appendChild(pNome);
		let bNome = document.createElement("b");
		pNome.appendChild(bNome);
		bNome.innerHTML=nome.toUpperCase();
		let pProfissao = document.createElement("p");
		divImg.appendChild(pProfissao);
		pProfissao.innerHTML=capitaliza(profissao).italics();
		let pCrm = document.createElement("p");
		divImg.appendChild(pCrm);
		pCrm.setAttribute("class", "pb-3")
		bCrm = "CRM: ";
		if(!crq)
			crq="";
		else{
			bCrq = " CRQ: ".bold();
			crq = bCrq+crq;
		}
		pCrm.innerHTML= bCrm.bold() + crm + " / " + uf + crq;
		
		mostrando=true;
		temImagem=true;
	}		
}

function esconderAssinatura(){
	mostrando=false;
}

function mostrarBtnAssinatura(){
	$("#btnAssinatura").fadeIn();
}

//Validações
function validaNomes(nome){
    return !nome.match(/[^A-Za-zÄ-ÿ ']/g)
}
function validaEmail(email) {
    usuario = email.substring(0, email.indexOf("@"));
    dominio = email.substring(email.indexOf("@")+ 1, email.length);
    return  !!((usuario.length >=1) &&
            (dominio.length >=3) &&
            (usuario.search("@")==-1) &&
            (dominio.search("@")==-1) &&
            (usuario.search(" ")==-1) &&
            (dominio.search(" ")==-1) &&
            (dominio.search(".")!=-1) &&
            (dominio.indexOf(".") >=1)&&
            (dominio.lastIndexOf(".") < dominio.length - 1));
}
function validaCRM(crm){
    return !!crm.match(/^[0-9]+$/);
}

function validaUF(uf){
    return !!uf.match(/^[A-Za-z]+$/);
}

function validaDatas(data){
    let ano = new Date().getFullYear();
    return !!(data.match(/^[0-9]+$/)&&data>(ano-70)&&data<=ano);
}
//Valida o caracter digitado        
$('.letras').keypress(function (e) {
	var regex = new RegExp("^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ \b\s]+$");
	var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
	if (regex.test(str)) {
		return true;
	}
	e.preventDefault();
	alert("Insira apenas letras");
	return false;
});
$('.numeros').keypress(function (e) {
	let regex = new RegExp("^[0-9 \b]+$");
	let str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
	if (regex.test(str)) {
		return true;
	}
	e.preventDefault();
	alert("Insira apenas números");
	return false;
});
$('.uf').keypress(function (e) {
	let regex = new RegExp("^[A-Za-z\b]+$");
	let str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
	if (regex.test(str)) {
		return true;
	}
	e.preventDefault();
	alert("Insira apenas letras");
	return false;
});

let i=0;
function pisca(elemento){
    document.querySelector(elemento).style.border="none";
    if(i<2){
        temp1 = setTimeout(function(){
            document.querySelector(elemento).style.border="2px dashed red";
            temp2 = setTimeout(()=>pisca(elemento), 300);
            i++;
        }, 300);
    }
}

function capitaliza(palavras){
	palavras = palavras.toLowerCase();
	const words = palavras.split(" ");
	for (let i = 0; i < words.length; i++) {
		words[i] = words[i][0].toUpperCase() + words[i].substr(1);
	}
	palavras = words.join(" ");
	
	return palavras;
}