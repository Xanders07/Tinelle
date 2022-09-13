const { MessageEmbed, MessageAttachment } = require("discord.js");

module.exports = {    
    name: 'votes',
    description: `Pour l'affichage des votes`,
    async execute(client, message, args) {  
      // C'est le serveur token
        let servToken = '12GK4QC3LH6S';

        const fetch = require('node-fetch');

        try {
            const response = await fetch(
              `https://api.top-serveurs.net/v1/servers/${servToken}/players-ranking`,
            );
            const data = await response.json();
                
            if (!data.players.length) {
              return message.channel.send(`Aucun votes en cours`);
            } else {

                let arrayFilter = new Array();

                data.players.forEach((playersVote) => {
                
                    if (playersVote.playername && !arrayFilter.includes(playersVote.playername)) {
                        arrayFilter.push(playersVote.playername);

                        args.push(playersVote.playername + ' - ' + playersVote.votes + ' Votes' + '\n');

                    }

                    if (args.length + 1 === 50) {
                        
                        const embed = new MessageEmbed()
                        .setColor("RED")
                        .setTitle("Liste des votes \n")
                        .addField("\n Bande de clampins !" , '\n' + args.join(" "))
                        .setTimestamp();
                    
                        message.channel.send(embed);  

                    } else if (args.length + 1 > 50) {
                      return;
                    }
                });

            }
            

          } catch (error) {
            message.channel.send(`Une erreur s'est déclenché avec l'API`);
            // console.log(error);
          }
    
    }
  
}