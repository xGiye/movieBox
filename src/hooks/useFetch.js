import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [dataList, setDataList] = useState([]);
  const [isPending, setPending] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = process.env.REACT_APP_API_KEY;
        const response = await fetch(`${url}?api_key=${apiKey}`);

        if (response.ok) {
          const data = await response.json();
          setDataList(data.results || data);
          setPending(false);
        } else {
          throw Error("Could not fetch the data for the resource");
        }
      } catch (error) {
        setErr(error.message);
        setPending(false);
      }
    };
    fetchData();
  }, [url]);

  return { dataList, err, isPending };
};
export default useFetch;
