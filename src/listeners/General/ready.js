const { Listener } = require('@sapphire/framework');
const dotenv = require('dotenv');
dotenv.config();

class ReadyListener extends Listener {
  constructor(context, options) {
    super(context, {
      ...options,
      once: true,
      event: 'ready'
    });
  }

    async run(client) {
        const {username, id} = client.user;
        // Informe dans la console que le bot est connecté et prêt à fonctionner
        this.container.logger.info(`Connected as ${username} (${id})!`);

        client.user.setActivity('On progress', { type: 1, url: process.env.TWITCH_LINK }); // Type 1 is "Streaming
        client.user.setStatus('idle'); // Met le statut du bot sur "idle"


        // Trouve le nombre de serveurs auxquels le bot est connecté et l'affiche dans la console
        client.guilds.fetch().then(guilds => {
            this.container.logger.info(`Connected to ${guilds.size} guilds!`);
        }).catch(error => {
            this.container.logger.error('Error fetching guilds:', error);
        }
        );

        // Envoie un message dans le canal spécifié pour indiquer que le bot est prêt
        const channel = await client.channels.fetch(process.env.READY_CHANNEL_ID);
        if (channel) {
            await channel.send('Bot is ready!');
        } else {
            this.container.logger.error('Ready channel not found!');
        }

        // Envoie un message pour indiquer les nouvelles fonctionnalités du bot en lisant le fichier features.txt
        const featuresChannel = await client.channels.fetch(process.env.FEATURES_CHANNEL_ID);
        if (featuresChannel) {
            const fs = require('fs');
            fs.readFile('src/assets/txt/features.txt', 'utf8', (err, data) => {
                if (err) {
                    this.container.logger.error('Error reading features.txt:', err);
                    return;
                }
                const messageTime = Math.floor(Date.now() / 1000);
                featuresChannel.send(`# ❤️ Nouveauté d'Hina ❤️\n**Mise à jour <t:${messageTime}:R>**\n${data}`);
            });
        } else {
            this.container.logger.error('Salon des nouveautés désactivé ou introuvable!');
        }


    }
}
module.exports = {
  ReadyListener
};