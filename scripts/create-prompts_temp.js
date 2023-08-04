//get data from json and copy to database

createPrompt = function (){
//get data of responses
fetch('responses/responses_chatgpt_conf3.json')
    .then((response) => response.json())
    .then((json) => main(json));

}

//the main function that call gerate prompt
function main(json) {

    console.log("main");

    for (i = 0; i < json.length; i++) {
        student = json[i].student;
        project = json[i].project;
        comp = json[i].compilation;

        promtp = json[i].prompt;
        promtp = promtp.replace(/"/g, "'");

        chat = json[i].chatgptresponse;
        chat = chat.replace(/"/g, "'");


        sql = 'INSERT INTO prompts (id, id_compilacao, id_estudante, id_projeto, prompt, chatgpt_resposta) ' +
            'VALUES ("'+(i+1)+'", "' + comp + '","' + student + '","' + project + '","' + promtp + '","' + chat + '" )';

        $.post("backend/createprompts.php",
            {id: i, sql: sql})
            .done(
                function (data) {
                    console.log(data);
                });

    }
}

