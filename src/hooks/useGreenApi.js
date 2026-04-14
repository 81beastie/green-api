import { useState, useMemo } from 'react';
import { GreenApiService } from '../api/GreenApiService';

export const useGreenApi = (idInstance, apiTokenInstance) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const api = useMemo(
    () => new GreenApiService(idInstance, apiTokenInstance),
    [idInstance, apiTokenInstance]
  );

  const call = async (methodName, ...args) => {
    setLoading(true);
    try {
      const data = await api[methodName](...args);
      setResponse(data);
    } catch (error) {
      setResponse({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, call };
};
