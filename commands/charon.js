
module.exports = {
    name: 'charon',
    description: "Charon's lore",
    execute(message, obols, Discord, client){
        const embed = new Discord.MessageEmbed()
            .setColor(`#4287F5`)
            .setThumbnail(`https://i.imgur.com/NUZfL7i.png`)
            .setDescription("*Charon is the ferryman who conveyed souls across the river Styx into the Underworld. Payment for transport was one Obol. If you didn't have any payment, you were doomed to wander the shores of Acheron for one hundred years, haunting it as a ghost.\n\nCharon currently has an abundance of Obols and is willing to give you one, with a correct answer to his questions. If you fail, he keeps it.\n\nCharon has " + (obols[client.user.id] === undefined ? "0" : obols[client.user.id]) + " Obols.*")
            //.setDescription("*Charon is the ferryman who conveyed souls across the river Styx into the Underworld. Payment for transport was one Obol. If you didn't have any payment, you were doomed to wander the shores of Acheron for one hundred years, haunting it as a ghost.*")

        message.channel.send(embed);
    }
}