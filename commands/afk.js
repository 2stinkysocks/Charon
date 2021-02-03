module.exports = {
    name: "afk",
    execute(message, args, fs, afk) {
        var now = new Date();
        if(afk[message.author.id] == null) {
            if(args[0] == null) {
                afk[message.author.id] = {
                    "afktime": now.getTime(),
                    "message": "AFK"
                }
            } else {
                afk[message.author.id] = {
                    "afktime": now.getTime(),
                    "message": args.join(' ')
                }
            }
            fs.writeFile('./afk.json', JSON.stringify(afk), function (err) {
                if (err) return console.log(err);
            });
            message.channel.send(message.author.toString() + " I set your AFK: " + afk[message.author.id].message)
        } else {
            message.channel.send("You're already marked as afk!");
        }
    }
}