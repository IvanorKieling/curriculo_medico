<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: X-Requested-With,content-type');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

$post   = file_get_contents('php://input');
$obj = json_decode($post,true);
$image = $obj["image"];
$image = explode(";", $image)[1];
$image = explode(",", $image)[1];
$image = str_replace(" ", "+", $image);

$image = base64_decode($image);
$crm=$obj['crm'];
$uf=$obj['uf'];

if(file_put_contents("../img/".$crm.$uf.".png", $image))
    $obj['status'] = "Ok";
else
    $obj['status'] = "Erro";

echo json_encode($obj);
;
