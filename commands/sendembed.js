module.exports = {
    name: 'sendembed',
    description: 'Sends an embed with using json input',
    execute(message, args) {
        if(!message.member.hasPermission(`MANAGE_GUILD`)) return message.channel.send("You don't have permission to do that!");
        try {
            message.channel.send({embed: JSON.parse(args.join(' '))});
            message.delete();
        } catch(e) {
            message.channel.send(`Invalid JSON:\n${e.message}`);
        }
    }
}