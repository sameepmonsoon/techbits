import { useState, useEffect } from "react";
import { HttpCalls } from "../utils/HttpCalls";
const useFetch = ({ url }) => {
  const [data, setData] = useState(null);
  console.log(url);
  useEffect(() => {
    HttpCalls.get(`${url}`)
      .then((res) => {
        setData(res.data.getAllBlogDraft);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url]);
  return [data];
};

export default useFetch;
