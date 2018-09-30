const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    let target = message.mentions.users.first() || message.author;
    let embed = new Discord.RichEmbed()
        .setAuthor(target.username)
        .setDescription("This is the user's info")
        .setColor("#ff0000")
        .addField("Full Username", `${target.username}${target.discriminator}`)
        .addField("Last Message", target.lastMessage)
        .addField("Created At", target.createdAt);

    message.channel.send({embed: embed});
}

module.exports.help = {
    name: "userinfo"
}