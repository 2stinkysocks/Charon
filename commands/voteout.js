module.exports = {
    name: 'voteout',
    description: 'Vote out of all white star lists',
    execute(message, args, oneListOnly) {
        var vcRole = message.guild.roles.cache.find(role => role.name == `vc list`);
          var sosRole = message.guild.roles.cache.find(role => role.name == `sos list`);
          var rsvdRole = message.guild.roles.cache.find(role => role.name == `rsvd list`);
          var voidRole = message.guild.roles.cache.find(role => role.name === `void list`);
          var alliesRole = message.guild.roles.cache.find(role => role.name == `allies list`);
          var fillRole = message.guild.roles.cache.find(role => role.name == `fill list`);
          message.member.roles.remove(vcRole).catch(nope=>{});
          message.member.roles.remove(sosRole).catch(nope=>{});
          message.member.roles.remove(rsvdRole).catch(nope=>{});
          message.member.roles.remove(voidRole).catch(nope=>{});
          message.member.roles.remove(alliesRole).catch(nope=>{});
          message.member.roles.remove(fillRole).catch(nope=>{});
          if(oneListOnly) {
            message.channel.send({embed: {
              color:4360181,
              title:`SOS list`,
              description: message.guild.roles.cache.find(role => role.name == `sos list`).members.map(m=>m.user.tag).join('\n')
            }});
            return;
          }
          setTimeout(() => {
            message.channel.send("**Note:** Lists that aren't displayed currently have 0 members.");
            if(message.guild.roles.cache.find(role => role.name == `vc list`).members.size > 0) message.channel.send({embed: {
              color:4360181,
              title:`VC list`,
              description: message.guild.roles.cache.find(role => role.name == `vc list`).members.map(m=>m.user.tag).join('\n')
            }});
            if(message.guild.roles.cache.find(role => role.name == `sos list`).members.size > 0) message.channel.send({embed: {
              color:4360181,
              title:`SOS list`,
              description: message.guild.roles.cache.find(role => role.name == `sos list`).members.map(m=>m.user.tag).join('\n')
            }});
            if(message.guild.roles.cache.find(role => role.name == `rsvd list`).members.size > 0) message.channel.send({embed: {
              color:4360181,
              title:`RSVD list`,
              description: message.guild.roles.cache.find(role => role.name == `rsvd list`).members.map(m=>m.user.tag).join('\n')
            }});
            if(message.guild.roles.cache.find(role => role.name == `void list`).members.size > 0) message.channel.send({embed: {
              color: 4360181,
              title: `Void list`,
              description: message.guild.roles.cache.find(role => role.name == `void list`).members.map(m => m.user.tag).join('\n')
            }});
            if(message.guild.roles.cache.find(role => role.name == `allies list`).members.size > 0) message.channel.send({embed: {
              color:4360181,
              title:`Allies list`,
              description: message.guild.roles.cache.find(role => role.name == `allies list`).members.map(m=>m.user.tag).join('\n')
            }});
            if(message.guild.roles.cache.find(role => role.name == `fill list`).members.size > 0) message.channel.send({embed: {
              color:4360181,
              title:`Fill list`,
              description: message.guild.roles.cache.find(role => role.name == `fill list`).members.map(m=>m.user.tag).join('\n')
            }});
          }, 100);
    }
}