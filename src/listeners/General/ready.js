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
        this.container.logger.info(`Connected as ${username} (${id})!`);

        client.user.setActivity('Love You', { type: 1, url: process.env.TWITCH_LINK }); // Type 1 is "Streaming

        
    }
}
module.exports = {
  ReadyListener
};