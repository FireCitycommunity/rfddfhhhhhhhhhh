const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.delete();
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You dont have permission `BAN_MEMBERS`");
    if(args[0] == "help"){
      message.reply("Usage: !ban <user> <reason>");
      return;
    }
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("I cannot find this user");
    if(bUser.id === bot.user.id) return message.channel.send("You cannot ban bots"); 
    let bReason = args.join(" ").slice(22);
    if(!bReason) return message.channel.send("You dont put reason");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You cannot kick this user, He have the permission `MANAGE_MESSAGES`");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "🔇mutes🔇");
    if(!incidentchannel) return message.channel.send("Can't find 🔇mutes🔇 channel.");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);
}

module.exports.help = {
  name:"ban"
}