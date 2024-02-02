export type _symbol =
  | "USD_JPY"
  | "EUR_JPY"
  | "GBP_JPY"
  | "AUD_JPY"
  | "NZD_JPY"
  | "CAD_JPY"
  | "CHF_JPY"
  | "TRY_JPY"
  | "ZAR_JPY"
  | "MXN_JPY"
  | "EUR_USD"
  | "GBP_USD"
  | "AUD_USD"
  | "NZD_USD";

export type exchangeRate = {
  symbol: _symbol;
  ask: string;
  bid: string;
  timestamp: string;
  status: string;
};

export type tickerResponse = {
  status: number;
  data: exchangeRate[];
  responsetime: string;
};

export type statusResponse = {
  status: "OPEN" | "CLOSE" | "MAINTENANCE";
};

export type _symbolDiscription = {
  symbol: _symbol;
  description: string;
};
