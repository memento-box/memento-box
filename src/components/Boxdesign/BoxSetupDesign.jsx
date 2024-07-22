import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { imgSliders } from "./imgSlider";
import "./BoxDesign.css";
import AlertModal from "./AlertModal.jsx";

const BoxSetupDesign = () => {
  const [current, setCurrent] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
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

  const handleFinish = () => {
    const selectedBox = imgSliders[current];
    setShowAlert(true);
  };
  const handleAlertClose = () => {
    setShowAlert(false);
    history.replace("/adminOverview"); 
  };

  return (
    <div className="box-design">
      <div className="box-title">
        <h4>Memento Box Setup</h4>
      </div>
      <div className="content">
        <div className="step-two">
          <h5>Step 2 of 2: Box design</h5>
          <h6>By clicking the arrows: choose your favorite box</h6>
        </div>
        <div className="carousel">
          <div className="carousel_wrapper">
            {imgSliders.map((slider, index) => (
              <div
                key={index}
                className={
                  index === current
                    ? "carousel_card carousel_card-active"
                    : "carousel_card"
                }
              >
                <img className="carousel_img" src={slider.image} alt="slide" />
              </div>
            ))}
            <button className="carousel_arrow_left" onClick={slideLeft}>
              <SlArrowLeft />
            </button>
            <button className="carousel_arrow_right" onClick={slideRight}>
              <SlArrowRight />
            </button>
          </div>
        </div>
        <div className="back-next">
          <button onClick={backto}>Back</button>
          <button onClick={handleFinish}>Finish</button>
        </div>
      </div>
      {showAlert && (
        <AlertModal
          message="You have successfully created your box"
          onClose={handleAlertClose}
        />
      )}
    </div>
  );
};

export default BoxSetupDesign;
