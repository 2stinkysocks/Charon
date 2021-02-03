
module.exports = {
    name: "trivia",
    execute(channel, triviaquestions, Discord, obols, fs, client) {
        return new Promise((resolve, reject) => {
            var questions = Object.keys(triviaquestions);
            var answers = Object.values(triviaquestions);
            let random = Math.floor(Math.random() * questions.length);
            var question = questions[random];
            var answer = answers[random];

            let trivia = new Discord.MessageEmbed()
                .setColor(`#4287F5`)
                .setTitle(`Charon's Question:\n${question}`)
                .setThumbnail(`https://i.imgur.com/NUZfL7i.png`)
                .setDescription(`First to answer wins this Obol`);
            var questionMsg = channel.send(trivia);
            const collector = channel.createMessageCollector(m => !m.author.bot, { time: 20000 }); 

            var correctlyAnswered = null;        

            collector.on('collect', msg => {
                if(msg.content.toLowerCase() == answer.toLowerCase()) {
                    correctlyAnswered = msg.author;
                    collector.stop();
                }
            });
            collector.on('end', collected => {
                if(correctlyAnswered != null) {
                    obols[correctlyAnswered.id] == undefined ? obols[correctlyAnswered.id] = 1 : obols[correctlyAnswered.id] += 1;
                    fs.writeFile('./obols.json', JSON.stringify(obols), function (err) {
                        if (err) return console.log(err);
                    });
                    let correctEmbed = new Discord.MessageEmbed()
                        .setColor(`#4287F5`)
                        .setTitle(`${correctlyAnswered.username} won the Obol!`)
                        .setThumbnail(`https://i.imgur.com/NUZfL7i.png`)
                        .setDescription(`*Charon has granted you an Obol*\n\n*You now have ${obols[correctlyAnswered.id]} Obols*`);
                    channel.send(correctEmbed);
                } else {
                    obols[client.user.id] == undefined ? obols[client.user.id] = 1 : obols[client.user.id] += 1;
                    fs.writeFile('./obols.json', JSON.stringify(obols), function (err) {
                        if (err) return console.log(err);
                    });
                    let incorrectEmbed = new Discord.MessageEmbed()
                        .setColor(`#4287F5`)
                        .setTitle(`I think I'll just put this Obol in my pocket`)
                        .setThumbnail(`https://i.imgur.com/NUZfL7i.png`)
                        .setDescription("*Charon keeps the Obol\n\nCharon has " + obols[client.user.id] + " " + (obols[client.user.id] == 1 ? "Obol*" : "Obols*"));
                    channel.send(incorrectEmbed)
                        //.then(msg => {
                    //     msg.delete({timeout: 10000})
                    // });
                    // questionMsg.then(msg => msg.delete({timeout: 10000}));
                    // collected.forEach(collect => collect.delete({timeout: 1000}))
                }
                resolve(null);
            });
        });
    }
}