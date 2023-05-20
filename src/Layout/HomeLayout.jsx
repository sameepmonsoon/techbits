import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Pages/Footer";

const HomeLayout = ({ children, renderComponents }) => {
  const NavbarLinks = [
    { title: "Home", link: "/" },
    { title: "Products", link: "/product" },
    { title: "News", link: "/news" },
    { title: "Blogs", link: "/blogs" },
  ];
  return (
    <div className="overflow-x-hidden h-screen w-full font-sans">
      <div className="">
        <Navbar Links={NavbarLinks} />
      </div>
      <div className="">{children}</div>
      <div className="flex justify-start items-center px-10 flex-wrap min-h-screen">
        {renderComponents}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default HomeLayout;
