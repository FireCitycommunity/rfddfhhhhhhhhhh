const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    let sicon = message.guild.displayAvatarURL;
    let serverembed = new Discord.RichEmbed()
      .setDescription("Server Information")
      .setColor("#ff0000")
      .setThumbnail(sicon)
      .addField("Server Name", message.guild.name)
      .addField("You Joined", message.guild.joinedAt)
      .addField("Total Members", message.guild.MemberCount);

    message.channel.send(serverembed);
}

module.exports.help = {
    name: "serverinfo"
}