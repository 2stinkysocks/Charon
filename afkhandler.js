module.exports = {
    name: "afkhandler",
    allowedChannelIds: ['806552536285708368'],
    execute(message, afk, pms, fs, config) {
        if(message.content.startsWith(`${config.prefix}afk`) && afk[message.author.id] != undefined) return;
        if(afk[message.author.id] != undefined) {
            delete afk[message.author.id];
            fs.writeFile('./afk.json', JSON.stringify(afk), function (err) {
                if (err) return console.log(err);
            });
            message.channel.send("Welcome back, "+ message.author.toString() +"! Removed your afk.").then(msg => {
                msg.delete({timeout: 5000});
            });
        }
        var allowedToSend = false;
        this.allowedChannelIds.forEach(id => {
            if(id == message.channel.id) {
                allowedToSend = true;
            }
        });
        if(message.mentions.members != null && allowedToSend) {
            message.mentions.members.forEach(member => {
                if(afk[member.id] != undefined) {
                    var now = new Date();
                    var ms = Math.floor((now.getTime() - afk[member.id].afktime) / 1000) * 1000;
                    var prettyTime = pms(ms, {verbose: true});
                    message.channel.send(message.guild.members.cache.get(member.id).user.username + " is AFK: " + afk[member.id].message + " - " + prettyTime + " ago.");
                }
            });
        }
    }
}