<?php
@include "conectdb.php";

$query = "SELECT dupla.id as id, avaliador.id as id_aval1, avaliador2.id as id_aval2,  avaliador.nome as nome_aval1 , avaliador2.nome as nome_aval2 FROM dupla INNER JOIN avaliador ON avaliador.id = dupla.aval1 INNER JOIN avaliador as avaliador2 ON avaliador2.id = dupla.aval2";
$result = $mysqli->query($query);
$array =[];
while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
    $array[] = $row;
}

echo  json_encode($array, JSON_UNESCAPED_UNICODE);
