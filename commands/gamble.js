module.exports = {
    name: "gamble",
    description: "Gamble obols",
    execute(message, args, Discord, obols, fs, client) {
        return new Promise((resolve, reject) => {
            if(args[0] == null) return message.channel.send("You need to specify an amount of obols to gamble!");
            const negativeObols = new Discord.MessageEmbed()
                .setColor(`#4287F5`)
                .setThumbnail(`https://i.imgur.com/NUZfL7i.png`)
                .setDescription(`“So you think you’re clever, don’t you? I will allow you to wager negative Obols, but you may not wager more than you can lose to me. Win or lose, eventually everybody pays the Ferryman.”`)
            if(parseInt(args[0]) < 1 && (Math.abs(parseInt(args[0])) > obols[message.author.id] || Math.abs(parseInt(args[0])) > obols[client.user.id])) return message.channel.send(negativeObols);
            const notEnoughObols = new Discord.MessageEmbed()
                .setColor(`#4287F5`)
                .setThumbnail(`https://i.imgur.com/NUZfL7i.png`)
                .setDescription(`“Are you trying to cheat the Ferryman? I’ve dumped souls overboard for less. Come back to the table when you have more Obols, cur.”`);
            if(parseInt(args[0]) > obols[message.author.id] || obols[message.author.id] === undefined) return message.channel.send(notEnoughObols);
            const charonNotEnoughObols = new Discord.MessageEmbed()
                .setColor(`#4287F5`)
                .setThumbnail(`https://i.imgur.com/NUZfL7i.png`)
                .setDescription(`*“You wish to gamble away your hard earned Obols against me? Very well then, I accept.”*\n\nCharon attempts to match your bet of ${args[0]}.\n\n*“It seems I must have dropped some Obols...”*\n\nYou and Charon must have enough Obols to gamble.\n\nCome back later or reduce your bet size.`);
            if(parseInt(args[0]) > obols[client.user.id]) return message.channel.send(charonNotEnoughObols);
            if(isNaN(args[0])) return message.channel.send("\"" + args[0] + "\" is not a number!");
            var charonMove = Math.floor(Math.random()*2) == 0 ? "rock" : Math.floor(Math.random()*2) == 0 ? "paper" : "scissors";
            var playerMove = "";
            const initialEmbed = new Discord.MessageEmbed()
                .setColor(`#4287F5`)
                .setThumbnail(`https://i.imgur.com/NUZfL7i.png`)
                .setDescription(`“You wish to gamble away your hard earned Obols against me? Very well then, I accept.”\n\n*Charon matches your bet of ${args[0]}.*\n\n“Make your choice against the Ferryman of the Underworld. But choose wisely, lest you lose your soul.”\n\nChoose: Rock / Paper / Scissors`);
            message.channel.send(initialEmbed);
            const collector = message.channel.createMessageCollector(m => !m.author.bot && m.author.id === message.author.id, {max: 1});
            
            let cancelled = false;
            let wrongthing = false;

            collector.on('collect', msg => {
                const lowerMsg = msg.content.toLowerCase();
                if(lowerMsg == 'cancel') {
                cancelled = true; 
                } else if(lowerMsg == "rock" || lowerMsg == "paper" || lowerMsg == "scissors"){
                playerMove = lowerMsg;
                } else {
                    cancelled = true;
                    wrongthing = true;
                    const wrongthingembed = new Discord.MessageEmbed()
                    .setColor(`#4287F5`)
                    .setThumbnail(`https://i.imgur.com/NUZfL7i.png`)
                    .setDescription(`“Are you just toying with me? Or do you really not know how to play the game shoushiling? Well I’m not here to teach you...”\n\nYou must pick: Rock / Paper / Scissors\n\nYour bet was cancelled.`);
                    message.channel.send(wrongthingembed);
                }
            });

            collector.on('end', collected => {
                if(cancelled) {
                    if(!wrongthing) message.channel.send("Cancelled");
                } else {
                    if(charonMove == playerMove) {
                        const tie = new Discord.MessageEmbed() 
                        .setColor(`#4287F5`)
                        .setThumbnail(`https://i.imgur.com/NUZfL7i.png`)
                        .setDescription(`You both place your bets on the table. At the count of three, in unison, you each throw ${charonMove}! With a scowl, Charon takes his bet back from the table and without a word, disappears into the acrid smoke.\n\nCharon now has ${obols[client.user.id]} Obols.\n${message.author.username} now has ${obols[message.author.id]} Obols.`);
                        message.channel.send(tie);
                    } else if((charonMove == "rock" && playerMove == "paper") || (charonMove == "paper" && playerMove == "scissors") || (charonMove == "scissors" && playerMove == "rock")) {
                        obols[message.author.id] += parseInt(args[0]);
                        obols[client.user.id] -= parseInt(args[0]);
                        fs.writeFile('./obols.json', JSON.stringify(obols), function (err) {
                            if (err) return console.log(err);
                        });
                        const playerWonEmbed = new Discord.MessageEmbed()
                        .setColor(`#4287F5`)
                        .setThumbnail(`https://i.imgur.com/NUZfL7i.png`)
                        .setDescription(`You both place place your bets on the table. Charon strokes his long, unkept beard as he ponders what you will choose. At the count of three, he throws ${charonMove} and you throw ${playerMove}!\n\n“You have chosen wisely.”\n\nYou take Charon’s Obol, give it a flip into the air, and then add it to *your* pocket!\n\nCharon now has ${obols[client.user.id]} Obols.\nYou now have ${obols[message.author.id]} Obols.`);
                        message.channel.send(playerWonEmbed);
                    } else {
                        obols[message.author.id] -= parseInt(args[0]);
                        obols[client.user.id] += parseInt(args[0]);
                        fs.writeFile('./obols.json', JSON.stringify(obols), function (err) {
                            if (err) return console.log(err);
                        });
                        const charonWonEmbed = new Discord.MessageEmbed()
                            .setColor(`#4287F5`)
                            .setThumbnail(`https://i.imgur.com/NUZfL7i.png`)
                            .setDescription(`You stand face to face with the Ferryman. His eyes, like hollow furnaces on fire, peer deep into your soul. You throw ${playerMove} and him, knowing your deepest intentions, throws ${charonMove}.\n\n“You have chosen... poorly.”\n\n*Charon snatches up his winnings and disappears into the acrid smoke.*\n\nCharon now has ${obols[client.user.id]} Obols.\n${message.author.username} now has ${obols[message.author.id]} Obols.`);
                        message.channel.send(charonWonEmbed);
                    }
                    resolve(null);
                }
            });   
        });
    }
}