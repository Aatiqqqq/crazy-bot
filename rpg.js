const log = require("./logger");
const { RPG_CHANNEL_ID } = require("./config");

const xp = new Map();
const cooldown = new Map();

function getXP(id) {
  return xp.get(id) || 0;
}
function getLevel(id) {
  return Math.floor(getXP(id) / 100) + 1;
}

module.exports = async function rpg(client, data) {
  // XP from messages
  if (data.content) {
    if (data.author.bot) return;
    if (data.channelId !== RPG_CHANNEL_ID) return;

    const last = cooldown.get(data.author.id) || 0;
    if (Date.now() - last < 30000) return;

    cooldown.set(data.author.id, Date.now());

    const oldLvl = getLevel(data.author.id);
    xp.set(data.author.id, getXP(data.author.id) + 10);
    const newLvl = getLevel(data.author.id);

    if (newLvl > oldLvl) {
      data.channel.send(`🎉 ${data.author} reached **Level ${newLvl}**`);
      log(client, "RPG LEVEL UP", `${data.author.tag} → Level ${newLvl}`);
    }
  }

  // /profile
  if (data.isChatInputCommand?.() && data.commandName === "profile") {
    return data.reply({
      ephemeral: true,
      content:
        `🎮 **RPG PROFILE**\n\n` +
        `👤 ${data.user.username}\n` +
        `⭐ Level: **${getLevel(data.user.id)}**\n` +
        `🧠 XP: **${getXP(data.user.id)}**`
    });
  }
};
