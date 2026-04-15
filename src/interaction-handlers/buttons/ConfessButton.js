const { InteractionHandler, InteractionHandlerTypes } = require('@sapphire/framework');
const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

class ConfessButtonHandler extends InteractionHandler {
    constructor(ctx, options) {
        super(ctx, {
            ...options,
            interactionHandlerType: InteractionHandlerTypes.Button
        });
    }

    parse(interaction) {
        if (interaction.customId !== 'confess_button') return this.none();
        return this.some();
    }
    // Afficher le modal de confession lorsque le bouton est cliqué
    async run(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('confess_modal')
            .setTitle('Confession Anonyme');
        // Ajouter un champ de texte pour la confession
        const confessionInput = new TextInputBuilder()
            .setCustomId('confession_input')
            .setLabel('Ta confession :')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

        const firstActionRow = new ActionRowBuilder().addComponents(confessionInput);

        modal.addComponents(firstActionRow);

        await interaction.showModal(modal);
    }
  }

module.exports = {
    ConfessButtonHandler
};