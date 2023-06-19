import { useState, useEffect } from "react";
import { HttpCalls } from "../utils/HttpCalls";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    HttpCalls.get(url).then((res) => {
      setData(res);
    });
  }, [url]);

  return [data];
};

export default useFetch;
