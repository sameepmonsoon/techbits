import React from "react";
import Navbar from "../Components/Navbar/Navbar";

const HomeLayout = ({ Children, renderComponents }) => {
  const NavbarLinks = [
    { title: "Home", link: "/" },
    { title: "Products", link: "/product" },
    { title: "News", link: "/news" },
    { title: "Blogs", link: "/blogs" },
  ];
  return (
    <div className="overflow-x-hidden h-screen w-full">
      <div className="">
        <Navbar Links={NavbarLinks} />
      </div>
      <div className="">{Children}</div>
      <div className="flex justify-start items-center px-10 flex-wrap">
        {renderComponents}
      </div>
    </div>
  );
};

export default HomeLayout;
