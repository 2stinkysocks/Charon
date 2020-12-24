module.exports = {
    name: 'takeobols',
    description: "Take obols from a user",
    execute(message, args, obols, fs, Discord){
        if(message.author.id != '456225381406605313' && message.author.id != '417439359868862465') return message.channel.send("You don't have permission to do that!");
        if(args[0] == null) return message.channel.send("Please ping a user to take obols from!");
        if(args[1] == null) return message.channel.send("Please specify the number of obols to take!");

        var userid = message.mentions.members.first().id;
        if(userid == null) return message.channel.send("That is an invalid user!");
        var number = parseInt(args[1].trim());
        
        if(obols[userid] == undefined) return message.channel.send("That user has no Obols to take!");
        obols[userid] <= number ? obols[userid] = 0 : obols[userid] -= number;

        fs.writeFile('./obols.json', JSON.stringify(obols), function (err) {
            if (err) return console.log(err);
        });
        const embed = new Discord.MessageEmbed()
            .setColor(`#4287F5`)
            .setTitle(`Take Obols`)
            .setThumbnail(`https://i.imgur.com/NUZfL7i.png`)
            .setDescription(`*${message.mentions.members.first().toString()} has ${obols[userid]} Obols*`)
        message.channel.send(embed);
    }
}