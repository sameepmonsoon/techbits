import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Pages/Footer";

const BlogsPageLayout = ({ children, renderComponents }) => {
  const NavbarLinks = [
    { title: "Home", link: "/" },
    ,
    { title: "Blogs", link: "/blogs" },
  ];
  return (
    <div className="max-h-auto w-full font-sans flex flex-col overflow-x-hidden overflow-y-auto">
      <Navbar Links={NavbarLinks} border={true} color="black" />
      <div className="flex justify-start items-start px-10 flex-wrap w-full h-[40rem] bg-deep-purple text-white">
        {renderComponents}
      </div>
      <div className="flex flex-col flex-grow items-center flex-wrap ">
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default BlogsPageLayout;
