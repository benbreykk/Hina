const { Client, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent
] 
});

client.once(Events.ClientReady, () => {
    console.log(`Connecté à ${client.user.tag}`);
});

client.login(process.env.DISCORD_BOT_TOKEN); 