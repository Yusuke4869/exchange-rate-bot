import type { tickerResponse, statusResponse } from "../types/api";

/**
 * GMOコインのAPI
 * @see https://api.coin.z.com/fxdocs/#public-api
 */
const baseUrl = "https://forex-api.coin.z.com/public";

export const getApiStatus = async (): Promise<statusResponse | null> => {
  const res = await fetch(`${baseUrl}/v1/status`);
  if (!res.ok) return null;

  const d = (await res.json()) as statusResponse;
  return d;
};

export const getExchageRates = async (): Promise<tickerResponse | null> => {
  const res = await fetch(`${baseUrl}/v1/ticker`);
  if (!res.ok) return null;

  const d = (await res.json()) as tickerResponse;
  return d;
};
