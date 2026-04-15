// Commandes musique SapphireJS
const { Command, err } = require('@sapphire/framework');
const { time } = require('discord.js');

class MusicCommand extends Command {
  constructor(context, options) {
    super(context, { ...options });

  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder.setName('play')
        .setDescription('Joue une musique à partir d\'une URL ou d\'une recherche')
        .addStringOption(option => option
          .setName('query')
            .setDescription('URL ou terme de recherche')
            .setRequired(true)
        )
    );
  }

    async chatInputRun(interaction) { 
        const query = interaction.options.getString('query');
        const channel = interaction.member.voice.channel;

        //  Vérifier si l'utilisateur est dans un canal vocal
        if (!channel) {
            return interaction.reply({ content: 'Vous devez être dans un canal vocal pour utiliser cette commande!', ephemeral: true });
        }
        
        // Rechercher et jouer la musique
        await interaction.deferReply();
        
        await this.container.client.player.play(channel, query, {
            nodeOptions: {
                metadata: interaction
            }
        });

        try {
            await Promise.race([
                this.container.client.player.play(channel, query),
                time(15, 'seconds') // Timeout après 15 secondes
            ]);

            return interaction.followUp({ content: `🎶 Lecture: ${query}` });
        } catch (error) {
            console.error('Erreur lors de la lecture de la musique:', error);
            return interaction.followUp({ content: 'Une erreur est survenue lors de la lecture de la musique. Veuillez réessayer plus tard.' });
        }
    }

}

module.exports = {
  MusicCommand
};