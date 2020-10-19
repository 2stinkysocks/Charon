require('dotenv').config()
const fs = require('fs');
const timestring = require('timestring'); //timestring(str, 'ms') turns 1h30m to ms
const Discord = require(`discord.js`);
const client = new Discord.Client();

const config = require(`./config.json`);
const croids = require(`./croids.json`);
const autoresponses = require(`./autoresponses.json`);
const rsq = require(`./rsq.json`);
const recurringVoters = require(`./recurringVoters.json`); // -votein sos -r enable, -votein sos -r disable

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}
// handles error that causes shutdown on wifi outage
client.on('error', error => {
  console.error('The WebSocket encountered an error:', error);
});

client.on(`ready`, () => {
  console.log(`Bot has started.`); 
  client.user.setActivity(`you enlist! | -help`, { type : 'WATCHING'});

  // autovote
  setInterval(() => {
    var date = new Date(); 
    if(date.getUTCHours() === 19 && date.getUTCMinutes() === 5 && date.getUTCDay() === 1){
        Object.keys(recurringVoters.users).forEach(value => {
             var guild = client.guilds.get('640692199557955587');
             var listRole = guild.roles.find(role => role.name === recurringVoters.users[value] + " list");
             guild.members.get(value).addRole(listRole);
             guild.members.get(value).send(`It’s time again to battle those that would oppose us! Make them pay for their insolence!\n\nYou have been enlisted into this weeks White Star!\n\nThe Society thanks you for your continued service! O7~:skull_crossbones:\n\n(In the future, if you want to disable this, you can use **-autovote disable**)`, {files: ['https://cdn.discordapp.com/attachments/640704506014728204/767109348806623252/image0.gif']});
         });
    }
  }, 60000);
});

client.on(`guildCreate`, guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

client.on(`guildDelete`, guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});


client.on(`guildMemberAdd`, member => {
  var general = client.channels.find(channel => channel.name == "general");
  var actualMessage = config.welcomemsg.replace('{user}', member.toString());
  general.send(actualMessage);
});

client.on(`guildMemberRemove`, member => {
  var general = client.channels.find(channel => channel.name == "general");
  general.send(`**_${member.displayName} has left._**`)
});

client.on(`message`, async message => {
    if(message.author.bot) return;

    // autoresponses
    Object.keys(autoresponses).forEach(function(response){
        if(autoresponses[response].wildcard) {
        if(message.content.includes(response) && !message.content.startsWith(`${config.prefix}ar delete`)) {
            message.channel.send(autoresponses[response].response + " ");
            return;
        }
        }
        if(message.content.startsWith(response)) {
        message.channel.send(autoresponses[response].response + " ");
        }
    })                                                              // charon role \/
    if((message.isMemberMentioned(client.user) || message.content.includes("714199666538840114")) && message.content.includes("?") && (message.content.toLowerCase().includes("who") || message.content.toLowerCase().includes("what") || message.content.toLowerCase().includes("when") || message.content.toLowerCase().includes("where") || message.content.toLowerCase().includes("why") || message.content.toLowerCase().includes("how") || message.content.toLowerCase().includes("can"))) {
        message.channel.send("I can't answer that! I'm not an AI..\n\n..yet")
    }

    if(message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === "ping") {
        client.commands.get('ping').execute(message, args, client);
    }
    if(command === "joinmessage") {
        client.commands.get('joinmessage').execute(message, args, config, fs);
    }
    if(command === "bomber") {
        client.commands.get('bomber').execute(message, args);
    }
    if(command === "prefix") {
        client.commands.get('prefix').execute(message, args, config, fs);
    }
    if(command === "autoresponse" || command === "ar") {
        client.commands.get('autoresponse').execute(message, args, autoresponses, config, fs, client);
    }
    if(command === "votein") {
        client.commands.get('votein').execute(message, args);
    }
    if(command === "voteout") {
        client.commands.get('voteout').execute(message, args, client.commands.get('votein').oneListOnly);
    }
    if(command === "list") {
        client.commands.get('list').execute(message, args, client.commands.get('votein').oneListOnly);
    }
    if(command === "croid") {
        client.commands.get('croid').execute(message, args, croids, timestring, fs);
    }
    if(command === "help") {
        client.commands.get('help').execute(message, args, config);
    }
    if(command === "sendembed") {
        client.commands.get('sendembed').execute(message, args);
    }
    if(command === "miner") {
        client.commands.get('miner').execute(message, args);
    }
    if(command === "security") {
        client.commands.get('security').execute(message, args);
    }
    if(command === "autovote") {
        client.commands.get('autovote').execute(message, args, fs, recurringVoters);
    }

});
client.login(process.env.BOT_TOKEN)