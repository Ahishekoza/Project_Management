import { useEffect, useState } from "react";

const useGetHook = (api) => {
  const [data, setData] = useState(null); // default to null or []
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // optional for error handling

  useEffect(() => {
    if (!api) return;

    const handleGetData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(api, {
          method: "GET",
          credentials: "include",
        });

        const resData = await response.json();

        console.log("resData",resData)

        if (!resData.success) {
          throw new Error("Unable to fetch data"); // handle error via try-catch
        }

        setData(resData.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    handleGetData();
  }, [api]);

  return { data, loading, error };
};

export default useGetHook;
