import axios from 'axios';
import { TickerValue } from './utils';

export const APIService = {
  getMarkets: async () => {
    const res = await axios<APIResponse>('/res.json');
    return res.data;
  },
  getTickers: async () => {
    const res = await axios<{ data: TickerValue }>('/tickers.json');
    return res.data;
  },
};
