import { useState, useEffect, useCallback } from "react";

const useFetch = <T>(
  fetchFunction: () => Promise<T>, 
  autoFetch = true,
  dependencies: any[] = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // Optional: Clear data when starting a new fetch to avoid stale UI
      setData(null);

      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred"),
      );
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;