module.exports = {
  name: 'votein',
  description: 'Vote into a white star list',
  execute(message, args, Discord) {
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
    message.channel.startTyping();
    const listEmbed = new Discord.MessageEmbed()
      .setColor(`#4287F5`)
      .setDescription(`You have voted into this week's ${args[0]} whitestar list`)
      .setAuthor(`Current Whitestar Lists`)
      .setFooter(`Charon - Society of Sin`, `https://cdn.discordapp.com/app-icons/787495162909032448/8ebf962e89f2d189c9634fcf7395e2af.png?size=256`)
      .setTimestamp(new Date());
    setTimeout(() => {
      if(message.guild.roles.cache.find(role => role.name == `vc list`).members.size > 0) {
        var listString = "";
          message.guild.roles.cache.find(role => role.name == `vc list`).members.forEach(member => {
            if(member.id == message.author.id) {
              listString += "**__" + member.user.tag + "__**\n";
            } else {
              listString += member.user.tag + "\n";
            }
          })
        listEmbed.addField(`VC List`, `>>> ${listString}`)
      }
      if(message.guild.roles.cache.find(role => role.name == `sos list`).members.size > 0) {
        var listString = "";
          message.guild.roles.cache.find(role => role.name == `sos list`).members.forEach(member => {
            if(member.id == message.author.id) {
              listString += "**__" + member.user.tag + "__**\n";
            } else {
              listString += member.user.tag + "\n";
            }
          })
        listEmbed.addField(`SOS List`, `>>> ${listString}`)
      }
      if(message.guild.roles.cache.find(role => role.name == `rsvd list`).members.size > 0) {
        var listString = "";
          message.guild.roles.cache.find(role => role.name == `rsvd list`).members.forEach(member => {
            if(member.id == message.author.id) {
              listString += "**__" + member.user.tag + "__**\n";
            } else {
              listString += member.user.tag + "\n";
            }
          })
        listEmbed.addField(`RSVD List`, `>>> ${listString}`)
      }
      if(message.guild.roles.cache.find(role => role.name == `void list`).members.size > 0) {
        var listString = "";
          message.guild.roles.cache.find(role => role.name == `void list`).members.forEach(member => {
            if(member.id == message.author.id) {
              listString += "**__" + member.user.tag + "__**\n";
            } else {
              listString += member.user.tag + "\n";
            }
          })
        listEmbed.addField(`Void List`, `>>> ${listString}`)
      }
      if(message.guild.roles.cache.find(role => role.name == `allies list`).members.size > 0) {
        var listString = "";
          message.guild.roles.cache.find(role => role.name == `allies list`).members.forEach(member => {
            if(member.id == message.author.id) {
              listString += "**__" + member.user.tag + "__**\n";
            } else {
              listString += member.user.tag + "\n";
            }
          })
        listEmbed.addField(`Allies List`, `>>> ${listString}`)
      }
      if(message.guild.roles.cache.find(role => role.name == `fill list`).members.size > 0) {
        var listString = "";
          message.guild.roles.cache.find(role => role.name == `fill list`).members.forEach(member => {
            if(member.id == message.author.id) {
              listString += "**__" + member.user.tag + "__**\n";
            } else {
              listString += member.user.tag + "\n";
            }
          })
        listEmbed.addField(`Fill List`, `>>> ${listString}`)
      }
      message.channel.stopTyping();
      message.channel.send(listEmbed);
    }, 500);

  }
}