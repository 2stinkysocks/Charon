module.exports = {
    name: 'voteout',
    description: 'Vote out of all white star lists',
    execute(message, args, Discord) {
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
          message.channel.startTyping();
          const listEmbed = new Discord.MessageEmbed()
            .setColor(`#4287F5`)
            .setDescription(`You have voted out this week's whitestar list`)
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