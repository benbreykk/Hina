

const { Command } = require('@sapphire/framework');
const { EmbedBuilder} = require('discord.js');


class AvatarContextMenuCommand extends Command {
  constructor(context, options) {
    super(context, { ...options });
  }
  // Enregistrer la commande de menu contextuel
  registerApplicationCommands(registry) {
    registry.registerContextMenuCommand((builder) =>
      builder.setName('Avatar')
        .setType(2)
    );
  }

    async contextMenuRun(interaction) {
      const target = interaction.targetUser;
      const embed = new EmbedBuilder()
        .setTitle(`📷 Avatar de ${target.username}`)
        .setImage(target.displayAvatarURL({ dynamic: true, size: 512 }))
        .setFooter({ text: `Demandé par ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });
      await interaction.reply({ embeds: [embed] });
    }
}
module.exports = {
  AvatarContextMenuCommand
};
