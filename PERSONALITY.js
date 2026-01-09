const { BOT_CHAT_CHANNEL_ID } = require("./config");
const log = require("./logger");

const replies = [
  "😏 what do you want?",
  "bro chill",
  "I'm watching 👀",
  "say that again",
  "interesting..."
];

module.exports = async function personality(client, msg) {
  if (!msg.content || msg.author.bot) return;
  if (msg.channelId !== BOT_CHAT_CHANNEL_ID) return;

  if (msg.mentions.has(client.user)) {
    const reply = replies[Math.floor(Math.random() * replies.length)];
    msg.reply(reply);
    log(client, "PERSONALITY", `Replied to ${msg.author.tag}`);
  }
};
