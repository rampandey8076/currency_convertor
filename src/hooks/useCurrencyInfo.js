import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currency) return;

    setLoading(true);
    setError(null);

    // ✅ NEW API — Frankfurter (free, no API key, no rate limit)
    // OLD API was: cdn.jsdelivr.net/gh/fawazahmed0/currency-api (broken)
    fetch(
      `https://api.frankfurter.dev/v1/latest?base=${currency.toUpperCase()}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch currency data");
        return res.json();
      })
      .then((res) => {
        // OLD API returned: res[currency]
        // NEW API returns:  res.rates  ← changed here
        setData(res.rates);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Currency fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [currency]);

  return { data, loading, error };
}

export default useCurrencyInfo;