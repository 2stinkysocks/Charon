module.exports = {
    name: 'list',
    description: 'List white star roles',
    async execute(message, args) {
        if(args[0] == `count`) {
            let countVc = message.guild.roles.find(role => role.name == `vc list`).members.size;
            let countSOS = message.guild.roles.find(role => role.name == `sos list`).members.size;
            let countRSVD = message.guild.roles.find(role => role.name == `rsvd list`).members.size;
            let countVoid = message.guild.roles.find(role => role.name == `void list`).members.size;
            let countFill = message.guild.roles.find(role => role.name == `fill list`).members.size;
            let countTotal = countVc + countSOS + countRSVD + countVoid + countFill;
            message.channel.send(`**Votein counts:**\n\nVc: ${countVc}\nSOS: ${countSOS}\nRSVD: ${countRSVD}\nVoid: ${countVoid}\nFill: ${countFill}\n\nTotal: ${countTotal}`);
            return;
          }
          if(args[0] == `bomber`) {
            message.channel.send({embed: {
              color:4360181,
              title:`Stealth Bombers`,
              description: message.guild.roles.find(role => role.name == `Stealth Bomber`).members.map(m=>m.user.tag).join('\n')
            }});
            return;
          }
          if(args[0] == `miner`) {
            message.channel.send({embed: {
              color:4360181,
              title:`Eve Miners`,
              description: message.guild.roles.find(role => role.name == `Miner`).members.map(m=>m.user.tag).join('\n')
            }});
            return;
          }
          if(args[0] == `vc`) {
            message.channel.send({embed: {
              color:4360181,
              title:`Vc list`,
              description: message.guild.roles.find(role => role.name == `vc list`).members.map(m=>m.user.tag).join('\n')
            }});
            return;
          }
          if(args[0] == `sos`) {
            message.channel.send({embed: {
              color:4360181,
              title:`SOS list`,
              description: message.guild.roles.find(role => role.name == `sos list`).members.map(m=>m.user.tag).join('\n')
            }});
            return;
          }
          if(args[0] == `rsvd`) {
            message.channel.send({embed: {
              color:4360181,
              title:`RSVD list`,
              description: message.guild.roles.find(role => role.name == `rsvd list`).members.map(m=>m.user.tag).join('\n')
            }});
            return;
          }
          if(args[0] == `void`) {
            message.channel.send({embed: {
              color:4360181,
              title:`Void list`,
              description: message.guild.roles.find(role => role.name == `void list`).members.map(m=>m.user.tag).join('\n')
            }});
            return;
          }
          if(args[0] == `fill`) {
            message.channel.send({embed: {
              color:4360181,
              title:`Fill list`,
              description: message.guild.roles.find(role => role.name == `fill list`).members.map(m=>m.user.tag).join('\n')
            }});
            return;
          }
          if(args[0] == `vc-ws`) {
            message.channel.send({embed: {
              color:4360181,
              title:`VC-ws`,
              description: message.guild.roles.find(role => role.name == `vc-ws`).members.map(m=>m.user.tag).join('\n')
            }});
            return;
          }
          if(args[0] == `sos-ws`) {
            message.channel.send({embed: {
              color:4360181,
              title:`SOS-ws`,
              description: message.guild.roles.find(role => role.name == `sos-ws`).members.map(m=>m.user.tag).join('\n')
            }});
            return;
          }
          if(args[0] == `rsvd-ws`) {
            message.channel.send({embed: {
              color:4360181,
              title:`RSVD-ws`,
              description: message.guild.roles.find(role => role.name == `rsvd-ws`).members.map(m=>m.user.tag).join('\n')
            }});
            return;
          }
          if(args[0] == `void-ws`) {
            message.channel.send({embed: {
              color:4360181,
              title:`Void-ws`,
              description: message.guild.roles.find(role => role.name == `void-ws`).members.map(m=>m.user.tag).join('\n')
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
    }
}