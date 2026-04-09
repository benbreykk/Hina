
const { Command } = require('@sapphire/framework');
const fetch = require('node-fetch');
const { EmbedBuilder, Application } = require('discord.js');
const dotenv = require('dotenv');
const { fetchError } = require('../../assets/msg/error.json');
dotenv.config();


class SlapContextMenuCommand extends Command {
  constructor(context, options) {
    super(context, { ...options });
  }
  // Enregistrer la commande de menu contextuel
  registerApplicationCommands(registry) {
    registry.registerContextMenuCommand((builder) =>
      builder.setName('Slap')
        .setType(2)
    );
  }

    async contextMenuRun(interaction) {
    const target = interaction.targetUser;

    try {
        // Récupérer un GIF de gifle aléatoire depuis l'API Giphy
        const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}&tag=animeslap`);
        const data = await response.json();
        // Créer un embed avec le GIF de gifle
        if (target.id === interaction.user.id) {
          const embed = new EmbedBuilder()
            .setTitle(`👋 Grosse gifle pour ${interaction.user.username}`)
            .setImage(`${data.data.images.original.url}`);
          await interaction.reply({ embeds: [embed] });
        } else {
            const embed = new EmbedBuilder()
          .setTitle(`👋${interaction.user.username} gifle à ${target.username}! `)
          .setImage(`${data.data.images.original.url}`);
        await interaction.reply({ content: `<@${target.id}>`, embeds: [embed] });
        // Répondre à l'utilisateur avec le GIF de gifle

        }
      } 
      // Gérer les erreurs de l'API Giphy
      catch (error) {
        console.error('Error fetching slap gif:', error);
        await interaction.reply(fetchError.replace('{action}', 'slap'));
      }
    }
}
module.exports = {
  SlapContextMenuCommand
};
