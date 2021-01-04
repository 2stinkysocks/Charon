module.exports = {
    name: "obolslottery",
    description: "Command for villainousin to gift a random obol to someone in @sos or @allies",
    execute(message, obols, fs, client, Discord) {
        if(message.author.id != '456225381406605313' && message.author.id != '417439359868862465') return message.channel.send("You don't have permission to use this command!");
        var sosRole = message.guild.roles.cache.find(role => role.name === "SoS").members;
        var alliesRole = message.guild.roles.cache.find(role => role.name === "Allies").members;

        var memberList = Array.from(sosRole.concat(alliesRole));
        var randomMember = Math.floor(Math.random()*(memberList.length-1))

        obols[memberList[randomMember][0]] === undefined ? obols[memberList[randomMember][0]] = 1 : obols[memberList[randomMember][0]] += 1;

        obols[client.user.id] -= 1;
        fs.writeFile('./obols.json', JSON.stringify(obols), function (err) {
            if (err) return console.log(err);
        });

        let embed = new Discord.MessageEmbed()
                .setColor(`#4287F5`)
                .setTitle(`Charon's Gift`)
                .setThumbnail(`https://i.imgur.com/NUZfL7i.png`)
                .setDescription(`As Charon attempts to put yet another Obol in his pocket, it slips and falls to the floor.\n${memberList[randomMember][1].user.username} snatches it up just as he turns his fiery gaze upon them.\nHe smiles, nods and disappears into the acrid smoke.\n\n*Charon has ${obols[client.user.id]} Obols*`);
        message.channel.send(memberList[randomMember][1].user.toString(), {embed});
    }   
}