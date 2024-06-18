<?php
/*obter alternativas já marcadas*/
@include "../conectdb.php";

$query = "SELECT * FROM avaliacao INNER JOIN prompts ON prompts.id = prompt_id WHERE avaliador_id <> 20 AND questoes_id <> 7 ORDER by prompt_id, questoes_id";
$result = $mysqli->query($query);
$array =[];
$array2 =[];
$prior_row = $result->fetch_array(MYSQLI_ASSOC);
$conflits = [0,0,0,0,0,0];
$noconflits = 0;
$nopair=0;
$pair=0;
$total=[];
while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
   $array2[$row['prompt_id']] = 1;
}
$array = [];

//creating string with aval
$str = "";
foreach ($array2 as $key => $valor) {
    $str.= $key.",";
}
$str = substr($str, 0, -1);
//echo $str;

$query = "SELECT * FROM avaliacao WHERE avaliador_id = 20 AND prompt_id IN (SELECT prompts_id FROM atribuicao WHERE avaliador_id = 20) ORDER BY prompt_id, questoes_id, alternativas_id";
//$query = "SELECT * FROM avaliacao WHERE prompt_id IN (".$str.") ORDER BY questoes_id, alternativas_id";

$result = $mysqli->query($query);
$array =[];

while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
    if(!isset($array[$row['questoes_id']][$row['alternativas_id']]))
        $array[$row['questoes_id']][$row['alternativas_id']] = 1;
    else
        $array[$row['questoes_id']][$row['alternativas_id']]++;
};

echo  json_encode($array, JSON_UNESCAPED_UNICODE);
