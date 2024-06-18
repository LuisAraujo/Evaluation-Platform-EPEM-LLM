<?php
/*obter alternativas já marcadas*/
@include "../conectdb.php";

$query = "SELECT * FROM avaliacao INNER JOIN prompts ON prompts.id = prompt_id WHERE avaliador_id <> 20 AND questoes_id <> 7 ORDER by prompt_id, questoes_id";
$result = $mysqli->query($query);
echo mysqli_num_rows($result);

$array =[];
$prior_row = $result->fetch_array(MYSQLI_ASSOC);

$conflits = [0,0,0,0,0,0];
$noconflits = 0;
$nopair=0;
$pair=0;
$total=0;
$fim = 0;
while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
   
    if(($row['prompt_id'] == $prior_row['prompt_id'])){
    
        if($row['questoes_id'] == $prior_row['questoes_id']){
            $array[] = $prior_row;
            $array[] = $row;

            if($row['alternativas_id'] == $prior_row['alternativas_id']){
                $noconflits++;
               
            } else{
                $conflits[ intval($row['questoes_id'])-1 ]++;
             }
            $pair++;
           
            $prior_row  = $result->fetch_array(MYSQLI_ASSOC);
            $fim = 1;
            continue;

        }else{
            $nopair++;
        }
        
    }else{
        $nopair++;
    }
    $fim = 2;
    $prior_row  = $row;
}

if($fim == 2)
    $nopair++;


$array2 =[];
$array2['total'] = $total;
$array2['conflits'] = $conflits;
$array2['total_conflits'] = array_sum($conflits);
$array2['noconflits'] = $noconflits;
$array2['nopair'] = $nopair;
$array2['pair'] = $pair;
echo  json_encode($array2, JSON_UNESCAPED_UNICODE);
