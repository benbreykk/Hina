const { InteractionHandler, InteractionHandlerTypes } = require('@sapphire/framework');
const { EmbedBuilder, ButtonBuilder } = require('discord.js');

class ConfessModalHandler extends InteractionHandler {
    constructor(ctx, options) {
        super(ctx, {
            ...options,
            interactionHandlerType: InteractionHandlerTypes.ModalSubmit
        });
    }

    parse(interaction) {
        if (interaction.customId !== 'confess_modal') return this.none();
        return this.some();
    }

    async run(interaction) {
        // Récupérer la confession depuis le modal
        const confession = interaction.fields.getTextInputValue('confession_input');

        // Créer un bouton pour répondre à la confession
        const button = new ButtonBuilder()
              .setCustomId('confess_button')
              .setLabel('Faire ma confession')
              .setStyle(1);

        const embed = new EmbedBuilder()
            .setTitle('Nouvelle confession')
            .setDescription(confession)
            .setColor('#FF69B4')
            .setFooter({ text: 'Utilisateur anonyme' })
            .setTimestamp();


        // Envoyer le message de confession dans un salon spécifique
        const confessionChannel = interaction.guild.channels.cache.get(process.env.CONFESS_CHANNEL_ID);
        const response = await confessionChannel.send({ embeds: [embed], components: [{ type: 1, components: [button] }] });
        // Créer un thread pour discuter de la confession
        const thead = await confessionChannel.threads.create({
            name: `Discussion de la confession`,
            autoArchiveDuration: 60,
            reason: 'Discussion pour la confession',
        });
        thead.send({ content: `Discussion pour la confession : ${confession}` });


        await interaction.reply({ content: 'Confession envoyée !', ephemeral: true });
    }
}

module.exports = {
    ConfessModalHandler
};