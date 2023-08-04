<?php
$host = "localhost";
$user="peefon73_root";
$password="qiQ4ZEn7bXgywZr";
$databasename = "peefon73_aval_llm";

//LOCAL
/**/
$host = "localhost";
$user="root";
$password="";
$databasename = "validacao_llm";

$mysqli = new mysqli($host,$user,$password,$databasename);
$mysqli->set_charset("utf8");

if($mysqli->connect_errno) {
    printf("Connect failed: %s\n", $mysqli->connect_error);
    exit();
}
?>