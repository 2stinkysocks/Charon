module.exports = {
    name: 'security',
    description: 'Add someone as a member of security',
    async execute(message, args) {
        //message.reply(message.member);
        if(!(message.member.hasPermission(`MANAGE_GUILD`) || message.member.hasPermission(`ADMINISTRATOR`) || message.member.roles.has('750417200799547413'))) return message.channel.send("You don't have permission to do that!");
        if(args[0] != "add" && args[0] != "remove") return message.channel.send("You need to specify `add` or `remove`!");
        var name = args.join(" ").slice(args[0].length).trim().toLowerCase();
        if(message.guild.members.find(member => member.user.username.toLowerCase().startsWith(name)) == null) return message.channel.send("Please specify a valid user to modify.");

        if(args[0] == "add") {                                                             // security
            if(message.guild.members.find(member => member.user.username.toLowerCase().startsWith(name)).roles.has('761371834724778004')) return message.channel.send("That user already has the role!");
            message.guild.members.find(member => member.user.username.toLowerCase().startsWith(name)).addRole(message.guild.roles.get('761371834724778004'));
            return message.channel.send(`${message.guild.members.find(member => member.user.username.toLowerCase().startsWith(name)).user.username} is now a member of security.`);
        }

        if(args[0] == "remove") {
            if(!message.guild.members.find(member => member.user.username.toLowerCase().startsWith(name)).roles.has('761371834724778004')) return message.channel.send("That user doesn't have the role!");
            message.guild.members.find(member => member.user.username.toLowerCase().startsWith(name)).removeRole(message.guild.roles.get('761371834724778004'));
            return message.channel.send(`${message.guild.members.find(member => member.user.username.toLowerCase().startsWith(name)).user.username} is no longer a member of security.`);
        }
    }
}