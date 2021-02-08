module.exports = {
    name: "afk",
    execute(message, args, fs, afk, pms) {
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
            if(args[0] == null) {
                afk[message.author.id] = {
                    "afktime": afk[message.author.id].afktime,
                    "message": "AFK"
                }
            } else {
                afk[message.author.id] = {
                    "afktime": afk[message.author.id].afktime,
                    "message": args.join(' ')
                }
            }
            fs.writeFile('./afk.json', JSON.stringify(afk), function (err) {
                if (err) return console.log(err);
            });
            var ms = Math.floor((now.getTime() - afk[message.author.id].afktime) / 1000) * 1000;
            var prettyTime = pms(ms, {verbose: true});
            message.channel.send("Afk message updated. Current afk time: " + prettyTime)
        }
    }
}