import React from "react";
import HomeLayout from "../Layout/HomeLayout";
import HeroSectionText from "../PageComponents/HeroSectionText/HeroSectionText";
import Card from "../Components/Card/Card";
import image from "../assets/amr-taha-PksS6SX-t-c-unsplash.jpg";
import { Outlet } from "react-router-dom";
import InfoSection from "../PageComponents/InfoSection/InfoSection";
import infoImage from "../assets/rezvani-IIDZ77VDVQE-unsplash.jpg";
import SkeletonCard from "../Components/Card/SkeletonCard";
const HomePage = () => {
  return (
    <HomeLayout renderComponents={""}>
      <div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis,
        eos perferendis? Recusandae dicta asperiores ea eligendi neque ipsum
        provident nobis earum quisquam quo atque, consequatur maiores eos
        pariatur velit vitae.
      </div>
      <SkeletonCard />
      <Outlet />
    </HomeLayout>
  );
};

export default HomePage;
