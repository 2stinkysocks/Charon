module.exports = {
    name: 'joinmessage',
    description: 'Modify the join message',
    async execute(message, args, config, fs) {
        if(!message.member.hasPermission(`MANAGE_GUILD`) && !message.member.hasPermission(`ADMINISTRATOR`)) return message.channel.send(`You do not have permission to do that!`);
        if(args[0] == null) return message.channel.send("You need to provide a join message! Use {user} to mention the user who joined!");
        config.welcomemsg = args.join(' ');
        fs.writeFile('../config.json', JSON.stringify(config), function (err) {
            if (err) return console.log(err);
        });
        message.channel.send("Join message updated!")
    }
}