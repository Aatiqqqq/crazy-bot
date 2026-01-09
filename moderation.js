const log = require("./logger");

const spam = new Map();

module.exports = async function moderation(client, msg) {
  if (!msg.content || msg.author.bot) return;

  const now = Date.now();
  const last = spam.get(msg.author.id) || 0;

  if (now - last < 2000) {
    msg.reply("⚠️ Stop spamming!");
    log(client, "MODERATION", `${msg.author.tag} warned for spam`);
  }

  spam.set(msg.author.id, now);
};
