import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Pages/Footer";

const BlogsPageLayout = ({ children, renderComponents }) => {
  const NavbarLinks = [
    { title: "Home", link: "/" },
    { title: "Products", link: "/product" },
    { title: "News", link: "/news" },
    { title: "Blogs", link: "/blogs" },
  ];
  return (
    <div className="max-h-auto w-full font-sans flex flex-col overflow-x-hidden overflow-y-auto">
      <Navbar Links={NavbarLinks} border={true} color='black' />
      <div className="flex justify-start items-center px-10 flex-wrap h-auto bg-purple">
        {renderComponents}a
      </div>
      <div className="flex flex-col flex-grow items-center flex-wrap ">
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default BlogsPageLayout;
