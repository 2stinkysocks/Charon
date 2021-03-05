module.exports = {
    name: 'prefix',
    description: 'Change the bot prefix',
    execute(message, args, config, fs) {
        if(!message.member.hasPermission(`MANAGE_GUILD`) && !message.member.hasPermission(`ADMINISTRATOR`)) return message.channel.send(`You don't have permission to do that.`);
        if(args[0] == null) return message.channel.send(`You need to specify a prefix`);
        config[message.guild.id].prefix = args[0];
        fs.writeFile('./config.json', JSON.stringify(config), function (err) {
            if (err) return console.log(err);
        });
        message.channel.send(`**Prefix set to ` + config[message.guild.id].prefix + `**`);
    }
}