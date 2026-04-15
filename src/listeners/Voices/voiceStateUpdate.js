const { Listener } = require('@sapphire/framework');
const dotenv = require('dotenv');
dotenv.config();

class voiceStateUpdateListener extends Listener {
  constructor(context, options) {
    super(context, {
      ...options,
      once: false,
      event: 'voiceStateUpdate'
    });
  }

    async run(oldState, newState) {
        const voiceChannel = newState.channel || oldState.channel;
        if (!voiceChannel) return; // Si l'utilisateur n'est pas dans un canal vocal, ne rien faire
        const guild = voiceChannel.guild;
        const db = this.container.client.db;
        const guilds = db.collection('guilds');
        if (guilds) {
            const memberCount = voiceChannel.members.filter(member => !member.user.bot).size;
            await guilds.updateOne(
                { guildId: guild.id },
                { $set: { voiceChannelMemberCount: memberCount } }
            );
            this.container.logger.info(`✅ Compteur de membres dans les canaux vocaux mis à jour pour le serveur ${guild.name}!`);
        } else {
            this.container.logger.error('Collection "guilds" introuvable dans la base de données!');
        }
    }
}


module.exports = {
  voiceStateUpdateListener
};
        
