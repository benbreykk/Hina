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
      // Récupérer les commandes disponibles et les formater pour l'affichage
      const commands = interaction.client.application.commands.cache;
      // Boucle pour formater les commandes et leurs descriptions
      const commandList = commands.map(cmd => `**/${cmd.name}**: ${cmd.description}`).join('\n');
      // Filtrer les commandes pour n'afficher que celles qui sont pertinentes pour l'utilisateur
      const filteredCommandList = commandList; // Vous pouvez ajouter une logique de filtrage ici si nécessaire
      
            // Créer un embed pour afficher les commandes disponibles
        const embed = new EmbedBuilder()
        .setTitle('📖 Aide - Commandes disponibles'
        
        )
        .setDescription(filteredCommandList)
        .setColor('#00FF00')
        .setFooter({ text: 'Utilisez /help pour plus de détails sur une commande spécifique.' });
      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
}
module.exports = {
    HelpCommand
};