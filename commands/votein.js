module.exports = {
  name: 'votein',
  description: 'Vote into a white star list',
  oneListOnly: false, // used to toggle if -votein will always vote into sos
  execute(message, args) {
    if(this.oneListOnly) {
      if (message.member.roles.cache.find(role => role.name == `sos list`)) return message.channel.send(`You have voted into sos already!`);
      message.channel.send("**NOTE**\n\nEveryone will be voted into the same list this week.")
      message.member.roles.add(message.guild.roles.cache.find(role => role.name == `sos list`)).catch(console.error);
      message.channel.send({
        embed: {
          color: 4360181,
          title: `SOS list`,
          description: message.guild.roles.cache.find(role => role.name == `sos list`).members.map(m => m.user.tag).join('\n')
        }
      });
      return;
    }

    if (message.channel.name != `white-star-enlist` && message.channel.name != `private-bot-playground`) return message.channel.send(`You can't enlist in this channel!`);
    if (args[0] == null) return message.channel.send(`You need to specify a list! (vc, sos, rsvd, allies, fill)`);
    var list = args[0].toLowerCase();
    if (list != `vc` && list != `sos` && list != `rsvd` && list != `void` && list != `allies` && list != `fill`) return message.channel.send(`${args[0]} is not a valid list! Use ${config.prefix}votein (vc, sos, rsvd, void, allies, fill)`);
    if (message.member.roles.cache.find(role => role.name == `vc list`)) return message.channel.send(`You have voted into vc already!`);
    if (message.member.roles.cache.find(role => role.name == `sos list`)) return message.channel.send(`You have voted into sos already!`);
    if (message.member.roles.cache.find(role => role.name == `rsvd list`)) return message.channel.send(`You have voted into rsvd already!`);
    if (message.member.roles.cache.find(role => role.name == `void list`)) return message.channel.send(`You have voted into void already!`);
    if (message.member.roles.cache.find(role => role.name == "allies list")) return message.channel.send(`You have voted into allies already!`);
    if (message.member.roles.cache.find(role => role.name == `fill list`)) return message.channel.send(`You have voted into fill already!`);
    switch (list) {
      case `vc`:
        var role = message.guild.roles.cache.find(role => role.name == `vc list`);
        message.member.roles.add(role).catch(console.error);
        break;
      case `sos`:
        var role = message.guild.roles.cache.find(role => role.name == `sos list`);
        message.member.roles.add(role).catch(console.error);
        break;
      case `rsvd`:
        var role = message.guild.roles.cache.find(role => role.name == `rsvd list`);
        message.member.roles.add(role).catch(console.error);
        break;
      case `allies`:
        var role = message.guild.roles.cache.find(role => role.name == `allies list`);
        message.member.roles.add(role).catch(console.error);
        break;
      case `fill`:
        var role = message.guild.roles.cache.find(role => role.name == `fill list`);
        message.member.roles.add(role).catch(console.error);
        break;
    }
    message.channel.send("**Note:** Lists that aren't displayed currently have 0 members.");
    if(message.guild.roles.cache.find(role => role.name == `vc list`).members.size > 0) message.channel.send({
      embed: {
        color: 4360181,
        title: `VC list`,
        description: message.guild.roles.cache.find(role => role.name == `vc list`).members.map(m => m.user.tag).join('\n')
      }
    });
    if(message.guild.roles.cache.find(role => role.name == `sos list`).members.size > 0) message.channel.send({
      embed: {
        color: 4360181,
        title: `SOS list`,
        description: message.guild.roles.cache.find(role => role.name == `sos list`).members.map(m => m.user.tag).join('\n')
      }
    });
    if(message.guild.roles.cache.find(role => role.name == `rsvd list`).members.size > 0) message.channel.send({
      embed: {
        color: 4360181,
        title: `RSVD list`,
        description: message.guild.roles.cache.find(role => role.name == `rsvd list`).members.map(m => m.user.tag).join('\n')
      }
    });
    if(message.guild.roles.cache.find(role => role.name == `void list`).members.size > 0) message.channel.send({
      embed: {
        color: 4360181,
        title: `Void list`,
        description: message.guild.roles.cache.find(role => role.name == `void list`).members.map(m => m.user.tag).join('\n')
      }
    });
    if(message.guild.roles.cache.find(role => role.name == `allies list`).members.size > 0) message.channel.send({
      embed: {
        color: 4360181,
        title: `Allies list`,
        description: message.guild.roles.cache.find(role => role.name == `allies list`).members.map(m => m.user.tag).join('\n')
      }
    });
    if(message.guild.roles.cache.find(role => role.name == `fill list`).members.size > 0) message.channel.send({
      embed: {
        color: 4360181,
        title: `Fill list`,
        description: message.guild.roles.cache.find(role => role.name == `fill list`).members.map(m => m.user.tag).join('\n')
      }
    });

  }
}