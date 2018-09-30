const Discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {
 
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You dont have the permissins `KICK_MEMBERS`");
    if(args[0] == "help"){
      message.reply("Usage: !kick <user> <reason>");
      return;
    }
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("I dont find the user");
    let kReason = args.join(" ").slice(22);
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You cannot kick this user, He have the permission `MANAGE_MESSAGES`");
 
    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Tiime", message.createdAt)
    .addField("Reason", kReason);
 
    let kickChannel = message.guild.channels.find(`name`, "🔇mutes🔇");
    if(!kickChannel) return message.channel.send("Can't find 🔇mutes🔇 channel.");
 
    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
}
 
module.exports.help = {
  name:"kick"
}