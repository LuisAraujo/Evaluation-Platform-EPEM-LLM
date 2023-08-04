container_aval = "<div class=\"item-aval\"><input class=\"name\" ><div class=\"icon-button icon-trash\"></div>";
updateListAvaliator()

$("#btn-add").click(function (){
    console.log("add");
    $("#container-avaliator").append(container_aval);

    $(".icon-trash").click(function (){
       $(this).parent().remove();
    });
});

$("#btn-create").click(function (){
    $(".name").each(function (e){
        if($(this).val() != "")
            createAvaliator( $(this).val() );
    });
});

function updateListAvaliator() {
    $("#container-list-avaliator").html('<div class="head">Avaliadores</div>');

    $.post( "backend/getavaliators.php")
        .done(
            function (data){
                data = JSON.parse(data);
                for(i=0; i < data.length; i++) {
                    var ref = data[i].ref;
                    var token = data[i].token;
                    var name = data[i].name;
                    var url = "https://peefonline.com/avaliacao/?avaliator=" + ref + "&token=" + token;
                    $("#container-list-avaliator").append('<div class="avaliator" id="avaliator-'+ (i+1)+'" url="' + url + '">' + (i+1) + ' - <a href="atribuating.html?id='+ref+'" target="_blank" > ' + name + ' </a> (' + url + ')  <span class = "copy" ref = "'+ (i+1) +'" > copy <span class = "icon"> </span></span></div>')

                }
                href="atribuating.html?id='+ref+'"
                $(".copy").click(function () {
                    copy( $("#avaliator-"+$(this).attr("ref")).attr("url") );
                });
            });



}

function  copy(text){

    navigator.clipboard.writeText(text);

}
function createAvaliator(nome){
    nome = nome;
    token = Math.floor(Math.random() * 100);
    $.post( "backend/createavaliator.php",
        {nome:nome,token:token})
        .done(
            function (data){
                if(data == "ok") {
                    $("#msg-alert").html("<span class='msg-sucess'>Avaliador cadastrado</span>");
                    $(".name").val("");
                }else
                    $("#msg-alert").html("<span class='msg-error'>Erro ao cadastrar avaliador</span>");

                updateListAvaliator();
            });
}



