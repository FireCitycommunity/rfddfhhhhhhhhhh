const Discord = require('discord.js');
const fs = require("fs");

const commando = require('discord.js-commando')
const bot = new Discord.Client();
const prefix = "-";
bot.commands = new Discord.Collection();
bot.mutes = require("./mutes.js");

fs.readdir("./cmds/", (err, files) => {
    if(err) console.error(err);
        
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.console.log("No commands to load!");
        return;
    }

    console.log(`Loading  ${jsfiles.length} commands!`);

    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on("ready", async () => {
    bot.user.setActivity("On 🔥FireCity Community🔥|-help", {type: "PLAYING"});
});

bot.on("ready", () => {
    console.log(`Bot is ready! ${bot.user.username}`);

    bot.setInterval(() => {
        for(let i in bot.mutes) {
            let time = bot.mutes[i].time;
            let guildId = bot.mutes[i].guild;
            let guild = bot.guilds.get(guildId);
            let mutedRole = guild.roles.find(r => r.name === "Just Muted");
            if(!mutedRole) continue;

            if(Date.now() > time) {
                console.log(`${i} is now able to be unmuted!`);
            }
        }
    }, 5000)
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if (message.channel.type === "dm")return;
    
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    
    if(!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot, message, args);

    if (command === `${prefix}help`) {
        const embed = new Discord.RichEmbed()
                .setTitle("Help Commands")
                .addField("General:\n`help` `avatar` `icon` `json` `vote-1`")
                .addField("Information and Search:\n`serverinfo` `userinfo` `findusers`")
                .addField("Moderation:\n`mute` `unmute` `kick` `ban`")
                .setColor("#ff0000");
        
        message.channel.send(embed);   
        
        return;
    }   
});

bot.login('NDYzMzk4MTAzNDA4NzA1NTQ2.DhwAug.XKdASMigIs9sp8-MnILXL8opgXs');