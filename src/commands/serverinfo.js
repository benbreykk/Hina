const { Command } = require('@sapphire/framework');
const { MessageFlags } = require('discord.js');

class ServerInfoCommand extends Command {
  constructor(context, options) {
    super(context, { ...options });
  }


  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder.setName('serverinfo').setDescription('Get information about the server')
    );

  }

  async chatInputRun(interaction) {
    const { guild } = interaction;
    if (!guild) {
      return interaction.reply({
        content: 'This command can only be used in a server.',
        flags: MessageFlags.Ephemeral
      });
    }
    
    const { name, memberCount, createdAt } = guild;
    const info = `Server Name: ${name}\nMember Count: ${memberCount}\nCreated At: ${createdAt.toDateString()}`;
    return interaction.reply({ content: info });

    }
}
module.exports = {
    ServerInfoCommand
};