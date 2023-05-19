import React from "react";
import Navbar from "../Components/Navbar/Navbar";

const HomeLayout = ({ Children }) => {
  const NavbarLinks = [
    { title: "Home", link: "/" },
    { title: "Products", link: "/product" },
    { title: "News", link: "/news" },
    { title: "Blogs", link: "/blogs" },
  ];
  return (
    <div className="overflow-hidden">
      <div className="">
        <Navbar Links={NavbarLinks} />
      </div>
      <div className="">{Children}</div>
    </div>
  );
};

export default HomeLayout;
