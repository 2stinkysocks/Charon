module.exports = {
    name: 'autovote',
    description: 'Opt in or out to automatic weekly voteins.',
    execute(message, args, fs, recurringVoters) {
      const allowedUsers = ['417439359868862465'];
      var isAllowed = false;
      allowedUsers.forEach(id => {
        if(message.author.id === id) {
          isAllowed = true; // TEST THIS TEST THIS TEST THIS TEST THIS TEST THIS TEST THIS
        }
      });
      if(!isAllowed) return;
      if(args[0] == "enable" || args[0] == "enabled") {
        if(recurringVoters.users[message.author.id] != null) return message.channel.send(`You are already set to vote in automatically to the ${recurringVoters.users[message.author.id]} list!`);
        var list = args[1].toLowerCase();
        if(list != `vc` && list != `sos` && list != `rsvd` && list != `void` && list != `fill`) return message.channel.send(`${args[1]} is not a valid list! Valid lists are vc, sos, rsvd, void, fill`);
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