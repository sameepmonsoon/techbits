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
    <div className="overflow-x-hidden h-screen w-full font-sans snap-y overflow-y-auto scroll-smooth">
      <div className="snap-start">
        <Navbar Links={NavbarLinks} fixed={true} border={true}/>
      </div>
      <div className="snap-start ">{children}</div>
      <div className="flex justify-start items-center px-10 flex-wrap min-h-screen snap-start">
        {renderComponents}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default HomeLayout;
