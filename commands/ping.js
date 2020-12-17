module.exports = {
    name: 'ping',
    description: "Get the bot's ping",
    async execute(message, args, client){
        const m = await message.channel.send(`Waiting..`);
        message.channel.send(`Done! Latency is ${m.createdTimestamp - message.createdTimestamp}ms.`);
      	m.delete();
    }
}