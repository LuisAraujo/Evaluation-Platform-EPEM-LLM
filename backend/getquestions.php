<?php
@include "conectdb.php";

$query = "SELECT * FROM questoes WHERE 1";
$result = $mysqli->query($query);
$array = [];
while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
  $array[] = $row;
}

echo  json_encode($array, JSON_UNESCAPED_UNICODE);
