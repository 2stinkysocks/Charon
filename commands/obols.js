module.exports = {
    name: 'obols',
    description: "Count how many Obols you have, or check the leaderboard",
    execute(message, args, obols, Discord){
        if(args[0] == null) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`${message.author.username}'s Obols`)
                .setColor(`#4287F5`)
                .setThumbnail(`https://i.imgur.com/NUZfL7i.png`)
                .setDescription(`*${message.author.username} has ${obols[message.author.id] == undefined ? "0" : obols[message.author.id]} Obols*`);
            message.channel.send(embed);
        } else if(message.mentions.members.first() != null) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`${message.mentions.members.first().user.username}'s Obols`)
                .setColor(`#4287F5`)
                .setThumbnail(`https://i.imgur.com/NUZfL7i.png`)
                .setDescription(`*${message.mentions.members.first().user.username} has ${obols[message.mentions.members.first().id] === undefined ? "0" : obols[message.mentions.members.first().id]} Obols*`);
            message.channel.send(embed);
        } else if(args[0] == `leaderboard`|| args[0] == `lb`) {
            var sortable = [];
            for (var user in obols) {
                sortable.push([user, obols[user]]);
            }
            sortable.sort(function(a, b) {
                return b[1] - a[1];
            });
            sortable.slice(9);

            var list = "";
            sortable.forEach((pair, i) => {
                list += "#" + (i+1) + "\t" + message.guild.members.cache.get(pair[0]).user.username + ' - ' + pair[1] + '\n';
            });

            const embed = new Discord.MessageEmbed()
                .setTitle(`Obols Leaderboard`)
                .setColor(`#4287F5`)
                .setThumbnail(`https://i.imgur.com/NUZfL7i.png`)
                .setDescription(list);
            message.channel.send(embed);
        } else {
            message.channel.send("You need to specify either nothing, a user's @, or `leaderboard`!");
        }
    }
}