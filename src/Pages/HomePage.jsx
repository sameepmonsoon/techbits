import React from "react";
import HomeLayout from "../Layout/HomeLayout";
import HeroSectionText from "../PageComponents/HeroSectionText/HeroSectionText";
import Card from "../Components/Card/Card";
import image from "../assets/amr-taha-PksS6SX-t-c-unsplash.jpg";

const HomePage = () => {
  return (
    <HomeLayout
      Children={<HeroSectionText align={"center"} />}
      renderComponents={
        <div className="flex justify-center items-center px-5 gap-x-[5rem] gap-y-[3rem] flex-wrap border-b-[1px] border-b-gray-700 py-10">
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
      }
    />
  );
};

export default HomePage;
