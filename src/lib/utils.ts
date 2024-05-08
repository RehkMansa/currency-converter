const markets = [
  { id: 'btcusdt', base_unit: 'btc', quote_unit: 'usdt' },
  { id: 'usdtngn', base_unit: 'usdt', quote_unit: 'ngn' },
  { id: 'ethusdt', base_unit: 'eth', quote_unit: 'usdt' },
] as const;

export const SELECT_OPTION = ['btc', 'usdt', 'eth', 'ngn'];

export const MarketOptions = markets.map;

type Market = (typeof markets)[number];

export type CurrencyCode = Market['base_unit'] | Market['quote_unit'];

interface Ticker {
  last: string;
}
export type TickerValue = Record<string, { ticker: Ticker }>;

const joinKeys = (x: CurrencyCode, y: CurrencyCode) => `${x}${y}`;

// TODO: make this map to reverse values
export const currencyConverter = (
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode,
  tickers: TickerValue
) => {
  const lookUp = (ticker: string) => ticker in tickers;

  const string1 = joinKeys(from, to);

  if (lookUp(string1)) return amount * Number(tickers[string1].ticker.last);

  const string2 = joinKeys(to, from);
  if (lookUp(string2)) return amount / Number(tickers[string2].ticker.last);

  throw new Error('Invalid argument provided for from and to');
};
