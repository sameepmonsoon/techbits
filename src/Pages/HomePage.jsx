import React from "react";
import HomeLayout from "../Layout/HomeLayout";
import HeroSectionText from "../PageComponents/HeroSectionText/HeroSectionText";

const HomePage = () => {
  return <HomeLayout Children={<HeroSectionText />} />;
};

export default HomePage;
