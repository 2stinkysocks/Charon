module.exports = {
    name: 'autovote',
    description: 'Opt in or out to automatic weekly voteins.',
    execute(message, args, fs, recurringVoters, bannedAutoVoters, client) {
      //if(!message.member.roles.some(role => role.name === 'Charon Tester')) return message.channel.send("This is currently a beta-only feature!");

      if(bannedAutoVoters[message.author.id] == true) return message.channel.send("You are currently banned from using this feature. Contact an Officer if you believe this is an error.");
      
      var name = args.join(" ").slice(args[0].length).trim().toLowerCase();
      if(args[0] == "ban") {
        var userToBan;
        if(message.mentions.members.first() == null) {
          userToBan = message.guild.members.find(member => member.user.username.toLowerCase().startsWith(name));
        } else {
          userToBan = message.mentions.members.first();
        }
        if(!message.member.roles.some(role => role.name === "Officer")) return message.channel.send("This is an Officer only command!");
        if(bannedAutoVoters[userToBan.id] == true) return message.channel.send("This user is already banned!");
        bannedAutoVoters[userToBan.id] = true;
        fs.writeFile('./bannedAutoVoters.json', JSON.stringify(bannedAutoVoters), function (err) {
          if (err) return console.log(err);
        });
        delete recurringVoters.users[userToBan.id];
        message.channel.send(`${userToBan.user.username} is now banned`);
        return;
      } else if(args[0] == "unban") {
        var userToUnban;
        if(message.mentions.members.first() == null) {
          userToUnban = message.guild.members.find(member => member.user.username.toLowerCase().startsWith(name));
        } else {
          userToUnban = message.mentions.members.first();
        }
        if(!message.member.roles.some(role => role.name === "Officer")) return message.channel.send("This is an Officer only command!");
        if(bannedAutoVoters[userToUnban.id] == false || bannedAutoVoters[userToUnban.id] == null) return message.channel.send("This user is not banned!");
        bannedAutoVoters[userToUnban.id] = false;
        fs.writeFile('./bannedAutoVoters.json', JSON.stringify(bannedAutoVoters), function (err) {
          if (err) return console.log(err);
        });
        message.channel.send(`${userToUnban.user.username} is now unbanned`);
        return;
      }

      if(args[0] == 'list') {
        var autovoteList = "";
        Object.keys(recurringVoters.users).forEach(voter => {
          var currentVoter = client.users.get(voter);
          autovoteList += voter + ' - ' + currentVoter.tag + '\n';
        });
        if(autovoteList == "") return message.channel.send("There are no current autovoters for any list!");
        message.channel.send({embed: {
          color:4360181,
          title:`Current Autovoters`,
          description: autovoteList
        }});
      }

      if(args[0] == "enable" || args[0] == "enabled") {
        if(recurringVoters.users[message.author.id] != null) return message.channel.send(`You are already set to vote in automatically to the ${recurringVoters.users[message.author.id]} list!`);
        var list = args[1].toLowerCase();
        if(list != `vc` && list != `sos` && list != `rsvd` && list != `allies` && list != `fill`) return message.channel.send(`${args[1]} is not a valid list! Valid lists are vc, sos, rsvd, allies, fill`);
        recurringVoters.users[message.author.id] = args[1];
        fs.writeFile('./recurringVoters.json', JSON.stringify(recurringVoters), function (err) {
          if (err) return console.log(err);
        });
        message.channel.send(`**You are now set to vote in to the ${args[1]} list each week.**`);
      } else if(args[0] == "disable" || args[0] == "disabled") {
        if(recurringVoters.users[message.author.id] == null) return message.channel.send(`You are not currently set to vote in automatically!`);
        delete recurringVoters.users[message.author.id];
        fs.writeFile('./recurringVoters.json', JSON.stringify(recurringVoters), function (err) {
          if (err) return console.log(err);
        });
        message.channel.send(`**You will no longer be automatically voted in to a list.**`);
      } else {
        return message.channel.send("You need to specify `enable` or `disable` for recurring signup.")
      }
    }
}