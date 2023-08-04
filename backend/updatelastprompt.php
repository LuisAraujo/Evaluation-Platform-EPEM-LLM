<?php
@include "conectdb.php";

$lastprompt = $_POST['lastprompt'];
$avaliador = $_POST['avaliator'];

$query = "UPDATE atribuicao SET atual = 0 WHERE atual = 1";
$result = $mysqli->query($query);
if($result) {
    $query = "UPDATE atribuicao SET atual = 1 WHERE prompts_id = '$lastprompt' AND avaliador_id = '$avaliador'";
    $result = $mysqli->query($query);
    if(!$result) {
        echo "error";
    }
}else {
    echo "error";
}
