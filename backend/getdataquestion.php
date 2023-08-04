<?php
/*obter alternativas já marcadas*/
@include "conectdb.php";

$avaliador = $_POST['avaliador'];
$prompt = $_POST['prompt'];

$query = "SELECT * FROM avaliacao WHERE avaliador_id = '$avaliador' AND prompt_id = '$prompt'";
$result = $mysqli->query($query);
$array =[];
while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
    $array[] = $row;
}

echo  json_encode($array, JSON_UNESCAPED_UNICODE);
