const { SapphireClient, ApplicationCommandRegistries } = require('@sapphire/framework');
const { GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');

const { connectDB } = require('./database/db'); 
dotenv.config();

ApplicationCommandRegistries.setDefaultGuildIds([process.env.GUILD_ID]);

const client = new SapphireClient({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers],
    loadMessageCommandListeners: true,
    loadApplicationCommandRegistriesStatusListeners: true
 });

(async () => {
    const db = await connectDB(); // Connectez-vous à la base de données avant de démarrer le bot
    client.db = db; // Stockez la connexion à la base de données dans le client pour un accès facile dans les commandes et les listeners
    await client.login(process.env.BOT_TOKEN);
})();

// client.login(process.env.BOT_TOKEN);