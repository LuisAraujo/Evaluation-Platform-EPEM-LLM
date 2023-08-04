max = 413;
count = 22;
text = "";

for(i=1; i <= count; i++){
    for(j=i; j<max; j+=20){
        var sql = "INSERT atribuicao VALUES('', '"+i+"','"+j+"', '0')"
        text += sql + ";\n";

    }
}

console.log(text);

