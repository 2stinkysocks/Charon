module.exports = {
    name: "afkhandler",
    allowedChannelIds: ['640913665700134912','640734812872769548','651777584127803402','651113562231799828','782319549156032512','640734833605214250','698677442348449822','641777417769189414','641777443610427412','651777710426816523','640913631923404801','705296702479007765','732298122432217139','732298190568554568','782314659822829568','782314762410131476'],
    execute(message, afk, pms, fs, config) {
        if(message.content.startsWith(`${config[message.guild.id].prefix}afk`) && afk[message.author.id] != undefined) return;
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