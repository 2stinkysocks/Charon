module.exports = {
    name: 'list',
    description: 'List white star roles',
    execute(message, args, oneListOnly) {
        if(args[0] == `count`) {
            let countVc = message.guild.roles.cache.find(role => role.name == `vc list`).members.size;
            let countSOS = message.guild.roles.cache.find(role => role.name == `sos list`).members.size;
            let countRSVD = message.guild.roles.cache.find(role => role.name == `rsvd list`).members.size;
            let countAllies = message.guild.roles.cache.find(role => role.name == `allies list`).members.size;
            let countVoid = message.guild.roles.cache.find(role => role.name == `void list`).members.size;
            let countFill = message.guild.roles.cache.find(role => role.name == `fill list`).members.size;
            let countTotal = countVc + countSOS + countRSVD + countAllies + countVoid + countFill;
            message.channel.send(`**Votein counts:**\n\nVc: ${countVc}\nSOS: ${countSOS}\nRSVD: ${countRSVD}\nVoid: ${countVoid}\nAllies: ${countAllies}\nFill: ${countFill}\n\nTotal: ${countTotal}`);
            return;
          }
          if(args[0] != null) {
            if(message.guild.roles.cache.find(role => role.name.startsWith(args[0].toLowerCase())) != null) {
              message.channel.send({embed: {
                color:4360181,
                title:`Members in ${message.guild.roles.cache.find(role => role.name.startsWith(args[0].toLowerCase())).name}`,
                description: message.guild.roles.cache.find(role => role.name.startsWith(args[0].toLowerCase())).members.map(m=>m.user.tag).join('\n')
              }});
              return;
            } else {
              return message.channel.send("That role doesn't exist!");
            }
          }
          if(oneListOnly) {
            message.channel.send({embed: {
              color:4360181,
              title:`SOS list`,
              description: message.guild.roles.cache.find(role => role.name == `sos list`).members.map(m=>m.user.tag).join('\n')
            }});
            return;
          }
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
            color:4360181,
            title:`Void list`,
            description: message.guild.roles.cache.find(role => role.name == `void list`).members.map(m=>m.user.tag).join('\n')
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
    }
}