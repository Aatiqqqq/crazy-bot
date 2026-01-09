const log = require("./logger");

const spamTracker = new Map();

module.exports = async function moderation(client, msg) {
  if (!msg.content) return;
  if (msg.author.bot) return;
  if (!msg.guild) return;

  const now = Date.now();
  const data = spamTracker.get(msg.author.id) || {
    last: 0,
    count: 0
  };

  // If messages are too fast
  if (now - data.last < 2000) {
    data.count += 1;
  } else {
    data.count = 1;
  }

  data.last = now;
  spamTracker.set(msg.author.id, data);

  // 🔴 SPAM DETECTED
  if (data.count >= 3) {
    try {
      await msg.delete();

      await msg.channel.send({
        content: `⚠️ ${msg.author}, stop spamming!`,
        allowedMentions: { users: [msg.author.id] }
      });

      log(
        client,
        "SPAM DELETED",
        `${msg.author.tag} spammed in #${msg.channel.name}`
      );
    } catch (err) {
      console.error("Spam delete error:", err.message);
    }
  }
};
