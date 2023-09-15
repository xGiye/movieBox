import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [dataList, setDataList] = useState([]);
  const [isPending, setPending] = useState(true);
  const [err, setErr] = useState(null);
  console.log(isPending);
  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    fetch(`${url}api_key=${apiKey}`)
      .then((response) => {
        if (response.ok) {
          setPending(true);
          return response.json();
        } else {
          throw Error("Network response was not ok");
        }
      })
      .then((data) => {
        console.log(data);
        setDataList(data.results || data);
        setPending(false);
        setErr(null);
      })
      .catch((error) => {
        setErr(error.message);
        setPending(false);
      });
  }, [url]);

  return { dataList, err, isPending };
};
export default useFetch;
