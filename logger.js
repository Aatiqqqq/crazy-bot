const { LOG_CHANNEL_ID } = require("./config");

module.exports = async function log(client, title, message) {
  try {
    const ch = await client.channels.fetch(LOG_CHANNEL_ID);
    ch.send(`📜 **${title}**\n${message}`);
  } catch (e) {
    console.error("Log error:", e.message);
  }
};
