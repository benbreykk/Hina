const { Command } = require('@sapphire/framework');
const fetch = require('node-fetch');
const { EmbedBuilder } = require('discord.js');
const dotenv = require('dotenv');
// Importer le message d'erreur depuis le fichier JSON
const { fetchError } = require('../../assets/msg/error.json');
dotenv.config();


class HugCommand extends Command {
  constructor(context, options) {
    super(context, { ...options });
  }
  // Enregistrer la commande
  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder.setName('hug')
        .setDescription('Fais un câlin à quelqu\'un')
        .addUserOption(option => option
            .setName('target')
            .setDescription('Utilisateur à qui faire un câlin')
            .setRequired(true)
        )
    );
  }

  async chatInputRun(interaction) {
    const target = interaction.options.getUser('target');

    try {
        // Récupérer un GIF de câlin aléatoire depuis l'API Giphy
        const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}&tag=anime+hug`);
        const data = await response.json();
        // Créer un embed avec le GIF de câlin
        if (target.id === interaction.user.id) {
          const embed = new EmbedBuilder()
            .setTitle(`🤗 Gros câlin pour ${interaction.user.username} `)
            .setImage(`${data.data.images.original.url}`);
          await interaction.reply({ embeds: [embed] });
        } else {
            const embed = new EmbedBuilder()
          .setTitle(`🤗 ${interaction.user.username} fait un câlin à ${target.username}! `)
          .setImage(`${data.data.images.original.url}`);
        await interaction.reply({ content: `<@${target.id}>`, embeds: [embed] });
        // Répondre à l'utilisateur avec le GIF de câlin

        }
      } 
      // Gérer les erreurs de l'API Giphy
      catch (error) {
        console.error('Error fetching hug gif:', error);
        // Utiliser le message d'erreur importé depuis le fichier JSON
        await interaction.reply(fetchError.replace('{action}', 'hug'));
      }
    }

  }
module.exports = {
  HugCommand
};
