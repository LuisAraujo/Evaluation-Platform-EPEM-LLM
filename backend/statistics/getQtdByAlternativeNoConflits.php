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
   
    if(($row['prompt_id'] == $prior_row['prompt_id'])){
        
        if($row['questoes_id'] == $prior_row['questoes_id']){
            
            $array[] = $prior_row;
            $array[] = $row;

            if($row['alternativas_id'] == $prior_row['alternativas_id']){
                 
                if(!isset($array2[$row['prompt_id']]))
                    $array2[$row['prompt_id']] = 1;
                else
                    $array2[$row['prompt_id']]++;
            } 

            $prior_row  = $result->fetch_array(MYSQLI_ASSOC);
            
            continue;

        }
        
    }

    $prior_row  = $row;
}
$array = [];

$val = 6;
//filtring question with no conlfits
$filtered = array_filter($array2, function($value) use ($val) {
    return $value == $val;
});
$a = (array) $filtered;

//creating string with aval
$str = "";
foreach ($a as $key => $valor) {
    $str.= $key.",";
}
$str = substr($str, 0, -1);
//echo $str;

$query = "SELECT * FROM avaliacao WHERE prompt_id IN (".$str.")";
$result = $mysqli->query($query);
$array =[];

while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
    if(!isset($array[$row['questoes_id']][$row['alternativas_id']]))
        $array[$row['questoes_id']][$row['alternativas_id']] = 1;
    else
        $array[$row['questoes_id']][$row['alternativas_id']]++;
};

echo  json_encode($array, JSON_UNESCAPED_UNICODE);
