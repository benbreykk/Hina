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
        // Ajouter // pour désactiver la fonctionnalité de message de nouveautés, et enlever les // pour l'activer

       /* 
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
        */

        // 
        // Fin de la feature de message de nouveautés
        // Ajout des membres du serveur de test dans la base de données
        const guild = await client.guilds.fetch(process.env.GUILD_ID);

        const db = client.db; // Assurez-vous que la connexion à la base de données est disponible
        const users = db.collection('users');

        if (!guild) {
            this.container.logger.error('Serveur introuvable pour l\'ajout des membres à la base de données!');
            return;
        }
        
        if (users) {
            const members = await guild.members.fetch(); // Récupère tous les membres du serveur

            let count = 0;
            for (const member of guild.members.cache.values()) {
                if (member.user.bot) continue; // Ignore les bots

                await users.updateOne(
                    { userId: member.id },
                    {
                        $setOnInsert: {
                            userId: member.id,
                            username: member.user.username,
                            createdAt: new Date(),
                    }
                },
                    { upsert: true }
                );
                count++;
            }

            this.container.logger.info(`✅ ${count} membres ajoutés à la base de données!`);
        
        }

    }
}
module.exports = {
  ReadyListener
};