var Discord = require('discord.js');
var client = new Discord.Client();

client.on('ready', function() {
    console.log('Ready and waiting!');
});

function sendRichEmbed(msg, title, fields) {
    var embed = new Discord.RichEmbed();
    embed.setTitle('__**'+title+'**__');
    embed.setColor([245, 156, 50]);
    embed.setThumbnail('https://neocities.org/img/cat.png');
    embed.setFooter('This is an automated message from Penelope. Type >penelope to learn more.');
    
    fields.forEach(function(field) {
        embed.addField(field.name, field.content);
    });
    
    msg.channel.send('', embed);
}

var prefix = '>';
var commands = [
    {
        name: 'penelope',
        desc: 'Gives more info about me!',
        example: 'penelope',
        action: function(msg, args) {
            sendRichEmbed(msg, 'About Me', [
                {
                    name: 'What do I do?',
                    content: "All kinds of stuff!"
                }
            ]);
        }
    }    
];

client.on('message', function(msg) {
    if (msg.content.indexOf(prefix) == 0) {
        var commandArgs = msg.content.split(' ');
        var commandName = commandArgs.shift();
        var command = commands.filter(c=>prefix+c.name==commandName)[0];
        
        if (command) command.action(msg, commandArgs);
    }
    
    if (msg.content.indexOf(prefix+'help') == 0) {
        var fields = [];
        commands.forEach(function(command) {
            fields.push({
                name: prefix + command.name,
                content: command.desc + '\t`' + prefix+command.example + '`'
            });
        });
        
        sendRichEmbed(msg, 'Commands', fields);
    }
});

client.login(process.env.DISCORD);