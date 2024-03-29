import { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
const Home = () => {
  const [currentUser, setCurrentUser] = useState();
  const [allBlogList, setAllBlogList] = useState([]);
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage?.getItem("user")));
    setAllBlogList(JSON.parse(localStorage?.getItem("currentBlogPosts")));
  }, []);
  const userBlogPost = allBlogList?.filter(
    (item) => item?.userId == currentUser._id
  );
  return (
    <div className="w-full md:min-w-[50%] h-auto flex flex-col justify-center items-center p-5 gap-8 ">
      {userBlogPost.map((item, index) => (
        <Card
          key={index}
          cardImage={item.selectedPhoto}
          row={true}
          cardPostDate={item.createdAt}
          cardTitle={item.titleContent}
          cardId={item._id}
          cardUserName={item.username}
          cardDescription={item.editorContent}
          cardUserImage={currentUser?.profilePicture}
        />
      ))}
    </div>
  );
};

export default Home;
