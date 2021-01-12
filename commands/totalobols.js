module.exports = {
    name: 'totalobols',
    description: 'show the total obols in play',
    execute(message, obols, Discord) {
        var totalObols = 0;
        Object.keys(obols).forEach(user => totalObols += obols[user]);
        var top = message.guild.members.cache.get(Object.keys(obols).reduce((a, b) => obols[a] > obols[b] ? a : b));
        const embed = new Discord.MessageEmbed()
            .setColor(`#4287F5`)
            .setTitle(`Total Obols in Play`)
            .setThumbnail(`https://i.imgur.com/NUZfL7i.png`)
            .setDescription(`There are ${totalObols} Obols in play.\n\n${top.user.username} has about ${Math.floor(100 *(obols[top.id]/totalObols))}% of the total Obols.`);
        message.channel.send(embed);
    }
}