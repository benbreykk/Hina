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

  fetchWaifu() {
      return fetch('https://api.waifu.pics/sfw/hug')
        .then(response => response.json())
        .then(data => data.url)
        .catch(error => {
          console.error('Error fetching waifu image:', error);
          throw new Error('Failed to fetch waifu image');
        });
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
    if (!target) {
      return interaction.reply({ content: 'Utilisateur introuvable.', ephemeral: true });
    }

    try {
        // Créer un embed avec le GIF de câlin
        if (target.id === interaction.user.id) {
          const embed = new EmbedBuilder()
            .setTitle(`🤗 Gros câlin pour ${interaction.member.displayName} `)
            .setImage(`${await this.fetchWaifu()}`);
          await interaction.reply({ embeds: [embed] });
        } else {
            const embed = new EmbedBuilder()
          .setTitle(`🤗 ${interaction.member.displayName} fait un câlin à ${target.displayName}! `)
          .setImage(`${await this.fetchWaifu()}`);
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
