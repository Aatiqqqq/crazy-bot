const {
  Client,
  GatewayIntentBits,
  REST,
  Routes
} = require("discord.js");

const rpg = require("./rpg");
const moderation = require("./moderation");
const personality = require("./personality");

const TOKEN = process.env.TOKEN;
const CLIENT_ID = "PUT_CLIENT_ID";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once("ready", async () => {
  console.log(`🤖 Bot online as ${client.user.tag}`);

  const rest = new REST({ version: "10" }).setToken(TOKEN);

  await rest.put(Routes.applicationCommands(CLIENT_ID), {
    body: [{ name: "profile", description: "View your RPG profile" }]
  });

  console.log("✅ Slash commands registered");
});

client.on("messageCreate", msg => {
  rpg(client, msg);
  moderation(client, msg);
  personality(client, msg);
});

client.on("interactionCreate", interaction => {
  rpg(client, interaction);
});

client.login(TOKEN);
