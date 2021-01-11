let questionActive = false;
require('dotenv').config()
const fs = require('fs');
const cron = require('node-cron');
const timestring = require('timestring'); //timestring(str, 'ms') turns 1h30m to ms
const Discord = require(`discord.js`);
const client = new Discord.Client();

const config = require(`./config.json`);
const croids = require(`./croids.json`);
const autoresponses = require(`./autoresponses.json`);
const rsq = require(`./rsq.json`);
const recurringVoters = require(`./recurringVoters.json`);
const bannedAutoVoters = require(`./bannedAutoVoters.json`);
const obols = require(`./obols.json`);
const triviaquestions = require(`./triviaquestions.json`);
const trivia = require(`./trivia`);

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
  cron.schedule('30 20 * * monday', () => {
    Object.keys(recurringVoters.users).forEach(value => {
        var guild = client.guilds.cache.get('640692199557955587');
        var listRole = guild.roles.cache.find(role => role.name === recurringVoters.users[value] + " list");
        guild.members.cache.get(value).roles.add(listRole);
        var random = Math.round(Math.random() * 2); // number to multiply by is 0 - that number
        switch(random) {
           case 0:
               guild.members.cache.get(value).send(`It’s time again to battle those that would oppose us! Make them pay for their insolence!\n\nYou have been enlisted into this week's ${recurringVoters.users[value]} White Star!\n\nThe Society thanks you for your continued service! O7~:skull_crossbones:\n\n(In the future, if you want to disable this, you can use **-autovote disable**)`, {files: ['https://cdn.discordapp.com/attachments/640704506014728204/767109348806623252/image0.gif']}).catch(()=>{});
           break;
           case 1:
               guild.members.cache.get(value).send(`Gentlemen, it’s time to polish off that whiskey, finish that last smoke and climb in that rig. We’re taking flight once again to thwart our enemies from stealing what’s rightfully ours!\n\nThe Society appreciates your continued support against all foes!\n\n“You tell him I’m coming! I’m coming and Hell’s coming with me!” ~ Wyatt Earp\n\n:tumbler_glass: ~ :skull_crossbones:\n\n-autovote disable (to turn off autovote)`, {files: ['https://cdn.discordapp.com/attachments/640704506014728204/775442236909420634/image0.png']}).catch(()=>{});
           break;
           case 2:
               guild.members.cache.get(value).send(`Cry Havoc and let slip the Dogs of War!!\n\nFollow me and The DoomSwitch XIII into battle once again!! Let us make our enemies fear the sight of us!\n\nWhite Star scans begin this coming Saturday and you have been automatically enlisted!\n\nWe thank you for your service! Climb aboard your rig, name it, and get ready for a bumpy ride...\n\n:beers:~ :skull_crossbones:\n\n“You take a boat in the air that you don't love, she'll shake you off just as sure as the turning of the worlds. Love keeps her in the air when she oughta fall down, tells you she's hurtin' 'fore she keens. Makes her a home.” ~ Malcolm Reynolds Serenity`, {files: ['https://cdn.discordapp.com/attachments/640704506014728204/778272737470185522/image0.jpg']}).catch(()=>{});
           break;   
        }
    });
  });
  
  //daily random obol
  cron.schedule('30 20 * * *', () => {
    client.commands.get('obolslottery').execute(null, client.guilds.cache.get('640692199557955587').channels.cache.find(channel => channel.name === "general"), obols, fs, client, Discord, true);
  });
});

client.on(`guildCreate`, guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

client.on(`guildDelete`, guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});


client.on(`guildMemberAdd`, member => {
  var general = client.channels.cache.find(channel => channel.name == "general");
  var actualMessage = config.welcomemsg.replace('{user}', member.toString());
  general.send(actualMessage);
  questionActive = true;
  trivia.execute(client.guilds.cache.get('640692199557955587').channels.cache.get('640692199557955591'), triviaquestions, Discord, obols, fs, client).then(() => {
        questionActive = false;
  });
});

client.on(`guildMemberRemove`, member => {
  var general = client.channels.cache.find(channel => channel.name == "general");
  general.send(`**_${member.displayName} has left._**`)
});


client.on(`message`, async message => {
    if(message.author.bot) return;
    
    //trivia
    var triviarandom = Math.floor(Math.random()*14);
    if(((triviarandom == 0 && message.channel.name == "general" && !questionActive) || (message.author.id == '417439359868862465' && message.content == "triggertrivia" && message.channel.name == "general")) && !message.content.startsWith(config.prefix)) { // MAKE IT SO THAT THIS CAN'T TRIGGER DURING A QUESTION
        if(message.author.id == '417439359868862465' && message.content == "triggertrivia") setTimeout(function(){message.delete()}, 1000);
        questionActive = true;
        trivia.execute(message.channel, triviaquestions, Discord, obols, fs, client).then(() => {
            questionActive = false;
        });
    }

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
    if((message.mentions.users.has(client.user) || message.content.includes("714199666538840114")) && message.content.includes("?") && (message.content.toLowerCase().includes("who") || message.content.toLowerCase().includes("what") || message.content.toLowerCase().includes("when") || message.content.toLowerCase().includes("where") || message.content.toLowerCase().includes("why") || message.content.toLowerCase().includes("how") || message.content.toLowerCase().includes("can"))) {
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
        client.commands.get('autovote').execute(message, args, fs, recurringVoters, bannedAutoVoters, client);
    }
    if(command === "getdata") {
        client.commands.get('getdata').execute(message, args, fs);
    }
    if(command === "charon") {
        client.commands.get('charon').execute(message, obols, Discord, client);
    }
    if(command === "obols") {
        client.commands.get('obols').execute(message, args, obols, Discord);
    }
    if(command === "giveobols") {
        client.commands.get('giveobols').execute(message, args, obols, fs, Discord);
    }
    if(command === "takeobols") {
        client.commands.get('takeobols').execute(message, args, obols, fs, Discord);
    }
    if(command === "addquestion" || command === "aq") {
        client.commands.get('addquestion').execute(message, triviaquestions, fs, config);
    }
    if(command === "deletequestion") {
        client.commands.get('deletequestion').execute(message, triviaquestions, fs);
    }
    if(command === "giftobols") {
	    client.commands.get('giftobols').execute(message, args, obols, fs, Discord, client);
    }
    if(command === "obolslottery") {
        client.commands.get('obolslottery').execute(message, message.channel, obols, fs, client, Discord, false);
    }
    if(command === "gamble") {
        client.commands.get('gamble').execute(message, args, Discord, obols, fs, client).then(() => {questionActive = false});
    }

});
client.login(process.env.BOT_TOKEN)