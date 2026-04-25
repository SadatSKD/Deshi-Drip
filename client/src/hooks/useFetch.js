import { useState, useEffect, useRef } from 'react';

/**
 * Simple, reliable data-fetching hook.
 * @param {string} url — The URL to fetch (e.g. '/api/products?gender=men')
 */
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    setLoading(true);
    setError(null);
    setData(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (isMounted.current) {
          setData(json.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted.current) {
          console.error('useFetch error:', url, err);
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted.current = false;
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
