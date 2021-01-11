
module.exports = {
    name: 'addquestion',
    description: "Add a trivia question",
    execute(message, triviaquestions, fs, config){
        if(message.author.id != '456225381406605313' && message.author.id != '417439359868862465') return message.channel.send(`You can't add a question right now! Purchase the ability to add one with ${config.prefix}shop`);

        if(message.author.id == '456225381406605313' || message.author.id == '417439359868862465') {
            const collector = message.channel.createMessageCollector(m => !m.author.bot && m.author.id === message.author.id, {max: 1});

            message.channel.send("Enter the question (or type `cancel` to cancel): ");
            var question = "";
            var answer = "";
            var cancelled = false;
            collector.on('collect', msg => {
                if(msg.content.toLowerCase() == "cancel") cancelled = true;
                question = msg.content;
            });

            collector.on('end', collected => {
                if(!cancelled) {
                    const collector = message.channel.createMessageCollector(m => !m.author.bot && m.author.id === message.author.id, {max: 1});
                    message.channel.send("Enter the answer (or type `cancel` to cancel): ");
                    collector.on('collect', msg => {
                        if(msg.content.toLowerCase() == "cancel") cancelled = true;
                        answer = msg.content;
                    });

                    collector.on('end', msg => {
                        if(!cancelled) {
                            triviaquestions[question] = answer;
                            fs.writeFile('./triviaquestions.json', JSON.stringify(triviaquestions), function (err) {
                                if (err) return console.log(err);
                            });
                            message.channel.send("Question added!");
                        } else {
                            message.channel.send("Cancelled")
                        }
                    });
                } else {
                    message.channel.send("Cancelled")
                }
            });
        }
    }
}