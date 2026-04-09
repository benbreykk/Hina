
const { Command } = require('@sapphire/framework');
const fetch = require('node-fetch');
const { EmbedBuilder, Application } = require('discord.js');
const dotenv = require('dotenv');
const { fetchError } = require('../../assets/msg/error.json');
dotenv.config();


class KissContextMenuCommand extends Command {
  constructor(context, options) {
    super(context, { ...options });
  }
  // Enregistrer la commande de menu contextuel
  registerApplicationCommands(registry) {
    registry.registerContextMenuCommand((builder) =>
      builder.setName('Kiss')
        .setType(2)
    );
  }
  // Méthode pour récupérer une image de bisou depuis l'API waifu.pics
  fetchWaifu() {
      return fetch('https://api.waifu.pics/sfw/kiss')
        .then(response => response.json())
        .then(data => data.url)
        .catch(error => {
          console.error('Error fetching waifu image:', error);
          throw new Error('Failed to fetch waifu image');
        });
      }
    async contextMenuRun(interaction) {
    const target = interaction.targetMember || interaction.targetUser;

    try {
        // Créer un embed avec le GIF de câlin
        if (target.id === interaction.user.id) {
          const embed = new EmbedBuilder()
            .setTitle(`${interaction.member.displayName} s\'embrasse lui-même 😘 (ça va l'égo ?) `)
            .setImage(`${await this.fetchWaifu()}`);
          await interaction.reply({ embeds: [embed] });
        } else {
            const embed = new EmbedBuilder()
          .setTitle(`${interaction.member.displayName} embrasse ${target.displayName}! 😘`)
          .setImage(`${await this.fetchWaifu()}`);
        await interaction.reply({ content: `<@${target.id}>`, embeds: [embed] });
        // Répondre à l'utilisateur avec le GIF de bisou

        }
      } 
      // Gérer les erreurs de l'API Giphy
      catch (error) {
        console.error('Error fetching kiss gif:', error);
        await interaction.reply(fetchError.replace('{action}', 'kiss'));
      }
    }
}
module.exports = {
  KissContextMenuCommand
};
