import { ActivityType, Client, Events, IntentsBitField } from "discord.js";
import dotenv from "dotenv";

import { ping, rate } from "./commands";
import { getExchageRate } from "./utils/rate";

dotenv.config();

const client = new Client({ intents: new IntentsBitField() });
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

// 起動イベント
client.once(Events.ClientReady, async () => {
  const clientUser = client.user;
  if (!clientUser) throw new Error("Error: Cannot connect to Discord!");
  console.info(`Logged in as ${clientUser.tag} at ${new Date().toString()}`);

  setInterval(async () => {
    const r = await getExchageRate("USD_JPY");
    if (!r) return;

    clientUser.setActivity(`USD/JPY ${r.ask} (Ask)`, {
      type: ActivityType.Playing,
    });
  }, 1000 * 10);
});

client.login(DISCORD_BOT_TOKEN).catch(console.error);

// スラッシュコマンド
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;
  if (commandName === "ping") await ping(client, interaction);
  else if (commandName === "rate") await rate(client, interaction);
});
