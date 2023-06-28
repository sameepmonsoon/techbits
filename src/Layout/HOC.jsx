import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HttpCalls } from "../utils/HttpCalls";
import SkeletonCard from "../Components/Card/SkeletonCard";
const withFetch = (Component, url) => {
  return function HOCComp(props) {
    const { currentBlogPosts } = useSelector((state) => state.blog);
    const [currentList, setCurrentList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    console.log("current list", currentList);

    useEffect(() => {
      console.log("fetchhh");
      HttpCalls.get(url)
        .then((res) => {
          setCurrentList(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, []);
    return (
      <Component
        currentBlogPosts={currentBlogPosts}
        currentList={currentList}
        isLoading={isLoading}
        {...props}>
        {isLoading && (
          <div className="flex gap-10 w-full h-full justify-center align-center">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}
      </Component>
    );
  };
};

export default withFetch;
