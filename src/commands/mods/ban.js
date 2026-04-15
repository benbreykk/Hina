const { Command } = require('@sapphire/framework');
const { MessageFlags } = require('discord.js');

class BanCommand extends Command {
  constructor(context, options) {
    super(context, { ...options });
  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder.setName('ban')
        .setDescription('Banni un membre du serveur')
        .addUserOption(option => option
          .setName('target')
          .setDescription('Membre à bannir')
          .setRequired(true)
        )
    );
  }

  async chatInputRun(interaction) {
    const target = interaction.options.getUser('target');
    const db = this.container.client.db; // Assurez-vous que la connexion à la base de données est accessible via le client

     // Enregistrer le bannissement dans la base de données
     if (db) {
      const bans = db.collection('bans');
      await bans.insertOne({
        userId: target.id,
        username: target.tag,
        bannedAt: new Date(),
      });
      this.container.logger.info(`✅ Bannissement de ${target.tag} enregistré dans la base de données!`);
    } else {
      this.container.logger.error('Collection "bans" introuvable dans la base de données!');
    }

    if (!interaction.member.permissions.has('BAN_MEMBERS')) {
      return interaction.reply({ content: 'Tu n\'as pas la permission de bannir des membres.', ephemeral: true });
    }
    if (target.id === interaction.user.id) {
      return interaction.reply({ content: 'Tu ne peux pas te bannir toi-même. (idiot(e)🤣)', ephemeral: true });
    }

    const member = interaction.guild.members.cache.get(target.id);
    if (!member) {
      return interaction.reply({ content: 'Membre introuvable.', ephemeral: true });
    }

    try {
      await member.ban();
      await interaction.reply({ content: `${target.tag} a été banni du serveur.`, ephemeral: true });
    } catch (error) {
      console.error('Error banning member:', error);
      await interaction.reply({ content: 'Une erreur est survenue lors du bannissement du membre.', ephemeral: true });
    }
  }
}
module.exports = {
  BanCommand
};