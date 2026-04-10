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

        const firstActionRow = new ActionRowBuilder().addComponents(suggestionInput);

        modal.addComponents(firstActionRow);

        await interaction.showModal(modal);
    }
  }

module.exports = {
    SuggestButtonHandler
};