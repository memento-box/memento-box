import { useState } from "react";
import "../Boxdesign/BoxDesign.css";
import { imgSliders } from "./imgSlider";
import { useHistory } from "react-router-dom";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl"; // Ensure you have this library installed

const BoxSetupDesign = () => {
  const [current, setCurrent] = useState(0);
  const history = useHistory();

  const slideRight = () => {
    setCurrent(current === imgSliders.length - 1 ? 0 : current + 1);
  };

  const slideLeft = () => {
    setCurrent(current === 0 ? imgSliders.length - 1 : current - 1);
  };
  const backto = () => {
    history.push("/box-setup-information");
  };

  return (
    <div className="box-design">
      <div className="box-title">
        <h4>Memento Box Setup</h4>
      </div>
      <div className="content">
        <div className="step-two">
          <h5>Step2 of 2: Box design</h5>
          <h6>By clicking the arrows: choose your favorite box</h6>
        </div>
        <div className="carousel">
          <div className="carousel_wrapper">
            {imgSliders.map((image, index) => (
              <div
                key={index}
                className={
                  index === current
                    ? "carousel_card carousel_card-active"
                    : "carousel_card"
                }
              >
                <img className="card_image" src={image.img} alt="" />
                <div className="card_overlay">
                  <h2 className="card_title">{image.title}</h2>
                </div>
              </div>
            ))}
            <div className="carousel_arrow_left" onClick={slideLeft}>
              <SlArrowLeft />
            </div>
            <div className="carousel_arrow_right" onClick={slideRight}>
              <SlArrowRight style={{ height: "100px" }} />
            </div>
            <div className="carousel_pagination">
              {imgSliders.map((_, index) => (
                <div
                  key={index}
                  className={
                    index === current
                      ? "pagination_dot pagination_dot-active"
                      : "pagination_dot"
                  }
                  onClick={() => setCurrent(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="next-btn">
          <button onClick={backto}> back </button>
          <button>Finish and get started</button>
        </div>
      </div>
    </div>
  );
};

export default BoxSetupDesign;
