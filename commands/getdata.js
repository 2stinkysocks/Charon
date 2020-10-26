module.exports = {
    name: 'getdata',
    description: 'Get a json file from the bot',
    async execute(message, args, fs) {
        if(message.author.id != `417439359868862465`) return message.channel.send("This command is for debug only, and is useless to most users.");
        try {
            message.author.send(fs.readFileSync(`../${args.join(" ")}.json`, {encoding:'utf8', flag:'r'}));
            message.channel.send("Data sent!");
        } catch(e) {
            message.channel.send("An error occured: " + e.message);
        }
    }
}