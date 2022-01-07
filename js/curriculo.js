//Objeto que será enviado para a API
let jsonObj = {};
jsonObj.action = "get";

if(localStorage.getItem("crm"))
    jsonObj.crm = localStorage.getItem("crm");    
    
if(localStorage.getItem("uf"))
    jsonObj.uf = localStorage.getItem("uf");
/*     jsonObj.crm = btoa("33009");
    jsonObj.uf = btoa('DF'); */
const apiUrl = "http://localhost/web/curriculo/php/post.php";

//Chamada para a requisição dos dados do usuário

let promise = getAPI(jsonObj, apiUrl);

obj={};
//Função 'then' que aguarda o status 'resolve' da promise
promise.then(dados => {
    obj=dados;
    
    //Convertendo de json para objeto js
    let experiencia = JSON.parse(obj[0].experiencia);
    let cursos = JSON.parse(obj[0].cursos);
    let habilidades = JSON.parse(obj[0].habilidades);


    document.querySelector("#cNome").innerHTML = obj[0].nome;
    document.querySelector("#cProfissao").innerHTML = obj[0].profissao;
    document.querySelector("#cObjetivo").innerHTML = obj[0].objetivo;
    document.querySelector("#cEmail").innerHTML = obj[0].email;
    document.querySelector("#cCrm").innerHTML = obj[0].crm;
    document.querySelector("#cUf").innerHTML = obj[0].uf;
    document.querySelector("#cCrq").innerHTML = obj[0].crq;

    let expContainer = document.querySelector("#expContainer");

    //Criando os elementos html em tempo de execução
    if(experiencia)
        for(i=0; i<experiencia.length; i++){
            let divRow = document.createElement("div");
            divRow.setAttribute("class", "d-flex flex-row");
            expContainer.appendChild(divRow);
            let divDatas = document.createElement("div");
            divDatas.setAttribute("class", "datas col-3 float-left");
            divRow.appendChild(divDatas);
            let spanAnoAdm = document.createElement("span");
            spanAnoAdm.setAttribute("id", "anoAdm"+i);
            divDatas.appendChild(spanAnoAdm);
            let text = document.createTextNode(' à ');
            divDatas.appendChild(text);
            let spanAnoDem = document.createElement("span");
            spanAnoDem.setAttribute("id", "anoDem"+i);
            divDatas.appendChild(spanAnoDem);
            document.querySelector("#anoAdm"+i).innerHTML = experiencia[i]['anoAdm'];
            document.querySelector("#anoDem"+i).innerHTML = experiencia[i]['anoDem'];
            
            var divEmpresa = document.createElement("div");
            divEmpresa.setAttribute("class", "col-9 float-right");
            divRow.appendChild(divEmpresa);
            let h6Cargo = document.createElement("h6");
            divEmpresa.appendChild(h6Cargo);
            h6Cargo.setAttribute("class", "font-weight-bold");
            h6Cargo.setAttribute("id", "cargo"+i);
            document.querySelector("#cargo"+i).innerHTML = experiencia[i]['cargo'];
            

            let pEmpresa = document.createElement("p");
            divEmpresa.appendChild(pEmpresa);
            pEmpresa.setAttribute("id", "empresa"+i);
            pEmpresa.setAttribute("class", "mb-4");
            document.querySelector("#empresa"+i).innerHTML = experiencia[i]['empresa'];
            
            
        }

    let forAcaContainer = document.querySelector("#forAcaContainer");
    
    if(cursos)
        for(i=0; i<cursos.length; i++){
            let divRow = document.createElement("div");
            divRow.setAttribute("class", "d-flex flex-row");
            forAcaContainer.appendChild(divRow);
            let divDatas = document.createElement("div");
            divDatas.setAttribute("class", "datas col-3 float-left");
            divRow.appendChild(divDatas);
            let spanAnoIng = document.createElement("span");
            spanAnoIng.setAttribute("id", "anoIng"+i);
            divDatas.appendChild(spanAnoIng);
            let text = document.createTextNode(' à ');
            divDatas.appendChild(text);
            let spanAnoConc = document.createElement("span");
            spanAnoConc.setAttribute("id", "anoConc"+i);
            divDatas.appendChild(spanAnoConc);
            document.querySelector("#anoIng"+i).innerHTML = cursos[i]['anoIng'];
            document.querySelector("#anoConc"+i).innerHTML = cursos[i]['anoConc'];
            
            var divFaculdade = document.createElement("div");
            divFaculdade.setAttribute("class", "col-9 float-right");
            divRow.appendChild(divFaculdade);
            let h6Curso = document.createElement("h6");
            divFaculdade.appendChild(h6Curso);
            h6Curso.setAttribute("class", "font-weight-bold");
            h6Curso.setAttribute("id", "curso"+i);
            document.querySelector("#curso"+i).innerHTML = cursos[i]['curso'];
            

            let p = document.createElement("p");
            divFaculdade.appendChild(p);
            let iFaculdade = document.createElement("i");
            p.appendChild(iFaculdade);
            iFaculdade.setAttribute("id", "faculdade"+i);
            p.setAttribute("class", "mb-4");
            document.querySelector("#faculdade"+i).innerHTML = cursos[i]['faculdade'];
            
            
        }

    if(obj[0].atividades){
        let ulAtividades = document.createElement("ul");
        divEmpresa.appendChild(ulAtividades);
        let liAtividades = document.createElement("li");
        ulAtividades.appendChild(liAtividades);
        liAtividades.setAttribute("id", "atividade");
        document.querySelector("#atividade").innerHTML = obj[0].atividades;
    }

    if(habilidades){
        for(i=0; i<habilidades.length; i++){
            document.querySelector("#h5Habilidades").setAttribute("class", "d-block font-weight-bold mt-0 pt-4");
            let aside = document.querySelector("aside");
            let divHabilidade = document.createElement("div");
            aside.appendChild(divHabilidade);
            let pHabilidade = document.createElement("p");
            divHabilidade.appendChild(pHabilidade);
            pHabilidade.setAttribute("class", "mb-0");
            pHabilidade.innerHTML=habilidades[i].habilidade;

            let spanStars = document.createElement("span");
            divHabilidade.appendChild(spanStars);
            switch(habilidades[i].estrelas){
                case '1': spanStars.innerHTML="&starf;&#9734;&#9734;&#9734;&#9734;";
                    break;
                case '2': spanStars.innerHTML="&starf;&starf;&#9734;&#9734;&#9734;";
                    break;
                case '3': spanStars.innerHTML="&starf;&starf;&starf;&#9734;&#9734;";
                    break;
                case '4': spanStars.innerHTML="&starf;&starf;&starf;&starf;&#9734;";
                    break;
                case '5': spanStars.innerHTML="&starf;&starf;&starf;&starf;&starf;";         
            }
            let hr = document.createElement("hr");
            divHabilidade.appendChild(hr);
        }
    }


    document.querySelector("#cComplemento").innerHTML = obj[0].complemento;

    if(obj[0].img){
        let divAssinatura = document.querySelector("#divAssinatura");
        let imgAssinatura = document.createElement("img");
        divAssinatura.appendChild(imgAssinatura);
        imgAssinatura.setAttribute("src", "./img/"+obj[0].img);
    }
})