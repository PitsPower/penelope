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
    },
    {
        name: 'static',
        desc: 'Gives more info on static websites',
        exmaple: 'static',
        action: function(msg, args) {
            sendRichEmbed(msg, 'PHP and Neocities', [
                {
                    name: "Why can't I use PHP?",
                    content: "Neocities doesn't support any back-end code such as PHP. This means that you can only create static websites on Neocities."
                },
                {
                    name: 'What is a static site?',
                    content: "A static website is a site with fixed content. This means that your website cannot use databases or any back-end code."
                },
                {
                    name: 'What can I have on my static website?',
                    content: "Static websites can have HTML, CSS and JavaScript code, as well as other types of files. The only thing they can't do is run server code (e.g. databases)."
                },
                {
                    name: 'Can I get around these limitations?',
                    content: "In a way, yes! You can use JavaScript to talk to other dynamic websites, which allows for some flexibility. However, Neocities doesn't provide hosting for dynamic websites, so you'll have to host them yourself."
                }
            ]);
        }
    },
    {
        name: 'filetypes',
        desc: 'Gives more info on allowed file types',
        example: 'filetypes',
        action: function(msg, args) {
            sendRichEmbed(msg, 'File Types', [
                {
                    name: 'Here are the allowed file types:',
                    content: [
                        "- HTML (.html, .htm)",
                        "- Image (.jpg, .png, .gif, .svg, .ico)",
                        "- Markdown (.md, .markdown)",
                        "- JavaScript (.js, .json, .geojson)",
                        "- CSS (.css)",
                        "- Text (.txt, .text, .csv, .tsv)",
                        "- XML (.xml)",
                        "- Web Fonts (.eot, .ttf, .woff, .woff2, .svg)",
                        "- MIDI Files (.mid, .midi)"
                    ].join('\n')
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