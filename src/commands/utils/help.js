const { Command } = require('@sapphire/framework');
const { EmbedBuilder } = require('discord.js');

class HelpCommand extends Command {
  constructor(context, options) {
    super(context, { ...options });
  }


  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder.setName('help')
    .setDescription('obtenir de l\'aide sur les commandes disponibles')
    );
  }
    async chatInputRun(interaction) {
        const embed = new EmbedBuilder()
        .setTitle('📖 Aide - Commandes disponibles'
        
        )
        .setDescription('Voici les commandes disponibles :')
        .addFields(
          { name: '/waifu', value: 'Affiche une image aléatoire de waifu' },
          { name: '/help', value: 'Affiche cette aide' }
        );
      await interaction.reply({ embeds: [embed] });
    }
}
module.exports = {
    HelpCommand
};