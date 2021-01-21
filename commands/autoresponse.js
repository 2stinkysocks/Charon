
module.exports = {
    name: 'autoresponse',
    description: 'Create, modify, and delete autoresponses.',
    execute(message, args, autoresponses, config, fs, client) {
        var hasResponseAlready = false;
      if(args[0] == null) return message.channel.send(`You need to pick an option, **create**, **delete**, **list**`);
      if(args[0] === `create`) {
        Object.keys(autoresponses).forEach(function(response){
          if(autoresponses[response].creatorid == message.author.id && !message.member.hasPermission(`MANAGE_GUILD`)){
            hasResponseAlready = true;
            return message.channel.send(`You can only create one autoresponse! Delete ${response} to make a new one!`);
          }
        })
        if(hasResponseAlready) return;
        if(args[1] == null) return message.channel.send(`You need to specify a trigger command or wildcard! (doesn't need to begin with ${config.prefix}, ex: villain)`);
        if(args[2] == null && args[1] != `wildcard`) return message.channel.send(`You need to specify a response! (ex: You're almost as bad as villain!)`);
        if(args[2] == null && args[1] == `wildcard`) return message.channel.send(`You need to specify a trigger command! (ex: villain)`);
        if(args[1] == `wildcard`) {
          if(autoresponses[args[2]] != null) return message.channel.send(`That autoresponse already exists!`);
          autoresponses[args[2]] = {response: args.join(" ").slice(args[0].length).trim().slice(args[1].length).trim().slice(args[2].length).trim().split(/ +/g).join(" "), creatorid: message.author.id, wildcard:true};
          fs.writeFile('./autoresponses.json', JSON.stringify(autoresponses), function (err) {
            if (err) return console.log(err);
          });
          message.channel.send(`Autoresponse **${args[2]}** has been created with wildcard!`);
          return;
        }
        if(autoresponses[args[1]] != null) return message.channel.send(`That autoresponse already exists!`);
        autoresponses[args[1]] = {response: args.join(" ").slice(args[0].length).trim().slice(args[1].length).trim().split(/ +/g).join(" "), creatorid: message.author.id};
        fs.writeFile('./autoresponses.json', JSON.stringify(autoresponses), function (err) {
            if (err) return console.log(err);
        });
        message.channel.send(`Autoresponse **${args[1]}** has been created!`)
      }
      if(args[0] === `delete`) {
        if(args[1] == null) return message.channel.send(`You need to specify a response to delete!`)
        if(autoresponses[args[1]] == null) return message.channel.send(`That autoresponse doesn't exist!`);
        if(message.author.id != autoresponses[args[1]].creatorid && !message.member.hasPermission(`MANAGE_GUILD`)) return message.channel.send(`Only officers can remove other peoples' autoresponses!`);
        delete autoresponses[args[1]];
        fs.writeFile('./autoresponses.json', JSON.stringify(autoresponses), function (err) {
            if (err) return console.log(err);
        });
        message.channel.send(`Response deleted.`)
      }
      if(args[0] === `list`) {
        var responseList = '';
        Object.keys(autoresponses).forEach(function(response) {
          var responsecreator = client.users.cache.get(autoresponses[response].creatorid);
          responseList += response + ' - ' + responsecreator.tag;
          if(autoresponses[response].wildcard) responseList += ` *(wildcard)* `;
          responseList += `\n`;
      })
      if(responseList != "") {
        message.channel.send({embed: {
          color:4360181,
          title: "Autoresponses",
          description: responseList
        }});
      } else {
        message.channel.send(`There are no autoresponses.`)
      }
    }
    }
}