const { Listener } = require('@sapphire/framework');
const dotenv = require('dotenv');
dotenv.config();

class guildMemberAddListener extends Listener {
  constructor(context, options) {
    super(context, {
      ...options,
      once: false,
      event: 'guildMemberAdd'
    });
  }

    async run(member) {
        member.guild.channels.cache.get(process.env.WELCOME_CHANNEL_ID)?.send({ 
            content: `Bienvenue ${member} sur le serveur !`, 
        });
        this.container.logger.info(`Member joined: ${member.user.tag}`);

        // Ignore les bots pour le comptage des membres
        if (member.user.bot) {
            this.container.logger.info(`Un bot (${member.user.tag}) a rejoint le serveur.`);
            return;
        }
        // Met à jour le compteur de membres dans la base de données
        const db = this.container.client.db; // Assurez-vous que la connexion à la base de données est accessible via le client
        const guilds = db.collection('guilds');
        if (guilds) {
            await guilds.updateOne(
                { guildId: member.guild.id },
                { $inc: { memberCount: 1 } }
            );
            this.container.logger.info(`✅ Compteur de membres mis à jour pour le serveur ${member.guild.name}!`);
        } else {
            this.container.logger.error('Collection "guilds" introuvable dans la base de données!');        
    }
  }
}


module.exports = {
  guildMemberAddListener
};
        
