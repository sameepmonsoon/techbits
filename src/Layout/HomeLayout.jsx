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
  // Schedule the deletion after one hour
  const expirationTime = 3 * 60 * 60 * 1000;

  setTimeout(() => {
    // Delete the item from local storage
    localStorage.removeItem("user");
  }, expirationTime);
  return (
    <div className="min-h-screen w-full font-sans flex flex-col overflow-x-hidden">
      <Navbar Links={NavbarLinks} border={true} />
      <div className="flex flex-col flex-grow">{children}</div>
      <div className="flex justify-start items-center px-10 flex-wrap">
        {renderComponents}
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
