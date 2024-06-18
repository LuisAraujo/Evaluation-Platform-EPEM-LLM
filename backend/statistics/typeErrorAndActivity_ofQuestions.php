<?php
/*obter alternativas já marcadas*/
@include "../conectdb.php";

$databasename2 = "peef_bd2";

$mysqli2 = new mysqli($host,$user,$password,$databasename2);
$mysqli2->set_charset("utf8");

if($mysqli2->connect_errno) {
    printf("Connect failed: %s\n", $mysqli2->connect_error);
    exit();
}

$query = "SELECT * FROM avaliacao INNER JOIN prompts ON prompts.id = prompt_id WHERE avaliador_id = 20 OR avaliacao.prompt_id IN (5,10,27,58,65,69,85,91,92,147,169,170,178,189,238,269,270,298,310,338,347,369,398) ORDER BY prompt_id, questoes_id";
$result = $mysqli->query($query);

$array =[];
$prompts = [];
$prompts[0] = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'type erro', 'topico'];
while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
    if( !isset($prompts[$row["prompt_id"]] )){
        $prompts[ $row["prompt_id"] ] = [];
        $prompts[ $row["prompt_id"] ][1] = 0;
        $prompts[ $row["prompt_id"] ][2] = 0;
        $prompts[ $row["prompt_id"] ][3] = 0;
        $prompts[ $row["prompt_id"] ][4] = 0;
        $prompts[ $row["prompt_id"] ][5] = 0;
        $prompts[ $row["prompt_id"] ][6] = 0;

        //$query2 = "SELECT typeError FROM compilation WHERE id = ".$row["id_compilacao"];
        $query2 = "SELECT typeError, Topic.title as title FROM compilation INNER JOIN Code ON Code_id = Code.id INNER JOIN Project ON Project.id = Code.Project_id INNER JOIN Activity ON Activity.id = Project.Activity_id INNER JOIN Topic ON Topic.id = Activity.Topic_id WHERE compilation.id = ".$row["id_compilacao"];
        //echo $query2;
        $result2 = $mysqli2->query($query2);
        $row2 = $result2->fetch_array(MYSQLI_ASSOC);

        $prompts[ $row["prompt_id"] ][7] = $row2["typeError"];
        $prompts[ $row["prompt_id"] ][8] = $row2["title"];
    }
    
    $prompts[ $row["prompt_id"] ][ $row["questoes_id"] ] = $row["alternativas_id"]; 
}
//qtd por prompt
foreach ($prompts as $key => $valor) {
    echo $key.", ".implode(", ", $valor ). "<br>";
}


