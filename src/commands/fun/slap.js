const { Command } = require('@sapphire/framework');
const fetch = require('node-fetch');
const { EmbedBuilder } = require('discord.js');
const dotenv = require('dotenv');
const { fetchError } = require('../../assets/msg/error.json');
dotenv.config();


class SlapCommand extends Command {
  constructor(context, options) {
    super(context, { ...options });
  }
  // Enregistrer la commande 
  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder.setName('slap')
        .setDescription('Donne un coup de poing à quelqu\'un')
        .addUserOption(option => option
            .setName('target')
            .setDescription('Utilisateur à qui donner un coup de poing')
            .setRequired(true)
        )
    );
  }

  async chatInputRun(interaction) {
    const target = interaction.options.getUser('target');

    try {
        // Récupérer un GIF de coup de poing aléatoire depuis l'API Giphy
        const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}&tag=animeslap`);
        const data = await response.json();
        // Créer un embed avec le GIF de coup de poing
        if (target.id === interaction.user.id) {
          const embed = new EmbedBuilder()
            .setTitle(`👋 ${interaction.user.username} se gifle lui-même! (idiot(e)) `)
            .setImage(`${data.data.images.original.url}`);
          await interaction.reply({ embeds: [embed] });
        } else {
            const embed = new EmbedBuilder()
          .setTitle(`👋 ${interaction.user.username} gifle ${target.username}! `)
          .setImage(`${data.data.images.original.url}`);
        await interaction.reply({ content: `<@${target.id}>`, embeds: [embed] });
        // Répondre à l'utilisateur avec le GIF de coup de poing

        }
      } 
      // Gérer les erreurs de l'API Giphy
      catch (error) {
        console.error('Error fetching slap gif:', error);
        // Utiliser le message d'erreur importé depuis le fichier JSON
        await interaction.reply(fetchError.replace('{action}', 'slap'));
      }
    }

  }
module.exports = {
  SlapCommand
};
