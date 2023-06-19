import { MdArrowOutward } from "react-icons/all";
import { Link } from "react-router-dom";
const Card = (prop) => {
  let {
    cardId,
    tag,
    cardTitle,
    cardDescription,
    cardUserName,
    cardImage,
    cardPostDate,
    row,
    autoHeight,
  } = prop;
  const parser = new DOMParser();
  const doc = parser.parseFromString(cardDescription, "text/html");

  let filteredText = "";
  const paragraphs = doc.querySelectorAll("p");
  // const images = doc.querySelectorAll("img");

  paragraphs.forEach((p) => {
    filteredText += p.textContent + " ";
  });

  // const imageSources = Array.from(images).map((img) => img.src);

  return (
    <div
      className={`font-sans ${
        autoHeight
          ? "sm:w-[35rem] md:w-[55rem] w-[22rem]  h-[28.2rem] sm:h-[28rem] flex-col"
          : row
          ? "w-[20rem] sm:w-[40rem] sm:h-[13rem] h-[28.2rem] gap-2 flex-col sm:flex-row"
          : "w-[22rem] sm:w-[24rem] h-[28.2rem] flex-col"
      } shadow-md shadow-gray-300 bg-white/80 backdrop-blur-sm  gap-2 flex justify-start items-start rounded-sm`}>
      <div
        className={`${
          autoHeight
            ? "h-[50%] w-full"
            : row
            ? "h-[60%] sm:h-full w-full sm:w-[55%] "
            : "max-h-[60%]  w-full"
        }  object-cover rounded-sm`}>
        <img
          src={cardImage}
          alt=""
          className={`
        w-full h-full  object-cover rounded-sm`}
        />
      </div>
      <div className="flex flex-col justify-start items-start overflow-hidden w-full gap-1 p-3">
        <div className="text-deep-purple capitalize text-[16px] flex gap-1 justify-start items-center ">
          {tag} <span>{tag != "" && ""}</span>
        </div>
        <div className="text-black capitalize w-full flex justify-between items-start h-[4.5rem] py -2 text-[17px] font-800">
          <span>{cardTitle}</span>
          <Link to={`/read/${cardId}`}>
            <MdArrowOutward
              size={23}
              className="text-black/70 hover:text-black"
            />
          </Link>
        </div>
        <span className="text-black/80 text-[13px] overflow-hidden h-[3.5rem]">
          {filteredText}
        </span>
        <div className="text-black/70 text-[13px] h-20 overflow-hidden flex justify-start items-center gap-3 w-full">
          <div className="flex flex-row gap-1  justify-center items-center h-full">
            <span className="text-[16px] text-black font-[500] capitalize ">
              {cardUserName}
            </span>
            <span className="h-[1.5rem] flex justify-center items-start">
              .
            </span>
            <span className="text-[14px]">
              {new Date(cardPostDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
