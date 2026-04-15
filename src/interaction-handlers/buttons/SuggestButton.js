const { InteractionHandler, InteractionHandlerTypes } = require('@sapphire/framework');
const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

class SuggestButtonHandler extends InteractionHandler {
    constructor(ctx, options) {
        super(ctx, {
            ...options,
            interactionHandlerType: InteractionHandlerTypes.Button
        });
    }

    parse(interaction) {
        if (interaction.customId !== 'suggestBtn') return this.none();
        return this.some();
    }
    // Afficher le modal de suggestion lorsque le bouton est cliqué
    async run(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('suggest_modal')
            .setTitle('Suggestion');
        // Ajouter un champ de texte pour la suggestion
        const suggestionInput = new TextInputBuilder()
            .setCustomId('suggestion_input')
            .setLabel('Ta suggestion :')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

        const titleInput = new TextInputBuilder()
            .setCustomId('suggestion_title')
            .setLabel('Titre de la suggestion (optionnel) :')
            .setStyle(TextInputStyle.Short)
            .setRequired(false);
        
        const firstActionRow = new ActionRowBuilder().addComponents(suggestionInput);
        const secondActionRow = new ActionRowBuilder().addComponents(titleInput);

        modal.addComponents(firstActionRow, secondActionRow);

        await interaction.showModal(modal);
    }
  }

module.exports = {
    SuggestButtonHandler
};