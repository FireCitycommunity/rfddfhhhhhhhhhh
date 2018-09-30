module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have permission!");
      
      let toMute = message.guild.member(message.mentions.users.first()) || message.channel.sendMessage.get(args[0]);
      if(!toMute) return message.channel.send("You did not specify a user mention or ID!");
      
      let role = message.guild.roles.find(r => r.name === "Just Muted");
        
      if(!role || !toMute.roles.has(role.id)) return message.channel.send("This user is not muted");

      await toMute.removeRole(role);
      message.channel.send("I have unmuted them.");
}

module.exports.help = {
    name: "unmute"
}