import { useState, useEffect, useCallback } from 'react';

/**
 * useFetch Hook
 * Asynchronous data fetching hook supporting url fetch, loading, error, and manual refetch
 */
export const useFetch = (url, fallbackData = null) => {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (!url) {
        setData(fallbackData);
        setLoading(false);
        return;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setData(json);
    } catch (err) {
      console.warn('Fetch error, using fallback data:', err);
      setError(err.message || 'Failed to fetch data');
      if (fallbackData) {
        setData(fallbackData);
      }
    } finally {
      setLoading(false);
    }
  }, [url, fallbackData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};
