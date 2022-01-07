<?php
include 'connect.php';
error_reporting(E_STRICT);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: X-Requested-With,content-type');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

/* $post   = file_get_contents('php://input');

$objJ   = json_decode($post,true); */

//$objJ = json_decode('{"nome":"Sm/jbyBEYSBTaWx2YQ==","profissao":"Q2lydXJnaeNvIFBs4XN0aWNv","email":"am9hb3NpbHZhQGdtYWlsLmNvbQ==","crm":"MjM0NTY=","uf":"QU0=","crq":"MjMxNDM=","objetivo":"Q29tIGFzIGV4cGVyaepuY2lhcyBhZHF1aXJpZGFzIGFvIGxvbmdvIGRvcyBtZXVzIGVzdOFnaW9zLCBwcm9jdXJvIGFnb3JhIHVtYSBjaGFuY2UgZGUgZWZldGl2YefjbyBuYSBtaW5oYSDhcmVhIGRlIGNvbmhlY2ltZW50by4=","img":"MjM0NTZBTS5wbmc=","cursos":[{"curso":"QmFjaGFyZWwgRW0gTWVkaWNpbmE=","faculdade":"UG9udGlm7WNpYSBVbml2ZXJzaWRhZGUgQ2F082xpY2EgZG8gUmlvIEdyYW5kZSBkbyBTdWw=","anoIng":"MTk5NA==","anoConc":"MTk5OA=="},{"curso":"QmFjaGFyZWwgRW0gT2RvbnRvbG9naWE=","faculdade":"VWxicmEgUlM=","anoIng":"MTk5OQ==","anoConc":"MjAwMw=="}],"complemento":"VOljbmljbyBlbSBFbmZlcm1hZ2VtIHBlbG8gaW5zdGl0dXRvIGZlZGVyYWwgTW9udGVpcm8gTG9iYXRvIGVtIDIwMDMu","experiencia":[{"empresa":"SG9zcGl0YWwgTm9zc2EgU2VuaG9yYSBEYXMgR3Jh52Fz","cargo":"Q2ztbmljbyBHZXJhbA==","anoAdm":"MjAwMQ==","anoDem":"MjAwNA=="},{"empresa":"SG9zcGl0YWwgQ29uY2Vp5+Nv","cargo":"Q2lydXJnaeNv","anoAdm":"MjAwNQ==","anoDem":"MjAwOQ=="}],"habilidades":[{"habilidade":"Q2lydXJnaWEgUGzhc3RpY2E=","estrelas":"5"},{"habilidade":"TWVkaWNpbmEgVmV0ZXJpbuFyaWE=","estrelas":"5"},{"habilidade":"Q2F0ZXRlcmlzbW8=","estrelas":"5"}],"atividades":"TelkaWNvIHZvbHVudOFyaW8gZW0gaG9zcGl0YWwgZGUgY2FtcGFuYSBuYXMgb2ztbXBpYWRhcyBkZSAyMDE0IG5vIFJpbyBkZSBKYW5laXJvLg==","action":"post"}', true);

$objJ = json_decode('{"action": "get", "crm": "MzMwMDk=", "uf": "REY="}', true);

if($objJ['action']=='post'){
    $pessoa=[];
    for($i=0; $i<sizeof($objJ['cursos']); $i++){
        $pessoa['cursos'][$i]['faculdade'] = utf8_encode(base64_decode($objJ['cursos'][$i]['faculdade']));
        $pessoa['cursos'][$i]['curso'] = utf8_encode(base64_decode($objJ['cursos'][$i]['curso']));
        $pessoa['cursos'][$i]['anoIng'] = utf8_encode(base64_decode($objJ['cursos'][$i]['anoIng']));
        $pessoa['cursos'][$i]['anoConc'] = utf8_encode(base64_decode($objJ['cursos'][$i]['anoConc']));
    }

 
    for($i=0; $i<sizeof($objJ['experiencia']); $i++){
        $pessoa['experiencia'][$i]['empresa'] = utf8_encode(base64_decode($objJ['experiencia'][$i]['empresa']));
        $pessoa['experiencia'][$i]['cargo'] = utf8_encode(base64_decode($objJ['experiencia'][$i]['cargo']));
        $pessoa['experiencia'][$i]['anoAdm'] = utf8_encode(base64_decode($objJ['experiencia'][$i]['anoAdm']));
        $pessoa['experiencia'][$i]['anoDem'] = utf8_encode(base64_decode($objJ['experiencia'][$i]['anoDem']));
    }


    for($i=0; $i<sizeof($objJ['habilidades']); $i++){
        $pessoa['habilidades'][$i]['habilidade'] = utf8_encode(base64_decode($objJ['habilidades'][$i]['habilidade']));
        $pessoa['habilidades'][$i]['estrelas'] = $objJ['habilidades'][$i]['estrelas'];
    }
 
    $obj2 = new stdclass;

    $usuario = "admin";//utf8_encode(base64_decode($objJ['usuario']));
    $senha = "123";//utf8_encode(base64_decode($objJ['senha']));
    $nome = base64_decode($objJ['nome']);
    $email = base64_decode($objJ['email']);
    $crm = base64_decode($objJ['crm']);
    $crq = base64_decode($objJ['crq']);
    $uf = base64_decode($objJ['uf']);
    $profissao = base64_decode($objJ['profissao']);
    $objetivo = base64_decode($objJ['objetivo']);
    $cursos = json_encode($pessoa['cursos']);
    $complemento = base64_decode($objJ['complemento']);
    $experiencia = json_encode($pessoa['experiencia']);
    $atividades = base64_decode($objJ['atividades']);
    $habilidades = json_encode($pessoa['habilidades']);
    $img_assinatura = base64_decode($objJ['img']);


    try{
        $sql = "UPDATE OR INSERT INTO MEDICO (USUARIO, SENHA, NOME, EMAIL, CRM, UF, CRQ, PROFISSAO, OBJETIVO, CURSOS_JSON, COMPLEMENTO, EXPERIENCIA_JSON, ATIVIDADES, HABILIDADES_JSON, IMG_ASSINATURA) values ('{$usuario}','{$senha}','{$nome}','{$email}','{$crm}','{$uf}','{$crq}','{$profissao}','{$objetivo}','{$cursos}','{$complemento}','{$experiencia}','{$atividades}','{$habilidades}', '{$img_assinatura}') MATCHING (crm, uf)";
        

        $result = odbc_exec($conn,$sql);
        
        if(!odbc_error($result)){
        
            $obj2->status = "OK";

        }else{
            $obj2->status = "NOT";
        }

    }
    catch (Exception $e)
    {
        $obj2->status = "NOT";
    }

    echo json_encode($obj2);
    odbc_close($conn);
    $conn = null;
}else if($objJ['action']=='get'){
    $crm = base64_decode($objJ['crm']);
    $uf = base64_decode($objJ['uf']);
    $list=[];
    try{
        $sql = "SELECT * FROM MEDICO WHERE CRM='$crm' AND UF='$uf';";
        $result = odbc_exec($conn,$sql);

        if(!odbc_error($result)){
            
            if ($result !== false && odbc_num_rows($result) > 0) { 

                while(odbc_fetch_row($result)){
            
                    
                    $list[]=array(
                        'nome' => utf8_encode(trim(odbc_result($result,"nome"))),
                        'email' => utf8_encode(trim(odbc_result($result,"email"))),
                        'crm' => utf8_encode(trim(odbc_result($result,"crm"))),                        
                        'uf' => utf8_encode(trim(odbc_result($result,"uf"))),
                        'crq' => utf8_encode(trim(odbc_result($result,"crq"))),
                        'profissao' => utf8_encode(trim(odbc_result($result,"profissao"))),
                        'objetivo' => utf8_encode(trim(odbc_result($result,"objetivo"))),
                        'cursos' => utf8_encode(trim(odbc_result($result,"cursos_json"))),
                        'complemento' => utf8_encode(trim(odbc_result($result,"complemento"))),
                        'experiencia' => utf8_encode(trim(odbc_result($result,"experiencia_json"))),
                        'atividades' => utf8_encode(trim(odbc_result($result,"atividades"))),
                        'habilidades' => utf8_encode(trim(odbc_result($result,"habilidades_json"))),
                        'img' => utf8_encode(trim(odbc_result($result,"img_assinatura")))
                    );
                    
    
                }
            }else{
                $obj2->status = "Erro";
            }

        }else{
            $obj2->status = "Erro";
        }

    }
    catch (Exception $e)
    {
        $obj2->status = "Erro";
    }
    echo json_encode($list);
    odbc_close($conn);
    $conn = null;
    
}


?>