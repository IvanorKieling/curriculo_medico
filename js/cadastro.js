
(function() {
    //Velocidade da transição dos formulários
    var speed = 350;
    $(document).ready(function(){
        
        localStorage.clear();

        //Contador de caracteres dos textareas
        document.querySelector("#objetivo").addEventListener("input", () => counter("#objetivo", "#count1"));
        document.querySelector("#complemento").addEventListener("input", () => counter("#complemento", "#count2"));
        document.querySelector("#atividades").addEventListener("input", () => counter("#atividades", "#count3"));        

        function counter(elemento, contador) {
            let digitados = document.querySelector(elemento).value.length;
            let caracteres = document.querySelector(contador);
            let temp = 500 - digitados;
            if (temp < 100) {
                caracteres.innerHTML = "0" + temp;
                caracteres.style.color = "red";
            }
            if (temp < 10) caracteres.innerHTML = "00" + temp;
            if (temp >= 100) {
                caracteres.innerHTML = temp;
                caracteres.style.color = "black";
            }
        }
        //Assinatura
        $("#nomeCompleto").bind("input", testaCampos);
        $("#profissao").bind("input", testaCampos);
        $("#crm").bind("input", testaCampos);
        $("#uf").bind("input", testaCampos);

        $("#email").bind("input", testaCampos);
        $("#objetivo").bind("input", testaCampos);

        function testaCampos(){
            if($("#nomeCompleto").val()!="" && $("#profissao").val()!="" && $("#crm").val()!="" && $("#uf").val()!="")
                mostrarBtnAssinatura();
            if(localStorage.baseImg)
                mostrarImagem($("#nomeCompleto").val(), $("#profissao").val(), $("#crm").val(), $("#uf").val(),$("#crq").val(), false);
        }

        let btnAssinatura = document.querySelector("#btnAssinatura");
        
        btnAssinatura.addEventListener("click", function(){
            
            if($("#nomeCompleto").val()!="" && $("#profissao").val()!="" && $("#crm").val()!="" && $("#uf").val()!=""){
                let varWindow = window.open (   'assinatura.html',
                                        'popup', 
                                        'width=450, height=350, scrollsbar=no');
                
                
            }else{
                alert("Preencha todos os campos (nome, profissão, CRM, UF) e clique novamente em Assinatura.");
            }
            
        })
     
        //Dados Pessoais
        const pessoa = new Object();
        $(".formDadosPessoais").submit(function(event){
            event.preventDefault();
            
            let tudo_ok = true;        
            pessoa.nome = capitaliza(document.querySelector("#nomeCompleto").value);
            pessoa.profissao = capitaliza(document.querySelector("#profissao").value);
            pessoa.email = document.querySelector("#email").value;
            pessoa.crm = document.querySelector("#crm").value;
            pessoa.uf = document.querySelector("#uf").value;
            pessoa.crq = document.querySelector("#crq").value;
            pessoa.objetivo = btoa(document.querySelector("#objetivo").value);
            
            doCapture(pessoa.crm, pessoa.uf);
            pessoa.img = pessoa.crm+pessoa.uf+".png";
            pessoa.img = btoa(pessoa.img);
            
            if(validaNomes(pessoa.nome)){
                pessoa.nome = btoa(pessoa.nome);
                document.querySelector("#nomeCompleto").style.border="none";
            }else{
                tudo_ok = false;
                pisca("#nomeCompleto");
            }

            if(validaNomes(pessoa.profissao)){                
                pessoa.profissao = btoa(pessoa.profissao);
                document.querySelector("#profissao").style.border="none";
            }else{
                tudo_ok = false;                
                pisca("#profissao");                
            }

            if(validaEmail(pessoa.email)){
                pessoa.email = btoa(pessoa.email);
                document.querySelector("#email").style.border="none"; 
            }else{
                tudo_ok = false;
                pisca("#email");
            }

            if(validaCRM(pessoa.crm)){
                pessoa.crm = btoa(pessoa.crm);
                document.querySelector("#crm").style.border="none"; 
            }else{
                tudo_ok = false;
                pisca("#crm");
            }

            if(validaUF(pessoa.uf)){
                pessoa.uf = btoa(pessoa.uf);
                document.querySelector("#uf").style.border="none"; 
            }else{
                tudo_ok = false;
                pisca("#uf");
            }
            if(validaCRM(pessoa.crq)){
                pessoa.crq = btoa(pessoa.crq);
                document.querySelector("#crq").style.border="none"; 
            }else{
                tudo_ok = false;
                pisca("#crq");
            }

           
            if(tudo_ok){
                $(".dadosPessoais").fadeOut(speed);
                setTimeout(function(){
                    $(".formacaoAcademica").fadeIn(speed)
                }, speed);
            }
        });

        //Botão voltar Dados Pessoais
        $("#voltaDadosPessoais").click(function(){
            $(".formacaoAcademica").fadeOut(speed);
            setTimeout(function(){
                $(".dadosPessoais").fadeIn(speed)
            }, speed);
        })
        


        //Formação Acadêmica
        let quantCursos = 0;

        $("#addCurso").click(function(){
            addCurso(++quantCursos);
        });
        
        $(".formFormacaoAcademica").submit(function(event){
            event.preventDefault();
            const cursos= new Array();
            let = tudo_ok = true;            
            
            for(let i=0; i<=quantCursos; i++){
                if(document.querySelector("#curso"+i).value == "")
                    continue;
                
                const formacao = new Object();

                formacao.curso = capitaliza(document.querySelector("#curso"+i).value);
                formacao.faculdade = (document.querySelector("#faculdade"+i).value);
                formacao.anoIng = document.querySelector("#anoIng"+i).value;
                formacao.anoConc = document.querySelector("#anoConc"+i).value;
                
                if(validaNomes(formacao.curso)){
                    formacao.curso = btoa(formacao.curso);
                    document.querySelector("#curso"+i).style.border="none";
                }else{
                    tudo_ok = false;
                    console.log("nome do curso incorreto.")
                    pisca("#curso"+i);
                }

                if(validaNomes(formacao.faculdade)){
                    formacao.faculdade = btoa(formacao.faculdade);
                    document.querySelector("#faculdade"+i).style.border="none";
                }else{
                    tudo_ok = false;
                    console.log("Nome da universidade incorreto.")
                    pisca("#faculdade"+i);
                }

                if(validaDatas(formacao.anoIng)){
                    formacao.anoIng = btoa(formacao.anoIng);
                    document.querySelector("#anoIng"+i).style.border="none";
                }else{
                    tudo_ok = false;
                    console.log("Ano de ingresso incorreto.")
                    pisca("#anoIng"+i);
                }

                if(validaDatas(formacao.anoConc)){
                    formacao.anoConc = btoa(formacao.anoConc);
                    document.querySelector("#anoConc"+i).style.border="none";
                }else{
                    tudo_ok = false;
                    console.log("Ano de conclusão incorreto.")
                    pisca("#anoConc"+i);
                }            

                if(tudo_ok){                
                    cursos.push(formacao);
                    
                }else{
                    console.log("Dados incorretos");
                }
            }          
                
            pessoa.cursos=cursos;

            pessoa.complemento = btoa(document.querySelector("#complemento").value);
         
            $(".formacaoAcademica").fadeOut(speed);
            setTimeout(function(){
                $(".experienciasProfissionais").fadeIn(speed)
            }, speed);
        });

        //Botão voltar Formação Acadêmica
        $("#voltaFormacaoAcademica").click(function(){
            $(".experienciasProfissionais").fadeOut(speed);
            setTimeout(function(){
                $(".formacaoAcademica").fadeIn(speed)
            }, speed);
        })

        //Experiências Profissionais
        let quantEmpresas = 0;
        $("#addEmpresa").click(function(){
            addEmpresa(++quantEmpresas);
        });

        
        $(".formExperienciasProfissionais").submit(function(event){
            event.preventDefault();
            const experiencia = new Array();
            let tudo_ok = true;

            for(let i=0; i<=quantEmpresas; i++){
                
                if(document.querySelector("#empresa"+i).value == "")
                    continue;
                
                const empresa = new Object();

                empresa.empresa = capitaliza(document.querySelector("#empresa"+i).value);
                empresa.cargo = capitaliza(document.querySelector("#cargo"+i).value);
                empresa.anoAdm = document.querySelector("#anoAdm"+i).value;
                empresa.anoDem = document.querySelector("#anoDem"+i).value;
    
                if(validaNomes(empresa.empresa)){
                    empresa.empresa = btoa(empresa.empresa);
                    document.querySelector("#empresa"+i).style.border="none";
                }else{
                    tudo_ok = false;
                    console.log("Nome da empresa incorreto.")
                    pisca("#empresa"+i);
                }
    
                if(validaNomes(empresa.cargo)){
                    empresa.cargo = btoa(empresa.cargo);
                    document.querySelector("#cargo"+i).style.border="none";
                }else{
                    tudo_ok = false;
                    console.log("Nome do cargo incorreto.")
                    pisca("#cargo"+i);
                }
    
                if(validaDatas(empresa.anoAdm)){
                    empresa.anoAdm = btoa(empresa.anoAdm);
                    document.querySelector("#anoAdm"+i).style.border="none";
                }else{
                    tudo_ok = false;
                    console.log("Ano de admissão incorreto.")
                    pisca("#anoAdm"+i);
                }
    
                if(validaDatas(empresa.anoDem)){
                    empresa.anoDem = btoa(empresa.anoDem);
                    document.querySelector("#anoDem"+i).style.border="none";
                }else{
                    tudo_ok = false;
                    console.log("Ano de demissão incorreto.")
                    pisca("#anoDem"+i);
                }
                if(tudo_ok){
                                    
                    experiencia.push(empresa);
                }else{
                    console.log("Dados incorretos");
                }
            }
            pessoa.experiencia = experiencia;

            $(".experienciasProfissionais").fadeOut(speed);
            setTimeout(function(){
                $(".atividadesComplementares").fadeIn(speed)
            }, speed);
           
        });

        //Botão voltar Experiências Profissionais
        $("#voltaExperienciasProfissionais").click(function(){
            $(".atividadesComplementares").fadeOut(speed);
            setTimeout(function(){
                $(".experienciasProfissionais").fadeIn(speed)
            }, speed);
        })
        
        //Atividades Complementares
        let quantHabilidades=0;
        $("#addSkill").click(function(){
            let rowHabilidades = document.querySelector("#rowHabilidades");
            let divHabilidade = document.createElement("div");
            addHabilidade(rowHabilidades, divHabilidade, ++quantHabilidades);
            
        });
        $(".formAtividadesComplementares").submit(function(event){
            event.preventDefault();
            pessoa.habilidades = [];
            
            if(document.querySelector("#habilidade0").value!==""){
                let cont=0, stars;     
                while(cont<=quantHabilidades){
                    let habilidades = {};
                    habilidades.habilidade = btoa(capitaliza(document.querySelector("#habilidade"+cont).value));
                    stars = document.getElementsByName(cont+'rating');

                    for (let i = 0; i < 5; i++) {
                        if (stars[i].checked) {
                            habilidades.estrelas = stars[i].value;
                            pessoa.habilidades.push(habilidades);
                        break;
                        }
                    }
                    
                    cont++;
                };
                
            }

            pessoa.atividades = btoa(document.querySelector("#atividades").value);
            pessoa.action = "post";
            
            const apiUrl = "http://localhost/web/curriculo/php/post.php";
            storage(pessoa.crm, pessoa.uf);
            postAPI(pessoa, apiUrl);

        });
    });
})();