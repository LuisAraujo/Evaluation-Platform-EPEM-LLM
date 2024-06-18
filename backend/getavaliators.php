<?php
@include "conectdb.php";

$query = "SELECT id as ref, nome as name, token, declinou FROM avaliador WHERE 1 ORDER BY nome";
$result = $mysqli->query($query);
$array =[];
while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
    $array[] = $row;
}

echo  json_encode($array, JSON_UNESCAPED_UNICODE);
