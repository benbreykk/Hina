
const { Command } = require('@sapphire/framework');
const fetch = require('node-fetch');
const { EmbedBuilder, Application } = require('discord.js');
const dotenv = require('dotenv');
const { client } = require('tenorjs');
dotenv.config();


class HugContextMenuCommand extends Command {
  constructor(context, options) {
    super(context, { ...options });
  }

  registerApplicationCommands(registry) {
    registry.registerContextMenuCommand((builder) =>
      builder.setName('Hug')
        .setType(2)
    );
  }

    async contextMenuRun(interaction) {
    const target = interaction.targetUser;

    try {
        // Récupérer un GIF de câlin aléatoire depuis l'API Giphy
        const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}&tag=animehug&rating=pg`);
        const data = await response.json();
        // Créer un embed avec le GIF de câlin
        if (target.id === interaction.user.id) {
          const embed = new EmbedBuilder()
            .setTitle(`Gros câlin pour ${interaction.user.username} 🤗`)
            .setImage(`${data.data.images.original.url}`);
          await interaction.reply({ embeds: [embed] });
        } else {
            const embed = new EmbedBuilder()
          .setTitle(`${interaction.user.username} fait un câlin à ${target.username}! 🤗`)
          .setImage(`${data.data.images.original.url}`);
        await interaction.reply({ content: `<@${target.id}>`, embeds: [embed] });
        // Répondre à l'utilisateur avec le GIF de câlin

        }
      } 
      // Gérer les erreurs de l'API Giphy
      catch (error) {
        console.error('Error fetching hug gif:', error);
        await interaction.reply('Sorry, I couldn\'t fetch a hug gif right now.');   
    }
}
}
module.exports = {
  HugContextMenuCommand
};
