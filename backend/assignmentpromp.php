<?php
@include "conectdb.php";

$idprompt = $_POST['idprompt'];
$idaval = $_POST['idaval'];

$query = "INSERT INTO atribuicao (id, prompts_id, avaliador_id, atual) VALUES (null, '$idprompt','$idaval','0')";
$result = $mysqli->query($query);
if($result) {
    echo "ok";
}else {
    echo "error";
}
