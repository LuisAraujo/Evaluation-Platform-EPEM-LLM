<?php
@include "conectdb.php";

$nome = $_POST["nome"];
$token = md5($_POST["token"]);

$query = "INSERT INTO avaliador(id, nome, token) VALUES('', '$nome','$token')";
$result = $mysqli->query($query);
if($result)
    echo "ok";
else
    echo "error";
