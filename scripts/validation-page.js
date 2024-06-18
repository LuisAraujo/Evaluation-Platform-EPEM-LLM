//getiing URL params
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var avaliator = urlParams.get('avaliator');
var token = urlParams.get('token');
var prompt = urlParams.get('prompt');

//array questions (idprompt)
var questions = [];
//index of actual question in questions array
var actual_question = 0;
//max questions of avaliator get length questions
var max_question = 0;
//all questions in json
var all_questions = null;
//last prompt unavaliated visited
var last_prompt = 0;

$("document").ready(function (){
    chekcAccess();
})

$(window).focus(function (){
    chekcAccess();
})

//chekc user access
function  chekcAccess(){
    if(avaliator == undefined || token == undefined) {
        showMsg("!Você está usando a url incorreta, por favor solicite ao pesquisador a url correta!", function () {
            window.location = "about:blank";
        });
    }else{
        getUser(avaliator, token);
    }
}

//get data of responses
fetch('responses/responses_chatgpt_conf3.json')
    .then((response) => response.json())
    .then((json) => main(json));

//the main function that call gerate prompt
function main(json){
    all_questions = json;
    getQuestions();
    getMyQuestions(avaliator);
}
/** GetData Functions **/

//Get user data
function getUser(id, token){
 
    $.post( "backend/getuser.php",{id:id, token:token}).done(
        function (data){

            if(data == "null") {
                showMsg("Você está usando a url incorreta, por favor solicite ao pesquisador a url correta!", function () {
                    window.location = "about:blank";
                });
                return;

            }
            data = JSON.parse(data);

            if(data.declinou == 1){
                showMsg("Você declinou da pesquisa. Caso deseje retornar, contate o pesquisador!", function () {
                    window.location = "about:blank";
                });
                return;
            }else{

                $("#user-name").text(data.nome);
                $("#user-name").attr("ref", data.id);

            }


        });
}

function updateLastPrompt(){
    $.post( "backend/updatelastprompt.php", {avaliator: avaliator, lastprompt: last_prompt}).done(
        function (data){
            console.log(data);
        });
};

function declineExperiment(){
    $.post( "backend/declineexperiment.php",
        {avaliator:avaliator}).done(
        function (data){

            if(data == "ok")
                showMsg("Você foi desligado da pesquisa! Obrigado.");
            else
                showMsg("Ocorreu um erro ao declinar. Caso o erro persista, contate o pesquisador");

        });
}

//get data prompt in database
function getLastPrompt(callback){
    $.post( "backend/getlastprompt.php",
        {avaliator:avaliator}).done(
        function (data){

            if(data == "")
                last_prompt = 0;
            else
                last_prompt = data;//parseInt(data);

            console.log(last_prompt);

            setActualPrompt();
            callback();
        });
};

//get data prompt in database
function getLastPromptById(id, callback){
    last_prompt = id;
    setActualPrompt();
    callback();
};

//setiing actual prompt when get last prompt data
function  setActualPrompt(){
    for(var i=0; i< questions.length; i++){
        if(questions[i] == last_prompt){
            actual_question = i;
            break;
        }
    }
}



//que text of questions
function getQuestions(){
    $.post( "backend/getquestions.php").done(
        function (data){
            //return;
            $("#form-validations").html("");

            data = JSON.parse(data);
            $.each(data,function(index, value){
                text = '<div class="options-form">';

                if(value.aberta == 0) {
                    text += '<select q_option="'+value.id+'" ref="closed" class="quest" id="quest' + (index + 1) + '" style="background-color: rgb(133, 150, 138);">';
                    text += '<option value=""></option>';
                    text += '<option value="3">NA</option>';
                    text += '<option value="1">SIM</option>';
                    text += '<option value="2">NÃO</option>';
                    text += '</select>';
                    text += '<span id="text-quest'+(index + 1)+'">' + value.descricao + '</span> ';
                }else{
                    text += '<span id="text-quest'+(index + 1)+'">' + value.descricao + '</span> ';
                    text += '<textarea q_option="'+value.id+'" ref="open" id="quest' + (index + 1) + '" class="quest open-quest" style="background-color: rgb(133, 150, 138);"></textarea>';
                }

                text +='</div>';
                $("#form-validations").append(text);
                //$("#text-quest"+).html(value);
            });


            //On change question response
            $(".quest").change(function (e){
                var type = $(this).attr("ref");
                if(type == "closed")
                    var q_value = $(this).find(":selected").val();
                else
                    var q_value = $(this).val();
                var q_option = $(this).attr("q_option");

                saveOption(q_option, q_value, type);
                printQuest();
            });
        });
}

function  printQuest(){
    $(".quest").each(function (e){

        var q_value = $(this).find(":selected").val();
        if( q_value == "1"){
            $(this).css("background-color", "rgb(49, 192, 85)")
        }else if(q_value == "2"){
            $(this).css("background-color", "rgb(208,91,91)")
        }else{
            $(this).css("background-color", "rgb(133,150,138)")
        }

    });

}

//get my atribueted questions
function getMyQuestions(id){

    $.post( "backend/getmyquestions.php",
        {id:id}).done(
        function (data){
            data = JSON.parse(data);
            console.log(data);
            max_question = data.length-1;
            for(var i= 0; i < data.length; i++){
                questions.push(data[i]);
            };
            console.log(questions);
            if((prompt == undefined) || (prompt == "")){
                getLastPrompt( function () {
                    showQuestion();
                });
            }else{
                getLastPromptById(prompt, function () {
                    showQuestion();
                });

            }
        });
}

//show prompt and gpt response
function showQuestion(){

    printed_question = all_questions[ questions[actual_question] -1 ];
   
    $("#head-prompt").html("PROMPT "+questions[actual_question]+" - STUD: "+printed_question.student+" PROJ: "+printed_question.project+" COMP: "+printed_question.compilation);
    textprompt = printed_question.prompt.replace(/\n/g, '<br>');
    textprompt = textprompt.replace(/ /g, '&nbsp;');
    console.log(printed_question);

    $("#main-actual-prompt").html(textprompt);
    textgpt = printed_question.chatgptresponse.replace(/\n/g, '<br>\n');
    textgpt = textgpt.replace(/ /g, '&nbsp;');
    $("#response-prompt").html(textgpt);
    getDataOptions();
}

//clean all options in form
function cleanOption(){
    for(var i = 1; i <= 7; i++) {
        $('#quest'+i).val("");
        printQuest();
        //$('#quest'+i).trigger("change");
    }
}

function fillOption(){

}

//Save question in database
function saveOption(q_option, q_value, type){
    console.log("op: " + q_option + " val: "+q_value + " ty: "+type);
    if(q_value == "")
        return;
    q_value = q_value.replaceAll(",", "&#x2022;");
    q_value = q_value.replaceAll("'", "&#39;");

    $.post( "backend/savequestion.php",
        {avaliador:avaliator,
            prompt: questions[actual_question],
            questao:q_option,
            type: type,
            alternativa:q_value})
        .done(
            function (data){
                if(data == "ok") {
                    showMsgSaveState("salved");
                    $("#btn-save").addClass("disable");
                }else{
                    $("#btn-save").removeClass("disable");
                    showMsgSaveState("no-salved")
                }
            }).fail(
                function(data){
                    console.log(data);
                }
            );
}

//get data question in database and print questions
function getDataOptions(){

    $.post( "backend/getdataquestion.php",
        {avaliador:avaliator,
            prompt: questions[actual_question]})
        .done(
            function (data){
                data = JSON.parse(data);
                $.each(data,function(index, value){
                    console.log(value.resposta_aberta)
                    if(value.resposta_aberta == null)
                        $("#quest"+(value.questoes_id)).val(value.alternativas_id);
                    else {
                        value.resposta_aberta = value.resposta_aberta.replaceAll("&#x2022;", ".");
                        value.resposta_aberta = value.resposta_aberta.replaceAll("&#39;", "'");
                        $("#quest" + (value.questoes_id)).val(value.resposta_aberta);
                    }//$("#quest"+(value.questoes_id)).trigger("change");
                });
                printQuest();

            });
}

//Show message on save data
function  showMsgSaveState (state){
    if(state == "salved"){
        var today = new Date();
        var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
        var time = (today.getHours()<10?'0'+today.getHours():today.getHours()) + ":" + ( today.getMinutes()<10?'0'+today.getMinutes() : today.getMinutes() ) + ":" + (today.getSeconds()<10?'0'+today.getSeconds(): today.getSeconds());
        $("#state-save").html("Todas as alterações foram salvas "+date +" " +time);
    }else{
        $("#state-save").html("Salvando as alterações...")
    }
}



/** User Interations Functions **/

//Show Message
function showMsg(msg, callback){
    $("#page").addClass("page-blur");
    $("#modal").show();
    $("#modal-msg").text(msg);
    if(callback)
        $("#btn-cancelar").click(function (){
            $("#page").removeClass("page-blur");
            $("#modal").hide();
            callback();
        });
    else
        $("#btn-cancelar").click(function (){
            $("#page").removeClass("page-blur");
            $("#modal").hide();
        });

}

function showConfirm(msg, callback, callback2){
    $("#page").addClass("page-blur");
    $("#modal-confirm").show();
    $("#modal-msg-confirm").text(msg);

    $("#btn-confirm").click(function (){
        $("#page").removeClass("page-blur");
        $("#modal-confirm").hide();
        if(callback)
            callback();
    });

    $("#btn-noconfirm").click(function (){
        $("#page").removeClass("page-blur");
        $("#modal-confirm").hide();
        if(callback2)
            callback2();
    });
}

//next question
$("#btn-next").click(function (){
    window.scrollTo(0, 0);
    if(actual_question == max_question) {
        showMsg("Não há mais prompts!");
        return;
    }
    var count_quest = $('.quest').length;
    for(var i = 1; i <= count_quest; i++) {
        if( $('#quest'+i).val() == "") {
                showMsg("Existem questões não respondidas para esta questão. Por favor conclua antes de avançar!");
                return;
            }
    }

    actual_question++;
    if( questions[actual_question] > last_prompt){
        last_prompt = questions[actual_question];
        updateLastPrompt();
    }

    showQuestion();
    cleanOption();
});

//prior question
$("#btn-prior").click(function (){
    window.scrollTo(0, 0);
    if(actual_question == 0) {
        showMsg("Não há prompts anteriores!");
        return;
    }

    actual_question--;

    showQuestion();
    cleanOption();
});

//save question
$("#btn-save").click(function (){

    var count_quest = $('.quest').length;
    for(var i = 1; i <= count_quest; i++){
        var type = $("#quest"+i).attr("ref");
        var q_option = $("#quest"+i).attr("q_option");

        if(type == "closed")
            var q_value = $("#quest"+i).find(":selected").val();
        else
            var q_value = $("#quest"+i).val();
        if(q_value != '')
            saveOption(q_option, q_value, type);
    }
});

$("#btn-decline").click(function (){
    showConfirm("Tem certeza que deseja declinar a pesquisa?!",
        function (){
           declineExperiment();
        },
        function(){ });
});

//copy prompt
$("#copy").click(function () {
    copy( $("#response-prompt").text() );
});

$("#btn-clean").click(function () {
   cleanOption();
});


function  copy(text){
    navigator.clipboard.writeText(text);
}