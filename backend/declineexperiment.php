<?php
@include "conectdb.php";

$avaliador = $_POST['avaliator'];

$query = "UPDATE avaliador SET declinou = 1 WHERE id = $avaliador";
$result = $mysqli->query($query);
if($result) {
    echo "ok";
}else {
    echo "error";
}

