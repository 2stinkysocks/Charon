# Charon

Charon is a multi-purpose Discord bot for the Society of Sin Gaming community. If you want to check it out or make some changes, see below!

## Installation

Make sure you have `npm` and `node js` installed on your system.

Head to https://discord.com/developers/applications and create an app. Name it whatever you like, then head to the bot tab on the left side. Click `Add Bot`, then click copy under `Click to Reveal Token`.

Cd into the root directory, and run `npm i`.

Create a new file inside of the root directory named `.env`, and inside write
```
BOT_TOKEN=paste token here
```

Then, head to the OAuth2 tab on the website, select the `bot` scope, give the bot permissions, then copy the link. Paste the link into a browser to invite the bot to a server.

Run `node bot.js` to start the bot.