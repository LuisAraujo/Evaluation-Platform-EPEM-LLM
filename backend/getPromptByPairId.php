<?php
@include "conectdb.php";
$id = $_POST["id"];

$query = "SELECT aval1, aval2 FROM dupla WHERE id = $id";
$result = $mysqli->query($query);
$row = $result->fetch_array(MYSQLI_ASSOC);

$query2 = "SELECT * FROM avaliacao WHERE avaliador_id = '".$row['aval1']."' OR avaliador_id = '".$row['aval2']."' ORDER BY prompt_id, questoes_id, avaliador_id";

$result2 = $mysqli->query($query2);
$array = [];

while ($row2 = $result2->fetch_array(MYSQLI_ASSOC)) {
    $array[] = $row2;
}

echo  json_encode($array, JSON_UNESCAPED_UNICODE);
