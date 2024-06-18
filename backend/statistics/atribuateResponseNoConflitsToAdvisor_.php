<?php
/*obter alternativas já marcadas*/
@include "../conectdb.php";

$query = "SELECT * FROM avaliacao INNER JOIN prompts ON prompts.id = prompt_id WHERE avaliador_id <> 20 AND questoes_id <> 7 AND prompt_id IN (SELECT prompts_id FROM atribuicao WHERE avaliador_id = '20') ORDER by prompt_id, questoes_id";
$result = $mysqli->query($query);
$array =[];
$prior_row = $result->fetch_array(MYSQLI_ASSOC);

$prompts = [];
while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
   
    if(($row['prompt_id'] == $prior_row['prompt_id'])){
    
        if($row['questoes_id'] == $prior_row['questoes_id']){
            $array[] = $prior_row;
            $array[] = $row;

            if($row['alternativas_id'] == $prior_row['alternativas_id']){
              
                $sql = "INSERT INTO avaliacao VALUES(null,20, ".$row['prompt_id'].",".$row['questoes_id'].",". $row['alternativas_id'] .",NULL)";
                //$result2 = $mysqli->query($sql);
               
                
            }
            
            $prior_row  = $result->fetch_array(MYSQLI_ASSOC);
            continue;

        }
        
    }

    $prior_row  = $row;
}
//qtd por prompt
foreach ($prompts as $key => $valor) {
    echo "INSERT INTO atribuicao VALUES(null, 20, ".$key.", 0);";
   // echo $key.";".count($valor)."<br>";
}


echo "remova o comentario da linha 22";