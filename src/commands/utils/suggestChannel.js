// src/commands/utils/suggestChannel.js

// Commande pour créer un salon de suggestions
// Un message en embed avec un bouton pour suggérer des idées, et un autre pour voir les suggestions déjà faites
// Créer directement un fil de discussion pour chaque suggestion, avec un système de vote (thumbs up/down) pour les suggestions
const { Command } = require('@sapphire/framework');

const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

class SuggestChannelCommand extends Command {
  constructor(context, options) {
    super(context, { ...options });
  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder.setName('suggestchannel').setDescription('Créer un salon de suggestions')
    );
  }

  async chatInputRun(interaction) {
     // Vérifie si l'utilisateur a les permissions nécessaires pour créer un salon
     if (!interaction.member.permissions.has('ADMINISTRATOR')) {
        return interaction.reply({content: 'Vous n\'avez pas la permission d\'utiliser cette commande.', ephemeral: true});
     }

        // récupère l'id du salon de suggestions 
        const suggestChannelId = process.env.SUGGEST_CHANNEL_ID;
        const suggestChannel = interaction.guild.channels.cache.get(suggestChannelId);
                // Envoie un message dans le salon de suggestions pour indiquer que le salon a été créé
        const embed = new EmbedBuilder()
            .setTitle('Suggestions')
            .setDescription('Utilisez les boutons ci-dessous pour suggérer des idées ou voir les suggestions déjà faites.')
            .setColor('#00FF00');
        

        // Créer les boutons pour suggérer des idées et voir les suggestions
         const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('suggestBtn')
                    .setLabel('Suggérer une idée')
                    .setStyle(ButtonStyle.Primary)
            );
            // Ajouter un bouton pour voir les suggestions déjà faites
        await suggestChannel.send({ embeds: [embed], components: [row] });
       

  }
}
module.exports = {
  SuggestChannelCommand
};