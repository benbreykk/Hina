const { Listener } = require('@sapphire/framework');
const dotenv = require('dotenv');
dotenv.config();

module.exports = class guildCreateListener extends Listener {
  constructor(context, options) {
    super(context, {
        ...options,
        once: false,
        event: 'guildCreate'
    });
  }

  async run(guild) {
    this.container.logger.info(`Serveur rejoint: ${guild.name} (ID: ${guild.id})`);

    // Envoie un message de bienvenue dans le canal général du serveur
    const defaultChannel = guild.channels.cache.find(channel => channel.type === 0 && channel.permissionsFor(guild.members.me).has('SendMessages'));
    if (defaultChannel) {
        defaultChannel.send(`Entre confession et suggestions, je suis là pour vous ! ❤️`);
    }


    // Enregistrer le serveur dans la base de données
    const db = this.container.client.db; // Assurez-vous que la connexion à la base de données est accessible via le client
    const guilds = db.collection('guilds');

    if (guilds) {
        await guilds.updateOne(
            { guildId: guild.id },
            {
                $setOnInsert: {
                    guildId: guild.id,
                    name: guild.name,
                    joinedAt: new Date(),
                }
            },
            { upsert: true }
        );
        this.container.logger.info(`✅ Serveur ${guild.name} enregistré dans la base de données!`);
    } else {
        this.container.logger.error('Collection "guilds" introuvable dans la base de données!');
            }
  }

}