const express = require("express");
const app = express();
const handlebars = require("express-handlebars").engine

app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.get("/", function(req, res){
    res.render("home")
})

app.listen(8081, function () {
    console.log("Servidor Ativo!")
})



const { Configuration, OpenAIApi } = require("openai");
const readlineSync = require("readline-sync");
require("dotenv").config();

(async () => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const history = [];

    while (true) {
        const user_input = readlineSync.question(Handlebars);

        const messages = [];
        for (const [input_text, completion_text] of history) {
            messages.push({ role: "user", content: input_text });
            messages.push({ role: "assistant", content: completion_text });
        }

        messages.push({ role: "user", content: user_input });

        try {
            const completion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: messages,
            });

            const completion_text = completion.data.choices[0].message.content;
            console.log(completion_text);


            history.push([user_input, completion_text]);

        } catch (error) {
            if (error.response) {
                alert(error.response.status);
                alert(error.response.data);
            } else {
                alert(error.message);
            }
        }
    }
})();

function resposta() {
    resp.innerHTML = completion_text;

}