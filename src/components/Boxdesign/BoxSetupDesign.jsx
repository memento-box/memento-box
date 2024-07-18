import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useHistory } from "react-router-dom";

import "./BoxDesign.css";

const NextArrow = ({ onClick }) => {
  return (
    <div className="arrow next" onClick={onClick}>
      ❱
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div className="arrow prev" onClick={onClick}>
      ❰
    </div>
  );
};
const BoxSetupDesign = () => {
  const history = useHistory();

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const backto = () => {
    history.push("/box-setup-information");
  };

  return (
    <div className="box-Design">
      <div className="boxtitle">
        <h4>Memento Box setup</h4>
      </div>
      <div>
        <h5>Step 1 of 2: Information</h5>
        <h6>Select your favorite box color</h6>
      </div>

      <Slider {...settings}>
        {imgSlider.map((image, index) => (
          <div key={index} className="photo-content">
            <img src={image} alt={`Slide ${index}`} className="slider-image" />
          </div>
        ))}
      </Slider>
      <div className="next-btn">
        <button onClick={backto}> back</button>
        <button type="submit">Next step</button>
      </div>
    </div>
  );
};
export default BoxSetupDesign;
