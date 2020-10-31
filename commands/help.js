module.exports = {
    name: 'help',
    description: 'Shows help for each command',
    async execute(message, args, config) {
        if(args[0] == null) {
            message.channel.send({embed: {
              color: 4360181,
              title: `Charon Help`,
              description: `**To view more information on a command, type ${config.prefix}help (command)**\n\n`,
              fields: [
                {
                  name: `${config.prefix}votein`,
                  value: `Vote into one of four white star lists`,
                },
                {
                  name: `${config.prefix}voteout`,
                  value: `Vote out of all white star lists`,
                },
                {
                  name: `${config.prefix}list`,
                  value: `View all white star lists`,
                },
                {
                  name: `${config.prefix}ping`,
                  value: `Check the bot's ping and api latency`,
                },
                {
                  name: `${config.prefix}croid`,
                  value: `Track your Rich Asteroid Field`,
                },
                {
                  name: `${config.prefix}autoresponse`,
                  value: `Create, delete, and list autoresponses!`
                },
                {
                  name: `${config.prefix}joinmessage`,
                  value: `Edit the welcome message for new members! (Officer only)`
                },
                {
                  name: `${config.prefix}bomber`,
                  value: `Add someone as a Stealth Bomber (Eve Commander Only)`
                },
                {
                  name: `${config.prefix}miner`,
                  value: `Add someone as an Eve Miner (Eve Commander Only)`
                },
                {
                  name: `${config.prefix}prefix`,
                  value: `Modify the server prefix (Officer only)`
                }
              ],
              footer: {
                text: `More to come!`
              },
            }})
            return;
          }
          switch(args[0]) {
            case "votein":
              message.channel.send({embed: {
                color:4360181,
                title: `Votein`,
                description: `Vote into any of four whitestar lists: vc, sos, allies, and fill.\n\nUse **${config.prefix}votein (vc, sos, allies, fill)** to vote in, and show the current list.`
              }})
            break;
            case "voteout":
              message.channel.send({embed: {
                color:4360181,
                title: `Voteout`,
                description: `Vote out of all white star lists,\nand displays the new list.`
              }})
            break;
            case "list":
              message.channel.send({embed: {
                color:4360181,
                title: "List",
                description: `Shows the vc, sos, rsvd, allies, and fill whitestar lists.\n\nUse **${config.prefix}list (vc, sos, rsvd, allies, fill, vc-ws, sos-ws, rsvd-ws, allies-ws, bomber, miner)** to check each corresponding list.\n\nYou can also use **${config.prefix}list count** to check how many members are in each list.`
              }})
            break;
            case "ping":
              message.channel.send({embed: {
                color:4360181,
                title: "Ping",
                description: `Displays the ping and api latency of the bot.`
              }})
            break;
            case "croid":
              message.channel.send({embed: {
                color:4360181,
                title: "Croid",
                description: `Use **${config.prefix}croid** to check your current croid cooldown.\n\nUse **${config.prefix}croid mined (time since your croid was mined, ex: 1h 30m)** to set when your croid was mined.\n\n**This feature is a work in progress, expect updates and changes soon.**`
              }})
            break;
            case "autoresponse":
              message.channel.send({embed: {
                color:4360181,
                title: "Autoresponse",
                description: `Use **${config.prefix}autoresponse create (trigger) (response)** to create an autoresponse or **${config.prefix}autoresponse create wildcard (trigger) (response)** to create one that can be in context (only one per person). \nUse **${config.prefix}autoresponse delete (trigger)** to delete your autoresponse.\nUse **${config.prefix}autoresponse list** to view all autoresponses.\n\n\n**${config.prefix}ar (create, delete, list)** is an alias.`,
              }})
            break;
            case "joinmessage":
              message.channel.send({embed: {
                color:4360181,
                title: "joinmessage",
                description: `Use **${config.prefix}joinmessage (message)** to modify the join message. {user} will be replaced with the user who joined.`,
              }})
            break;
            case "bomber":
                message.channel.send({embed: {
                    color:4360181,
                    title: "bomber",
                    description: `Use **${config.prefix}bomber <add/remove> (username)** to add/remove a user as a stealth bomber.`,
                  }})
            break;
            case "prefix":
              message.channel.send({embed: {
                color:4360181,
                title: "prefix",
                description: `Use **${config.prefix}prefix (new prefix)** to modify the global prefix.`,
              }})
            break;
            default:
              message.channel.send("This help page has not been created yet, or the command you entered doesn't exist!")
          }
    }
}