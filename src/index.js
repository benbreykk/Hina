const { SapphireClient, ApplicationCommandRegistries } = require('@sapphire/framework');
const { GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

ApplicationCommandRegistries.setDefaultGuildIds([process.env.GUILD_ID]);

const client = new SapphireClient({ intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent, 
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates
    ],
    loadMessageCommandListeners: true,
    loadApplicationCommandRegistriesStatusListeners: true
 });

client.login(process.env.BOT_TOKEN);
