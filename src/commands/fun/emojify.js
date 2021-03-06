const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class EmojifyCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'emojify',
      aliases: ['sayemoji'],
      usage: 'emojify <message>',
      description: 'Swaps every letter within the provided message with an emoji.',
      type: client.types.FUN,
      examples: ['emojify hello world']
    });
  }
  run(message, args) {
    if (!args[0]) return this.sendErrorMessage(message, 'No message provided. Please provide a message to emojify.');
    let msg = message.content.slice(message.content.indexOf(args[0]), message.content.length);
    msg = msg.split('').map(c => {
      if (c === ' ') return c;
      else return (/[a-zA-Z]/.test(c)) ? ':regional_indicator_' + c.toLowerCase() + ':' : '';
    }).join('');

    if (msg.length > 2048) {
      msg = msg.slice(0, msg.length - (msg.length - 2033)); 
      msg = msg.slice(0, msg.lastIndexOf(':')) + '**...**';
    }

    const embed = new MessageEmbed()
      .setTitle('Emojify')
      .setDescription(msg)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
};