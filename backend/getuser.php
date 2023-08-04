<?php
@include "conectdb.php";

$iduser = $_POST["id"];
$token = $_POST["token"];

$query = "SELECT * FROM avaliador WHERE id = '$iduser' AND token = '$token'";
$result = $mysqli->query($query);
$row = $result->fetch_array(MYSQLI_ASSOC);
if($result)
    echo  json_encode($row, JSON_UNESCAPED_UNICODE);
else
    echo $query;