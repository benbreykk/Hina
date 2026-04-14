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
        // Vérifie si l'utilisateur a rejoint un canal vocal
        if (!oldState.channelId && newState.channelId) {
            this.container.logger.info(`${newState.member.user.tag} a rejoint le canal vocal ${newState.channel.name}`);
        }
        // Vérifie si l'utilisateur a quitté un canal vocal
        else if (oldState.channelId && !newState.channelId) {
            this.container.logger.info(`${oldState.member.user.tag} a quitté le canal vocal ${oldState.channel.name}`);
        }

        // Vérifie si l'utilisateur a changé de canal vocal (ancien et nouveau canal sont différents)
        else if (oldState.channelId && newState.channelId && oldState.channelId !== newState.channelId) {
            this.container.logger.info(`${newState.member.user.tag} a changé de canal vocal: ${oldState.channel.name} -> ${newState.channel.name}`);
        }
        
    }
}


module.exports = {
  voiceStateUpdateListener
};
        
