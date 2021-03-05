module.exports = {
    name: 'getdata',
    description: 'Get a json file from the bot',
    async execute(message, args, fs) {
        if(message.author.id != `417439359868862465`) return message.channel.send("This command is for debug only, and is probably useless to you...");
        try {
            message.author.send('```json\n' + fs.readFileSync(`./${args.join(" ")}.json`, {encoding:'utf8', flag:'r'}) + '\n```');
            message.channel.send("Data sent!");
        } catch(e) {
            message.channel.send("An error occured: " + e.message);
        }
    }
}