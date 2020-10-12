module.exports = {
    name: 'voteout',
    description: 'Vote out of all white star lists',
    async execute(message, args, oneListOnly) {
        var vcRole = message.guild.roles.find(role => role.name == `vc list`);
          var sosRole = message.guild.roles.find(role => role.name == `sos list`);
          var rsvdRole = message.guild.roles.find(role => role.name == `rsvd list`);
          var voidRole = message.guild.roles.find(role => role.name == `void list`);
          var fillRole = message.guild.roles.find(role => role.name == `fill list`);
          await message.member.removeRole(vcRole).catch(nope=>{});
          await message.member.removeRole(sosRole).catch(nope=>{});
          await message.member.removeRole(rsvdRole).catch(nope=>{});
          await message.member.removeRole(voidRole).catch(nope=>{});
          await message.member.removeRole(fillRole).catch(nope=>{});
          if(oneListOnly) {
            message.channel.send({embed: {
              color:4360181,
              title:`SOS list`,
              description: message.guild.roles.find(role => role.name == `sos list`).members.map(m=>m.user.tag).join('\n')
            }});
            return;
          }
          message.channel.send({embed: {
            color:4360181,
            title:`VC list`,
            description: message.guild.roles.find(role => role.name == `vc list`).members.map(m=>m.user.tag).join('\n')
        }});
        message.channel.send({embed: {
            color:4360181,
            title:`SOS list`,
            description: message.guild.roles.find(role => role.name == `sos list`).members.map(m=>m.user.tag).join('\n')
        }});
        message.channel.send({embed: {
          color:4360181,
          title:`RSVD list`,
          description: message.guild.roles.find(role => role.name == `rsvd list`).members.map(m=>m.user.tag).join('\n')
      }});
        message.channel.send({embed: {
          color:4360181,
          title:`Void list`,
          description: message.guild.roles.find(role => role.name == `void list`).members.map(m=>m.user.tag).join('\n')
      }});
        message.channel.send({embed: {
            color:4360181,
            title:`Fill list`,
            description: message.guild.roles.find(role => role.name == `fill list`).members.map(m=>m.user.tag).join('\n')
        }});
          message.channel.send(`${message.author.username} has left this week's white star list.`);
    }
}