import { useEffect, useState } from 'react';
import { APIService } from '../api';

export const useGetMarket = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<APIResponse>();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await APIService.getMarkets();
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
