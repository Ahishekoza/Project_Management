
import { useAuth } from "@/contexts/AuthContext";
import { useCallback, useEffect, useState } from "react";

const useGetHook = (api) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 const {user} = useAuth()

  const fetchData = useCallback(async () => {
    if (!api ) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(api, {
        method: "GET",
        credentials: "include",
      });

      const resData = await response.json();

      if (!resData.success) {
        throw new Error(resData.message || "Unable to fetch data");
      }

      setData(resData.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(()=>{
    if(user){
      fetchData()
    }
  },[user])

  return { data, loading, error, refetch: fetchData };
};

export default useGetHook;
