<?php
@include "conectdb.php";

$id =$_POST["id"];
$query = $_POST["sql"];
$result = $mysqli->query($query);
if($result)
    echo "ok";
else
    echo $query;
