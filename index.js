var Discord = require('discord.js');
var client = new Discord.Client();

client.on('ready', function() {
    console.log('Ready and waiting!');
});

var prefix = '>';
var commands = [];

client.on('message', function(msg) {
    if (msg.content.indexOf(prefix) == 0) {
        var commandArgs = msg.content.split(' ');
        var commandName = commandArgs.shift();
        var command = commands.filter(c=>prefix+c.name==commandName)[0];
        
        if (command) command.action(msg, commandArgs);
    }
    
    if (msg.content.indexOf(prefix+'help') == 0) {
        var embed = new Discord.RichEmbed();
        embed.setTitle('Commands');
        embed.setColor([245, 156, 50]);
        embed.setThumbnail('https://neocities.org/img/cat.png');
        embed.setFooter('This is an automated message from Penelope. Type >penelope to learn more.');
        
        commands.forEach(function(command) {
            embed.addField(prefix+command.name, command.desc+'\t`'+prefix+command.example+'`');
        });
        
        msg.channel.send('', embed);
    }
});

client.login(process.env.DISCORD);