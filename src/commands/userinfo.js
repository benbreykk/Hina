const { Command } = require('@sapphire/framework');
const { MessageFlags, EmbedBuilder } = require('discord.js');

class UserInfoCommand extends Command {
  constructor(context, options) {
    super(context, { ...options });
  }


  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder.setName('userinfo')
    .setDescription('Get information about a user')
    .addUserOption(option => option.setName('target')
    .setDescription('The user to get information about').setRequired(false))
    );
  }
    async chatInputRun(interaction) {
      const user = interaction.options.getUser('target') || interaction.user;
      const embed = new EmbedBuilder()
        .setTitle('Information d\'utilisateur')
        .setColor(0x00AE86)
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .addFields(
          { name: 'Nom d\'utilisateur', value: user.username, inline: true },
          { name: 'ID', value: user.id, inline: true },
          { name: 'Crée le', value: `${user.createdAt.toDateString()}`, inline: true }
        );
      return interaction.reply({ embeds: [embed] });
    }
}
module.exports = {
    UserInfoCommand
};