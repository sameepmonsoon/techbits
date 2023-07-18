import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import HomeLayout from "../Layout/HomeLayout";
import HeroSectionText from "../PageComponents/HeroSectionText/HeroSectionText";
import Card from "../Components/Card/Card";
import image from "../assets/amr-taha-PksS6SX-t-c-unsplash.jpg";
import { Outlet, useParams } from "react-router-dom";
import InfoSection from "../PageComponents/InfoSection/InfoSection";
import infoImage from "../assets/rezvani-IIDZ77VDVQE-unsplash.jpg";
import { fetchAllBlogs } from "../Store/blogPostSlice";
import { useDispatch } from "react-redux";
import { LocalBlogContext } from "../App";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import withFetch from "../Layout/HOC";
import InputComponent from "../Components/InputComponent/InputComponent";
import { useDeferredValue } from "react";
import { useQuery } from "@tanstack/react-query";
const HomePage = (props) => {
  const { id } = useParams();
  const reducerBlogRef = useRef(null);
  const { state, dispatch } = useContext(LocalBlogContext);
  const dispatchRedux = useDispatch();
  const [getSearchValue, setGetSearchValue] = useState("");
  const { data, isFetching } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const result = await fetch("http://localhost:8000/blogPost/getAll")
        .then((res) => res.json())
        .catch((ee) => console.log(ee));
      return result;
    },
  });
  console.log(data?.getAllBlog, isFetching);
  const blogAfterSearchFilter = props?.currentBlogPosts
    ?.slice(0, 6)
    .filter((item) =>
      item.titleContent.toLowerCase().split(" ").join().includes(getSearchValue)
    );
  const deferredBlogFilter = useDeferredValue(blogAfterSearchFilter);
  function memoizeBlogLength(values) {
    var currBlog = { totalLength: values?.length };
    return currBlog;
  }

  const memoized = useMemo(
    () => memoizeBlogLength(blogAfterSearchFilter),
    [blogAfterSearchFilter?.length]
  );

  useEffect(() => {
    dispatchRedux(fetchAllBlogs());
  }, [dispatchRedux]);
  const searchValueContent = useCallback((value) => {
    setGetSearchValue(value.toLowerCase().split(" ").join());
  }, []);

  //for scroll position

  useEffect(() => {
    const elementtwo = document?.getElementById("focusDiv");
    if (elementtwo) elementtwo.scrollIntoView({ behavior: "smooth" });
  }, [state?.blog]);

  return (
    <HomeLayout
      renderComponents={
        <>
          <div className="font-sans flex flex-col justify-center items-center w-full ">
            {/* <p className="text-[18px] font-[700] capitalize">All Users</p> */}
            <div className="flex justify-center items-center gap-[8rem] flex-wrap py-10 w-full">
              {/* <div className="w-full h-full flex justify-center items-center gap-10 flex-wrap ">
                {props?.currentList?.userList &&
                  props?.currentList?.userList.map((item, index) => (
                    <div
                      key={index}
                      className="w-[20rem] h-[25rem] rounded-md bg-gray-100 flex flex-col gap-2 items-center justify-start">
                      <img
                        src={item?.profilePicture}
                        alt=""
                        className="w-full rounded-md h-[15rem]"
                      />
                      <div>{item.email}</div>
                      <div>{item.phone}</div>

                      <div className="username">{item.username}</div>
                    </div>
                  ))}
              </div> */}
              {/* <div className="flex w-full h-auto gap-10 justify-center items-center flex-wrap ">
                {state?.blog &&
                  state?.blog
                    ?.filter(
                      (item) =>
                        item?.title !== "" &&
                        Object.keys(item).length > 0 &&
                        !Array.isArray(item)
                    )
                    .map((item, index) => (
                      <Card
                        id={item?.id === id && "focusDiv"}
                        key={index}
                        cardId={item?.id}
                        cardTitle={item?.title}
                        cardDescription={item?.body}
                        cardUserName={
                          <div className="flex gap-2 justify-start items-center w-full">
                            <span className="cursor-pointer flex justify-center items-center gap-2 border-[1px] p-1 rounded-md w-20 hover:text-green-600 hover:border-green-600">
                              Edit <FiEdit size={20} />
                            </span>
                            <span
                              onClick={() => {
                                dispatch({
                                  type: "delete",
                                  payload: item?.id,
                                });
                              }}
                              className="cursor-pointer flex justify-start items-center gap-1 border-[1px] p-1 rounded-md hover:text-red-600 hover:border-red-600">
                              Delete <AiFillDelete size={20} />
                            </span>
                          </div>
                        }
                        cardImage={item?.photo}
                      />
                    ))}
              </div> */}
              {/* <p className="text-[18px] font-[700] capitalize">Recent Posts</p> */}
              {
                deferredBlogFilter.map((item, index) => (
                  <Card
                    key={index}
                    cardId={item._id}
                    writerId={item.userId}
                    tag={
                      <div className="flex gap-2 overflow-hidden">
                        {item.categoryList
                          .filter(
                            (category, index) => category.id !== "" && index < 3
                          )
                          .map((category, categoryIndex) => {
                            if (categoryIndex === 0 || categoryIndex == 2) {
                              return (
                                <div
                                  key={categoryIndex}
                                  className="w-auto justify-center h-[1rem] max-w-[10rem] bg-red-100/50 text-red-700 text-[13px] font-[400] p-[px] gap-1 flex items-center whitespace-nowrap capitalize rounded-full px-2 py-3">
                                  <span> {category.item}</span>
                                </div>
                              );
                            } else if (
                              categoryIndex == 1 ||
                              categoryIndex == 3
                            ) {
                              return (
                                <div
                                  key={categoryIndex}
                                  className="w-auto justify-center h-[1rem] max-w-[10rem] bg-green-100/80 text-green-700 text-[13px] font-[400] p-[px] gap-1 flex items-center whitespace-nowrap capitalize rounded-full px-2 py-3">
                                  <span> {category.item}</span>
                                </div>
                              );
                            } else if (
                              categoryIndex === 4 ||
                              categoryIndex == 5
                            ) {
                              return (
                                <div
                                  key={categoryIndex}
                                  className="w-auto justify-center h-[1rem] max-w-[10rem] bg-rose-100/70 text-rose-700 text-[13px] font-[400] p-[px] gap-1 flex items-center whitespace-nowrap capitalize rounded-full px-2 py-3">
                                  <span> {category.item}</span>
                                </div>
                              );
                            } else {
                              return (
                                <div
                                  key={categoryIndex}
                                  className="w-auto justify-center h-[1rem] max-w-[10rem] bg-purple/10 text-deep-purple text-[13px] font-[400] p-[px] gap-1 flex items-center whitespace-nowrap capitalize rounded-full px-2 py-3">
                                  <span> {category.item}</span>
                                </div>
                              );
                            }
                          })}
                      </div>
                    }
                    cardTitle={item.titleContent}
                    cardDescription={""}
                    cardUserName={item.username}
                    cardImage={item.selectedPhoto}
                    cardPostDate={item.createdAt}
                    cardUserImage={image}
                  />
                ))
                // )
              }
            </div>
          </div>
          <div className="min-h-screen border-t-[1px] border-t-gray-300 w-full">
            <InfoSection
              infoText={"Join 1000+ startups growing with blog"}
              infoImage={infoImage}
              info={memoized}
            />
          </div>
        </>
      }>
      {/* <div className="forwardRef w-full bg-red-200 flex gap-5">
        <InputComponent ref={reducerBlogRef} />
        <button
          className="border-2"
          onClick={() => (reducerBlogRef.current.value = "clicked")}>
          Click Me !
        </button>
      </div> */}

      <HeroSectionText align={"center"} getSearchValue={searchValueContent} />
      {props.children}
      <Outlet />
    </HomeLayout>
  );
};

export default withFetch(HomePage, "auth/allUser");
