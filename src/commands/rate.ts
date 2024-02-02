import { EmbedBuilder } from "discord.js";
import type { Client, CommandInteraction } from "discord.js";

import { getExchageRate } from "../utils/rate";
import type { _symbol, exchangeRate } from "../types/api";

const embed = (data: exchangeRate) => {
  const res = new EmbedBuilder()
    .setTitle(data.symbol.replace("_", "/"))
    .setColor("#3fd46e")
    .addFields([
      {
        name: "Ask",
        value: data.ask,
        inline: true,
      },
      {
        name: "Bid",
        value: data.bid,
        inline: true,
      },
    ])
    .setTimestamp(new Date(data.timestamp));
  return res;
};

export const rate = async (client: Client, interaction: CommandInteraction) => {
  try {
    const r = await getExchageRate(interaction.options.data[0].value as _symbol);
    if (!r) {
      await interaction.reply({ content: "通貨レートの取得に失敗しました", ephemeral: true });
      return;
    }

    await interaction.reply({ embeds: [embed(r)], ephemeral: true });
  } catch (e) {
    console.error(e);
  }
};
