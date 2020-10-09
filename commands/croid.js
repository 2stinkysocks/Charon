module.exports = {
    name: 'croid',
    description: 'Show/modify croid data',
    async execute(message, args, croids, timestring, fs) {
        if(!croids.users.hasOwnProperty(message.author.id)) {
            croids.users[message.author.id] = {"availabledate":0, "timezone":0};
            fs.writeFile('./croids.json', JSON.stringify(croids), function (err) {
                if (err) return console.log(err);
            });
          }
          if(args[0] == 'mined') {
            if(args[1] == null) return message.channel.send(`You need to specify how long ago your croid was mined! (ex: 1h30m)`);
            let now = new Date();
            let timeTillCroid = new Date((now.getTime() - timestring(args.join(" ").slice(args[0].length).trim().split(/ +/g).join(""), 'ms')) + 86400000); // I think this works properly
            let timeDec = ((timeTillCroid.getTime() - now.getTime()) / 3600000);
            message.channel.send(`Croid can be mined again at ${timeTillCroid.toUTCString()} (${Math.floor(timeDec)}h ${Math.floor(60 * (timeDec - Math.floor(timeDec)))}m)`);
            croids.users[message.author.id].availabledate = timeTillCroid.getTime();
            fs.writeFile('./croids.json', JSON.stringify(croids), function (err) {
                if (err) return console.log(err);
            });
            return;
          }
          if(args[0] == null) {
            let now = new Date();
            let timeDec = Math.round((((croids.users[message.author.id].availabledate) - now.getTime()) / 3600000)*10)/10;
            if(croids.users[message.author.id].availabledate - now.getTime() < 0) { //available
              message.channel.send({embed: { //TODO : ADD CROID DATASHEET
                color:2808075,
                title: message.author.username + `'s croid`,
                description: `Status: :white_check_mark: available\n\nCan be mined now!`
              }});
            } else { //unavailable
              message.channel.send({embed: { //TODO : ADD CROID DATASHEET
                color:13379852,
                title: message.author.username + `'s croid`,
                description: `Status: :x: not available\n\nCan be mined in ${Math.floor(timeDec)}h ${60 * Math.round(timeDec - Math.floor(timeDec))}m.`
              }});
            }
          }
    }
}