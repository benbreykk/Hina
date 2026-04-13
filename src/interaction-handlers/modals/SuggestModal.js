const { InteractionHandler, InteractionHandlerTypes } = require('@sapphire/framework');
const { EmbedBuilder, ButtonBuilder } = require('discord.js');

class SuggestModalHandler extends InteractionHandler {
    constructor(ctx, options) {
        super(ctx, {
            ...options,
            interactionHandlerType: InteractionHandlerTypes.ModalSubmit
        });
    }

    parse(interaction) {
        if (interaction.customId !== 'suggest_modal') return this.none();
        return this.some();
    }

    async run(interaction) {
        const title = interaction.fields.getTextInputValue('suggestion_title');
        const suggestion = interaction.fields.getTextInputValue('suggestion_input');

        const embed = new EmbedBuilder()
            .setTitle(title || 'Nouvelle suggestion')
            .setDescription(suggestion)
            .setColor('#FF69B4')
            .setFooter({ text: `Suggestion de ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();

        // récupérer le salon de suggestions à partir du bouton cliqué
        const suggestChannelId = process.env.SUGGEST_CHANNEL_ID;
        const suggestChannel = interaction.guild.channels.cache.get(suggestChannelId);
        if (!suggestChannel) {
            return interaction.reply({ content: 'Le salon de suggestions est introuvable.', ephemeral: true });
        }
        await suggestChannel.send({ embeds: [embed] });
        await interaction.reply({ content: 'Merci pour ta suggestion ! Elle a été envoyée au salon de suggestions.', ephemeral: true });


    }
}

module.exports = {
    SuggestModalHandler
};