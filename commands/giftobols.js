module.exports = {
    name: 'giftobols',
    description: "Give your obols to another user",
    execute(message, args, obols, fs, Discord){
        if(args[0] == null || message.mentions.members.first() == null) return message.channel.send("Please mention a user you'd like to gift Obols to!");
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
            .setDescription(`*You have ${obols[message.author.id]} Obols*\n\n*${message.mentions.users.first().username} has ${obols[message.mentions.members.first().id]} Obols*`);
        message.channel.send(embed);
    }
}