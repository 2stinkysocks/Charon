module.exports = {
    name: 'deletequestion',
    description: "Delete a trivia question",
    execute(message, triviaquestions, fs){
        if(message.author.id != '456225381406605313' && message.author.id != '417439359868862465') return message.channel.send("You don't have permission to do that!");
        const collector = message.channel.createMessageCollector(m => !m.author.bot && m.author.id === message.author.id, {max: 1});

        message.channel.send("Enter the question you want to delete (or type `cancel` to cancel): ")
        collector.on('collect', msg => {
            if(msg.content == "cancel") {
                message.channel.send("Cancelled");
            } else {
                var success = false;
                Object.keys(triviaquestions).forEach(question => {
                    if(msg.content.toLowerCase() == question.toLowerCase()) {
                        delete triviaquestions[question];
                        fs.writeFile('./triviaquestions.json', JSON.stringify(triviaquestions), function (err) {
                            if (err) return console.log(err);
                        });
                        message.channel.send("Question deleted");
                        success = true;
                    }
                });
                if(!success) {
                    return message.channel.send("That question does not exist!");
                }
            }
        });
    }
}