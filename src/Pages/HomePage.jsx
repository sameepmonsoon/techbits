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
    <HomeLayout
      renderComponents={
        <>
          <div className="font-sans flex flex-col justify-center items-center">
            <p className="text-[18px] font-[700] capitalize">Recent Posts</p>
            <div className="flex justify-center items-center gap-x-[5rem] gap-y-[3rem] flex-wrap py-10">
              <Card
                tag={"Mobile"}
                cardTitle={"New Mobile"}
                cardDescription={
                  "Lore ipsum nepal from syangja.Lore ipsum nepal from syangja.Lore ipsum nepal from syangja.Lore ipsum nepal from syangja.Lore ipsum nepal from syangja.Lore ipsum nepal from syangja.Lore ipsum nepal from syangja."
                }
                cardUserName={"John Doe"}
                cardImage={image}
                cardPostDate={"May 19, 2022"}
                cardUserImage={image}
                // row={true}
                // autoHeight={true}
              />
              <Card
                tag={"Mobile"}
                cardTitle={"New Mobile"}
                cardDescription={
                  "Lore ipsum nepal from syangja.Lore ipsum nepal from syangja.Lore ipsum nepal from syangja.Lore ipsum nepal from syangja.Lore ipsum nepal from syangja.Lore ipsum nepal from syangja.Lore ipsum nepal from syangja."
                }
                cardUserName={"John Doe"}
                cardImage={image}
                cardPostDate={"May 19, 2022"}
                cardUserImage={image}
              />
              <Card
                tag={"Mobile"}
                cardTitle={"New Mobile"}
                cardDescription={
                  "Lore ipsum nepal from syangja.Lore ipsum nepal from syangja.Lore ipsum nepal from syangja.Lore ipsum nepal from syangja.Lore ipsum nepal from syangja.Lore ipsum nepal from syangja.Lore ipsum nepal from syangja."
                }
                cardUserName={"John Doe"}
                cardImage={image}
                cardPostDate={"May 19, 2022"}
                cardUserImage={image}
              />
              <Card
                tag={"Mobile"}
                cardTitle={"New Mobile"}
                cardDescription={
                  "Lore ipsum nepal from syangja.Lore ipsum nepal from syangja.Lore ipsum nepal from syangja.Lore ipsum nepal from syangja.Lore ipsum nepal from syangja.Lore ipsum nepal from syangja.Lore ipsum nepal from syangja."
                }
                cardUserName={"John Doe"}
                cardImage={image}
                cardPostDate={"May 19, 2022"}
                cardUserImage={image}
              />
              <Card
                tag={"Mobile"}
                cardTitle={"New Mobile"}
                cardDescription={
                  "Lore ipsum nepal from syangja.Lore ipsum nepal from syangja.Lore ipsum nepal from syangja.Lore ipsum nepal from syangja.Lore ipsum nepal from syangja.Lore ipsum nepal from syangja.Lore ipsum nepal from syangja."
                }
                cardUserName={"John Doe"}
                cardImage={image}
                cardPostDate={"May 19, 2022"}
                cardUserImage={image}
              />
            </div>
          </div>
          <div className="min-h-screen border-t-[1px] border-t-gray-300 w-full py-10">
            <InfoSection
              infoText={
                "Join 1000+ startups growing with blog\
"
              }
              infoImage={infoImage}
            />
          </div>
        </>
      }>
      <HeroSectionText align={"center"} />
      <Outlet />
    </HomeLayout>
  );
};

export default HomePage;
