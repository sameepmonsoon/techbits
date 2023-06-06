import React from "react";
import HomeLayout from "../Layout/HomeLayout";

const UpdateProfile = () => {
  const currentUser = JSON.parse(localStorage?.getItem("user"));
  console.log(currentUser);
  return (
    <HomeLayout>
      <div className="flex h-auto inset-0">
        {currentUser?.map((item, index) => {
          return <div>{item.username}</div>;
        })}
      </div>
    </HomeLayout>
  );
};

export default UpdateProfile;
