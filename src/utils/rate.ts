import { getApiStatus, getExchageRates } from "../lib/api";
import type { _symbol, exchangeRate } from "../types/api";

export const getExchageRate = async (symbol: _symbol): Promise<exchangeRate | null> => {
  const status = await getApiStatus();
  if (!status || status.status === "MAINTENANCE") return null;

  const rates = await getExchageRates();
  if (!rates) return null;

  return rates.data.find((r) => r.symbol === symbol) || null;
};
