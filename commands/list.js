module.exports = {
    name: 'list',
    description: 'List white star roles',
    execute(message, args, Discord) {
        if(args[0] == `count`) {
            let countVc = message.guild.roles.cache.find(role => role.name == `vc list`).members.size;
            let countSOS = message.guild.roles.cache.find(role => role.name == `sos list`).members.size;
            let countRSVD = message.guild.roles.cache.find(role => role.name == `rsvd list`).members.size;
            let countAllies = message.guild.roles.cache.find(role => role.name == `allies list`).members.size;
            let countFill = message.guild.roles.cache.find(role => role.name == `fill list`).members.size;
            let countTotal = countVc + countSOS + countRSVD + countAllies + countFill;
            message.channel.send(`**Votein counts:**\n\nVc: ${countVc}\nSOS: ${countSOS}\nRSVD: ${countRSVD}\nAllies: ${countAllies}\nFill: ${countFill}\n\nTotal: ${countTotal}`);
            return;
          }
          if(args[0] != null) {
            if(message.guild.roles.cache.find(role => role.name.toLowerCase() == args.join(' ').toLowerCase()) != null) {
              message.channel.send({embed: {
                color:4360181,
                title:`Members in ${message.guild.roles.cache.find(role => role.name.toLowerCase() == args.join(' ').toLowerCase()).name}`,
                description: message.guild.roles.cache.find(role => role.name.toLowerCase() == args.join(' ').toLowerCase()).members.map(m=>m.user.tag).join('\n')
              }});
              return;
            } else {
              return message.channel.send("That role doesn't exist!");
            }
          }
          const listEmbed = new Discord.MessageEmbed()
            .setColor(`#4287F5`)
            .setAuthor(`Current Whitestar Lists`)
            .setFooter(`Charon - Society of Sin`, `https://cdn.discordapp.com/app-icons/787495162909032448/8ebf962e89f2d189c9634fcf7395e2af.png?size=256`)
            .setTimestamp(new Date());
          
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
          message.channel.send(listEmbed);
    }
}