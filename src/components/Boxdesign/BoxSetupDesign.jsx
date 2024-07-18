import { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

import "./BoxDesign.css";
const BoxSetupDesign = () => {
  const [slide, setSlide] = useState(0);

  const imgSlider = [
    "/boxes/black-blue-ribbon.png",

    "/boxes/black-gold-bow.png",

    "/boxes/black-gold-ribbon.png",

    "/boxes/black-red-ribbon.png",

    "/boxes/black-ribbon.png",

    "/boxes/black-w&g-angled.png",
    "/boxes/black-w&g-ribbon.png",

    "/boxes/black-white-ribbon.png",
  ];
  const nextSlide = () => {
    setSlide(slide === imgSlider.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? imgSlider.length - 1 : slide - 1);
  };

  return (
    <div className="box-design">
      <div className="carousel">
        <BsArrowLeftCircleFill
          onClick={prevSlide}
          className="arrow arrow-left"
        />
        {imgSlider.map((item, idx) => {
          return (
            <img
              src={item}
              alt={item}
              key={idx}
              className={slide === idx ? "slide" : "slide slide-hidden"}
            />
          );
        })}
        <BsArrowRightCircleFill
          onClick={nextSlide}
          className="arrow arrow-right"
        />
        <span className="indicators">
          {imgSlider.map((_, idx) => {
            return (
              <button
                key={idx}
                className={
                  slide === idx ? "indicator" : "indicator indicator-inactive"
                }
                onClick={() => setSlide(idx)}
              ></button>
            );
          })}
        </span>
      </div>
    </div>
  );
};
export default BoxSetupDesign;
