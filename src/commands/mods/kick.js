const { Command } = require('@sapphire/framework');
const { MessageFlags } = require('discord.js');

class KickCommand extends Command {
  constructor(context, options) {
    super(context, { ...options });
  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder.setName('kick')
        .setDescription('Renvoie un membre du serveur')
        .addUserOption(option => option
          .setName('target')
          .setDescription('Membre à renvoyer')
          .setRequired(true)
        )
    );
  }

  async chatInputRun(interaction) {
    const target = interaction.options.getUser('target');

    if (!interaction.member.permissions.has('KICK_MEMBERS')) {
      return interaction.reply({ content: 'Tu n\'as pas la permission de renvoyer des membres.', ephemeral: true });
    }
    if (target.id === interaction.user.id) {
      return interaction.reply({ content: 'Tu ne peux pas te renvoyer toi-même. (idiot(e)🤣)', ephemeral: true });
    }

    const member = interaction.guild.members.cache.get(target.id);
    if (!member) {
      return interaction.reply({ content: 'Membre introuvable.', ephemeral: true });
    }

    try {
      await member.kick();
      await interaction.reply({ content: `${target.tag} a été renvoyé du serveur.`, ephemeral: true });
    } catch (error) {
      console.error('Error kicking member:', error);
      await interaction.reply({ content: 'Une erreur est survenue lors du renvoi du membre.', ephemeral: true });
    }
  }
}
module.exports = {
  KickCommand
};