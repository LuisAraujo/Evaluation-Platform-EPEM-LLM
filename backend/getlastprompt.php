<?php
@include "conectdb.php";

$avaliador = $_POST['avaliator'];

$query = "SELECT prompts_id FROM atribuicao WHERE avaliador_id = '$avaliador' AND atual = 1";
$result = $mysqli->query($query);
if($result) {
    $row = $result->fetch_array(MYSQLI_ASSOC);
    echo $row['prompts_id'];;
}else {
    echo "error";
}
