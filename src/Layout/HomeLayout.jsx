import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Pages/Footer";

const HomeLayout = ({ children, renderComponents }) => {
  const NavbarLinks = [
    { title: "Home", link: "/" },

    { title: "Blogs", link: "/blogs" },
    // { title: "Reducer", link: "/useReducer" },
  ];
  // Schedule the deletion after one hour
  const expirationTime = 3 * 60 * 60 * 1000;

  setTimeout(() => {
    localStorage.removeItem("user");
  }, expirationTime);
  return (
    <div className="max-h-auto w-full font-sans flex flex-col overflow-x-hidden overflow-y-auto">
      <Navbar Links={NavbarLinks} border={true} />
      <div className="flex flex-col flex-grow items-center flex-wrap h-auto">
        {children}
      </div>
      <div className="flex justify-start items-center px-10 flex-wrap h-auto ">
        {renderComponents}
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
