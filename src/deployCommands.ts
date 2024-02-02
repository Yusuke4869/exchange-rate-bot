import { SlashCommandBuilder } from "@discordjs/builders";
import { Client, IntentsBitField, REST, Routes } from "discord.js";
import dotenv from "dotenv";

import { currencyPairs } from "./data/pairs";

dotenv.config();

const currencyPairChoices = currencyPairs.map((pair) => {
  return { name: pair.description, value: pair.symbol };
});

const commands = [
  new SlashCommandBuilder()
    .setName("rate")
    .setDescription("為替レートを取得します")
    .addStringOption((option) =>
      option
        .setName("通貨ペア")
        .setDescription("取得する通貨ペア")
        .addChoices(...currencyPairChoices)
        .setRequired(true),
    ),
  new SlashCommandBuilder().setName("ping").setDescription("pingを確認します"),
].map((command) => command.toJSON());

const client = new Client({ intents: new IntentsBitField() });
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN ?? "";

client.once("ready", async () => {
  const clientUser = client.user;
  if (!clientUser) throw new Error("Error: Cannot connect to Discord!");
  console.info(`Logged in as ${clientUser.tag}`);

  const rest = new REST({ version: "10" }).setToken(DISCORD_BOT_TOKEN);
  // コマンド登録（グローバル）
  rest
    .put(Routes.applicationCommands(clientUser.id), { body: commands })
    .then(() => console.log("Successfully reloaded application (/) commands."))
    .catch(console.error);

  client.destroy();
});

client.login(DISCORD_BOT_TOKEN).catch(console.error);
