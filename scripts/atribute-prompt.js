atribuingPrompt();

function atribuingPrompt(){
    $("#container-list-avaliator").html("");
    $("#container-list-avaliator").html('<div class="head">Avaliadores</div>');

    $.post( "backend/getavaliators.php")
        .done(
            function (data){
                data = JSON.parse(data);
                for(i=0; i < data.length; i++) {
                    ref = data[i].ref;
                    var name = data[i].name;
                    var declined = data[i].declinou
                    if(declined == "1")
                        $("#container-list-avaliator").append('<div class="avaliator declined" id="avaliator-'+ (i+1)+'" > ' + name + ' </div>');
                    else
                        $("#container-list-avaliator").append('<div class="avaliator" id="avaliator-'+ (i+1)+'" > ' + name + ' </div>');

                    $("#container-list-avaliator").append('<div id="container-mp-'+ref+'" class="container-miniprompt"></div>  ');
                    $.post( "backend/getpromptsbyavaliator.php",
                        {id:ref} )
                        .done(function (data){
                                //console.log(data);
                                data = JSON.parse(data);

                                element="";
                                for(let j = 0; j < data.data.length; j++) {
                                    if(data.data[j].actual=="1")
                                        element += '<div class="miniprompt actual" id="prompt-' + (data.data[j].atribuate) + '" > ' + data.data[j].prompt + ' </div>';
                                    else
                                        element += '<div class="miniprompt" id="prompt-' + (data.data[j].atribuate) + '" > ' + data.data[j].prompt + ' </div>';

                                }
                                $("#container-mp-"+data.id).append(element);
                        });

                    $("#avaliators").append('<option value="'+ref+'"> ' + name + ' </option>');
                }
            });
}
$("#btn-atribuir").click(function (){
   var qtd = parseInt($("#count").val());
   var inicio = parseInt($("#start").val());
   var intervalo = parseInt($("#leap").val());
   var aval = $("#avaliators").val();
   var currentprompt = inicio;
   for(let i = 0; i < qtd; i++ ) {
       console.log(currentprompt);
       $.post( "backend/assignmentpromp.php",{idprompt: currentprompt, idaval: aval})
           .done(
               function (data){
                   if(data == "ok"){
                       $("#msg-alert").text("Prompt "+i+" atribuido!" );
                   }else{
                       $("#msg-alert").text("Erro ao atribuir o prompt"+i );
                   }
               });
       currentprompt += intervalo;
   }

   atribuingPrompt();
});
function gerateId(start, count, step){
    arr = [];
    for(i = start; i < count; i++){
        arr.push(i*step);
    }

    //console.log(arr);
}