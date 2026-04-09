const { InteractionHandler, InteractionHandlerTypes } = require('@sapphire/framework');
const { MessageFlags } = require('discord.js');

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

    async run(interaction) {
        await interaction.reply({ 
            content: 'Tu peux faire une confession anonyme dans le serveur en utilisant la commande /confess !', 
            ephemeral: true, 
            flags: MessageFlags.Ephemeral 
        });
    }
  }

module.exports = {
    ConfessButtonHandler
};