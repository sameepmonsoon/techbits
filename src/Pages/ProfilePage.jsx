import React from "react";
import HomeLayout from "../Layout/HomeLayout";
import HeroSectionText from "../PageComponents/HeroSectionText/HeroSectionText";
import Card from "../Components/Card/Card";
import image from "../assets/amr-taha-PksS6SX-t-c-unsplash.jpg";
import { Outlet } from "react-router-dom";
import InfoSection from "../PageComponents/InfoSection/InfoSection";
import infoImage from "../assets/rezvani-IIDZ77VDVQE-unsplash.jpg";
const HomePage = () => {
  return (
    <HomeLayout renderComponents={""}>
      <HeroSectionText align={"center"} />
      <Outlet />
    </HomeLayout>
  );
};

export default HomePage;
