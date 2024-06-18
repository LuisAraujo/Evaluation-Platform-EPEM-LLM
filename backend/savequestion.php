<?php
@include "conectdb.php";

$avaliador = $_POST['avaliador'];
$prompt = $_POST['prompt'];
$questao = $_POST['questao'];
$alternativa = $_POST['alternativa'];
$type = $_POST['type'];

$query = "SELECT * FROM avaliacao WHERE avaliador_id = '$avaliador' AND prompt_id = '$prompt' AND questoes_id = '$questao'";
$result = $mysqli->query($query);

if($result->num_rows == 0) {
    if($type == "closed")
        $query = "INSERT INTO avaliacao(id, avaliador_id, prompt_id, questoes_id, alternativas_id) VALUES(null, '$avaliador','$prompt', '$questao', '$alternativa')";
    else
        $query = "INSERT INTO avaliacao(id, avaliador_id, prompt_id, questoes_id, resposta_aberta) VALUES(null, '$avaliador','$prompt', '$questao', '$alternativa')";

    $result = $mysqli->query($query);
}else{
    if($type == "closed")
        $query = "UPDATE avaliacao SET alternativas_id = '$alternativa' WHERE avaliador_id = '$avaliador' AND prompt_id = '$prompt' AND questoes_id = '$questao'";
    else
        $query = "UPDATE avaliacao SET resposta_aberta = '$alternativa' WHERE avaliador_id = '$avaliador' AND prompt_id = '$prompt' AND questoes_id = '$questao'";
    $result = $mysqli->query($query);
}

if($result)
    echo "ok";
else
    echo "erro" ;
