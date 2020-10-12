module.exports = {
  name: 'votein',
  description: 'Vote into a white star list',
  oneListOnly: false, // used to toggle if -votein will always vote into sos
  async execute(message, args) {
    if(this.oneListOnly) {
      if (message.member.roles.find(role => role.name == `sos list`)) return message.channel.send(`You have voted into sos already!`);
      message.channel.send("**NOTE**\n\nEveryone will be voted into the same list this week.")
      await message.member.addRole(message.guild.roles.find(role => role.name == `sos list`)).catch(console.error);
      message.channel.send({
        embed: {
          color: 4360181,
          title: `SOS list`,
          description: message.guild.roles.find(role => role.name == `sos list`).members.map(m => m.user.tag).join('\n')
        }
      });
      return;
    }

    if (message.channel.name != `white-star-enlist` && message.channel.name != `private-bot-playground`) return message.channel.send(`You can't enlist in this channel!`);
    if (args[0] == null) return message.channel.send(`You need to specify a list! (vc, sos, rsvd, void, fill)`);
    var list = args[0].toLowerCase();
    if (list != `vc` && list != `sos` && list != `rsvd` && list != `void` && list != `fill`) return message.channel.send(`${args[0]} is not a valid list! use ${config.prefix}votein (vc, sos, rsvd, void, fill)`);
    if (message.member.roles.find(role => role.name == `vc list`)) return message.channel.send(`You have voted into vc already!`);
    if (message.member.roles.find(role => role.name == `sos list`)) return message.channel.send(`You have voted into sos already!`);
    if (message.member.roles.find(role => role.name == `rsvd list`)) return message.channel.send(`You have voted into rsvd already!`);
    if (message.member.roles.find(role => role.name == "void list")) return message.channel.send(`You have voted into void already!`);
    if (message.member.roles.find(role => role.name == `fill list`)) return message.channel.send(`You have voted into fill already!`);
    switch (list) {
      case `vc`:
        var role = message.guild.roles.find(role => role.name == `vc list`);
        await message.member.addRole(role).catch(console.error);
        message.channel.send({
          embed: {
            color: 4360181,
            title: `VC list`,
            description: message.guild.roles.find(role => role.name == `vc list`).members.map(m => m.user.tag).join('\n')
          }
        });
        message.channel.send({
          embed: {
            color: 4360181,
            title: `SOS list`,
            description: message.guild.roles.find(role => role.name == `sos list`).members.map(m => m.user.tag).join('\n')
          }
        });
        message.channel.send({
          embed: {
            color: 4360181,
            title: `RSVD list`,
            description: message.guild.roles.find(role => role.name == `rsvd list`).members.map(m => m.user.tag).join('\n')
          }
        });
        message.channel.send({
          embed: {
            color: 4360181,
            title: `Void list`,
            description: message.guild.roles.find(role => role.name == `void list`).members.map(m => m.user.tag).join('\n')
          }
        });
        message.channel.send({
          embed: {
            color: 4360181,
            title: `Fill list`,
            description: message.guild.roles.find(role => role.name == `fill list`).members.map(m => m.user.tag).join('\n')
          }
        });

        message.channel.send(`${message.author.username} has signed up for this week's white star list.`);
        break;
      case `sos`:
        var role = message.guild.roles.find(role => role.name == `sos list`);
        await message.member.addRole(role).catch(console.error);
        message.channel.send({
          embed: {
            color: 4360181,
            title: `VC list`,
            description: message.guild.roles.find(role => role.name == `vc list`).members.map(m => m.user.tag).join('\n')
          }
        });
        message.channel.send({
          embed: {
            color: 4360181,
            title: `SOS list`,
            description: message.guild.roles.find(role => role.name == `sos list`).members.map(m => m.user.tag).join('\n')
          }
        });
        message.channel.send({
          embed: {
            color: 4360181,
            title: `RSVD list`,
            description: message.guild.roles.find(role => role.name == `rsvd list`).members.map(m => m.user.tag).join('\n')
          }
        });
        message.channel.send({
          embed: {
            color: 4360181,
            title: `Void list`,
            description: message.guild.roles.find(role => role.name == `void list`).members.map(m => m.user.tag).join('\n')
          }
        });
        message.channel.send({
          embed: {
            color: 4360181,
            title: `Fill list`,
            description: message.guild.roles.find(role => role.name == `fill list`).members.map(m => m.user.tag).join('\n')
          }
        });

        message.channel.send(`${message.author.username} has signed up for this week's white star list.`);
        break;
      case `rsvd`:
        var role = message.guild.roles.find(role => role.name == `rsvd list`);
        await message.member.addRole(role).catch(console.error);
        message.channel.send({
          embed: {
            color: 4360181,
            title: `VC list`,
            description: message.guild.roles.find(role => role.name == `vc list`).members.map(m => m.user.tag).join('\n')
          }
        });
        message.channel.send({
          embed: {
            color: 4360181,
            title: `SOS list`,
            description: message.guild.roles.find(role => role.name == `sos list`).members.map(m => m.user.tag).join('\n')
          }
        });
        message.channel.send({
          embed: {
            color: 4360181,
            title: `RSVD list`,
            description: message.guild.roles.find(role => role.name == `rsvd list`).members.map(m => m.user.tag).join('\n')
          }
        });
        message.channel.send({
          embed: {
            color: 4360181,
            title: `Void list`,
            description: message.guild.roles.find(role => role.name == `void list`).members.map(m => m.user.tag).join('\n')
          }
        });
        message.channel.send({
          embed: {
            color: 4360181,
            title: `Fill list`,
            description: message.guild.roles.find(role => role.name == `fill list`).members.map(m => m.user.tag).join('\n')
          }
        });

        message.channel.send(`${message.author.username} has signed up for this week's white star list.`);
        break;
      case `void`:
        var role = message.guild.roles.find(role => role.name == `void list`);
        await message.member.addRole(role).catch(console.error);
        message.channel.send({
          embed: {
            color: 4360181,
            title: `VC list`,
            description: message.guild.roles.find(role => role.name == `vc list`).members.map(m => m.user.tag).join('\n')
          }
        });
        message.channel.send({
          embed: {
            color: 4360181,
            title: `SOS list`,
            description: message.guild.roles.find(role => role.name == `sos list`).members.map(m => m.user.tag).join('\n')
          }
        });
        message.channel.send({
          embed: {
            color: 4360181,
            title: `RSVD list`,
            description: message.guild.roles.find(role => role.name == `rsvd list`).members.map(m => m.user.tag).join('\n')
          }
        });
        message.channel.send({
          embed: {
            color: 4360181,
            title: `Void list`,
            description: message.guild.roles.find(role => role.name == `void list`).members.map(m => m.user.tag).join('\n')
          }
        });
        message.channel.send({
          embed: {
            color: 4360181,
            title: `Fill list`,
            description: message.guild.roles.find(role => role.name == `fill list`).members.map(m => m.user.tag).join('\n')
          }
        });
        break;
      case `fill`:
        var role = message.guild.roles.find(role => role.name == `fill list`);
        await message.member.addRole(role).catch(console.error);
        message.channel.send({
          embed: {
            color: 4360181,
            title: `VC list`,
            description: message.guild.roles.find(role => role.name == `vc list`).members.map(m => m.user.tag).join('\n')
          }
        });
        message.channel.send({
          embed: {
            color: 4360181,
            title: `SOS list`,
            description: message.guild.roles.find(role => role.name == `sos list`).members.map(m => m.user.tag).join('\n')
          }
        });
        message.channel.send({
          embed: {
            color: 4360181,
            title: `RSVD list`,
            description: message.guild.roles.find(role => role.name == `rsvd list`).members.map(m => m.user.tag).join('\n')
          }
        });
        message.channel.send({
          embed: {
            color: 4360181,
            title: `Void list`,
            description: message.guild.roles.find(role => role.name == `void list`).members.map(m => m.user.tag).join('\n')
          }
        });
        message.channel.send({
          embed: {
            color: 4360181,
            title: `Fill list`,
            description: message.guild.roles.find(role => role.name == `fill list`).members.map(m => m.user.tag).join('\n')
          }
        });

        message.channel.send(`${message.author.username} has signed up for this week's white star list.`);
        break;
    }
  }
}