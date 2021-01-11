module.exports = {
    name: 'giftobols',
    description: "Give your obols to another user",
    execute(message, args, obols, fs, Discord, client){
        if(obols[message.author.id] === undefined || obols[message.author.id] == 0) return message.channel.send("You have no obols to give!");
        if(args[0] == null || message.mentions.members.first() == null) return message.channel.send("Please mention a user you'd like to gift Obols to!");
        if(parseInt(args[1]) < 0) {
            if(obols[message.author.id] <= -10) {
                const negativeGiftOverdraft = new Discord.MessageEmbed()
                    .setColor(`#4287F5`)
                    .setThumbnail(`https://i.imgur.com/NUZfL7i.png`)
                    .setDescription(`"You Cur! You try to steal Obols by negative gifting?! You should be thrown in the River Styx or fed to Cerberus! You shall pay for your transgressions!”`);
                    return message.channel.send(negativeGiftOverdraft);
            }
            obols[message.author.id] -= 5;
            obols[client.user.id] += 5;
            fs.writeFile('./obols.json', JSON.stringify(obols), function (err) {
                if (err) return console.log(err);
            });
            const negativeGift = new Discord.MessageEmbed()
                .setColor(`#4287F5`)
                .setThumbnail(`https://i.imgur.com/NUZfL7i.png`)
                .setDescription(`“You Cur! You try to steal Obols by negative gifting?! You should be thrown in the River Styx or fed to Cerberus! You shall pay for your transgressions!”\n\n*Charon takes 5 Obols from you.*\n\nCharon now has ${obols[client.user.id]} obols.\nYou now have ${obols[message.author.id]} obols.`);
            return message.channel.send(negativeGift);
        }
        if(args[1] == null) return message.channel.send("You need to specify how many Obols you'd like to give!");
        if(obols[message.author.id] === undefined || parseInt(args[1]) > obols[message.author.id]) return message.channel.send("You don't have that many Obols!")

        obols[message.mentions.members.first().id] == undefined ? obols[message.mentions.members.first().id] = parseInt(args[1]) : obols[message.mentions.members.first().id] += parseInt(args[1]);
        obols[message.author.id] -= parseInt(args[1]);
        fs.writeFile('./obols.json', JSON.stringify(obols), function (err) {
            if (err) return console.log(err);
        });
        const embed = new Discord.MessageEmbed()
            .setColor(`#4287F5`)
            .setThumbnail(`https://i.imgur.com/NUZfL7i.png`)
            .setTitle("Gift Obols")
            .setDescription(`*You graciously hand over ${args[1]} Obols to ${message.mentions.users.first().username}*\n\nYou now have ${obols[message.author.id]} Obols\n${message.mentions.users.first().username} now has ${obols[message.mentions.members.first().id]} Obols`);
        message.channel.send(embed);
    }
}