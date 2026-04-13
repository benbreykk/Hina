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
    }
}


module.exports = {
  guildMemberAddListener
};
        
