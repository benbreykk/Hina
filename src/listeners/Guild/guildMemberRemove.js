const { Listener } = require('@sapphire/framework');
const dotenv = require('dotenv');
dotenv.config();

class guildMemberRemoveListener extends Listener {
  constructor(context, options) {
    super(context, {
      ...options,
      once: false,
      event: 'guildMemberRemove'
    });
  }

    async run(member) {
        member.guild.channels.cache.get(process.env.WELCOME_CHANNEL_ID)?.send({ 
            content: `Au revoir ${member} !`, 
        });

        this.container.logger.info(`Member left: ${member.user.tag}`);
    }
}


module.exports = {
  guildMemberRemoveListener
};
        
