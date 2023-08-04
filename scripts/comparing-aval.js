showAvaliation = function (textjson) {

    $("#container-list-avaliations").html("");

    for (i = 0; i < textjson.length; i++) {

        if ($("#avaliation_" + textjson[i].prompt_id).length == 0) {

            content = "<div id='avaliation_" + textjson[i].prompt_id + "' class='avaliation'>";
            content += "<div class='head-avaliation'>Prompt <span>" + textjson[i].prompt_id + "</span></div></div>";

            $("#container-list-avaliations").append(content);
        }

        if( $("#container-avaliators_" + textjson[i].prompt_id + "_" + textjson[i].avaliador_id ).length ==0 ){
            content = "<div id='container-avaliators_" + textjson[i].prompt_id + "_" + textjson[i].avaliador_id + "' class='container-avaliators'></div></div>";
            $("#avaliation_" + textjson[i].prompt_id).append(content);
        }

         if ($("#head-avaliator_" + textjson[i].prompt_id + "_" + textjson[i].avaliador_id).length == 0) {

             $("#container-avaliators_" + textjson[i].prompt_id + "_" + textjson[i].avaliador_id).append("<div id='head-avaliator_" + textjson[i].prompt_id + "_" + textjson[i].avaliador_id + "' class='head-avaliator'>Avaliador " + textjson[i].avaliador_id + "</div>");
        }

        if ($("#head-question_" + textjson[i].prompt_id + "_" + textjson[i].avaliador_id + "-" + textjson[i].questoes_id).length == 0) {
            content = "<div class='container-question'>";
            content += "<div id='head-question_" + textjson[i].prompt_id + "_" + textjson[i].avaliador_id + "_" + textjson[i].questoes_id + "' class='head-question'>Q" + textjson[i].questoes_id + "</div>";
            alternativas = ["SIM", "NAO", "NA"];

            if(textjson[i].questoes_id != 7)
                content += "<div class='value-question " + (alternativas[textjson[i].alternativas_id - 1]) + "-value'>" + (alternativas[textjson[i].alternativas_id - 1]) + "</div></div>";
            else
                content += "<div class='value-question open-question'>texto</div></div>";
            $("#container-avaliators_" + textjson[i].prompt_id + "_" + textjson[i].avaliador_id).append(content);
        }
    }
}

$("#btn-exibir").click( function (){

    $.post( "backend/getPromptByPairId.php",{id: $("#avaliators").val()})
    .done(
    function (data){
        data = JSON.parse(data);
        showAvaliation(data);
    });

});

showPairs = function (){
    $.post( "backend/getPairs.php")
    .done(
    function (data){
        data = JSON.parse(data);
        for(i=0; i < data.length; i++) {
            $("#avaliators").append('<option value="'+data[i].id+'"> ' + data[i].nome_aval1 + ' ('+data[i].id_aval1+') e '+data[i].nome_aval2 + ' ('+data[i].id_aval2+ ') </option>');
        }
    });
}();
