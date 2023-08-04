<?php
@include "conectdb.php";

$avaliador = $_POST['id'];

//nao pode ser avaliacao deve ser outra tabela sinalizando o idpromp (atribuicao)
$query = "SELECT * FROM atribuicao WHERE avaliador_id = '$avaliador' ";
$result = $mysqli->query($query);
$array = [];
while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
    $array[] = $row["prompts_id"];
}

echo json_encode($array);
