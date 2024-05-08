import { useEffect, useState } from 'react';
import { APIService } from '../api';
import { TickerValue } from '../utils';

export const useGetTickers = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ data: TickerValue }>();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await APIService.getTickers();
      setData(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading: loading };
};
