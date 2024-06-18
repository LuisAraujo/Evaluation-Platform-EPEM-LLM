<?php
@include "conectdb.php";

$id = $_POST["id"];
$json = '{"id": "'.$id.'",';


$query = "SELECT token FROM avaliador WHERE id = ".$id;
$result = $mysqli->query($query);
$row = $result->fetch_array(MYSQLI_ASSOC);
$json .= '"token": "'.$row['token'].'",';
$json .= '"data": [';

$query = "SELECT * FROM atribuicao WHERE avaliador_id = $id ORDER BY prompts_id";
$result = $mysqli->query($query);
while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
    $query2 = "SELECT count(*) as avalied FROM avaliacao WHERE prompt_id = ".$row['prompts_id']." AND avaliador_id = ".$row['avaliador_id'];
    $result2 = $mysqli->query($query2);
    $row2 = $result2->fetch_array(MYSQLI_ASSOC);
    $actual = intval($row2['avalied']) > 0?1:0;
    $json .='{"prompt": "'.$row['prompts_id'].'", "atribuate": "'.$row['id'].'", "actual":"'.$actual.'"},';
}
$json = rtrim($json, ",");
$json .= ']}';


echo $json;

