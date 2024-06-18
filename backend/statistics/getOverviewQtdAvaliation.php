<?php
/*obter alternativas já marcadas*/
@include "../conectdb.php";

$query = "SELECT count(*) as qtd FROM avaliacao WHERE avaliador_id <>20 AND questoes_id <> 7";
$query = "SELECT count(*) as qtd FROM avaliacao WHERE avaliador_id <>20 AND questoes_id = 7";

$result = $mysqli->query($query);
$array =[];
$row = $result->fetch_row();
$qtd = intdiv( intval($row[0]), 1);
$array["abertas"] = $qtd;
$query = "SELECT count(*) as qtd FROM avaliacao WHERE avaliador_id <>20 AND questoes_id <> 7";
$result = $mysqli->query($query);

$row = $result->fetch_row();
$qtd = intdiv( intval($row[0]), 1);
$array["fechadas"] = $qtd;

echo  json_encode($array, JSON_UNESCAPED_UNICODE);
