import React, { useState } from "react";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { GiLoveSong } from "react-icons/gi";
import { FaVideo } from "react-icons/fa6";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import { submitForm } from "./formActions"; // Import the action
import "../BoxSetupInformation/BoxSetupInformation.css";
import "react-datepicker/dist/react-datepicker.css";

const BoxSetupInformation = () => {
  const history = useHistory();
  const [occation, setOccation] = useState("");
  const [celebrating, setCelebrating] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [collaborators, setCollaborators] = useState([{ name: "", email: "" }]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const occations = [
    { id: 1, typeOccation: "Graduation" },
    { id: 2, typeOccation: "Happy Birthday" },
  ];

  const handleOption = (event) => {
    setOccation(event.target.value);
  };

  const handleCollaboratorChange = (index, field, value) => {
    const newCollaborators = [...collaborators];
    newCollaborators[index][field] = value;
    setCollaborators(newCollaborators);
  };

  const addCollaborator = () => {
    setCollaborators([...collaborators, { name: "", email: "" }]);
  };

  const nextSteps = () => {
    history.push("/box-setup-design");
  };

  const validate = () => {
    const newErrors = {};
    if (!occation) newErrors.occation = "Occation is required";
    if (!celebrating) newErrors.celebrating = "Celebrating name is required";
    collaborators.forEach((collaborator, index) => {
      if (!collaborator.name)
        newErrors[`collaborator_name_${index}`] = "Name is required";
      if (!collaborator.email)
        newErrors[`collaborator_email_${index}`] = "Email is required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      const formData = {
        occation,
        celebrating,
        startDate,
        collaborators,
        message,
      };
      dispatch(submitForm(formData));
    }
  };

  return (
    <div className="box-setup-information">
      <div className="box-setup-title">
        <h3> Memento Box Setup</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="box-setup-content">
          <h5> Step 1 of 2: Information</h5>
          <div className="occation">
            <h4>What's the occation?</h4>
            <select
              id="options"
              className="form-select"
              value={occation}
              onChange={handleOption}
            >
              <option value="">Select</option>
              {occations.map((ocation) => (
                <option key={ocation.id} value={ocation.typeOccation}>
                  {ocation.typeOccation}
                </option>
              ))}
            </select>
            {errors.occation && <p className="error">{errors.occation}</p>}
          </div>
          <div className="celebrate">
            <h4>Who are you celebrating?</h4>
            <input
              type="text"
              placeholder="Type name here..."
              value={celebrating}
              onChange={(e) => setCelebrating(e.target.value)}
            />
            {errors.celebrating && (
              <p className="error">{errors.celebrating}</p>
            )}
          </div>
          <div className="occation-date">
            <h4>When is the occation?</h4>
            <DatePicker
              className="date"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="MM/dd/yyyy"
            />
          </div>
          <div className="collaborate">
            <div className="coll-title">
              <h4>Who is collaborating on this?</h4>
              <a href="#"> Sync contacts</a>
            </div>
            <div className="coll-contacts">
              {collaborators.map((collaborator, index) => (
                <div key={index} className="collaborator-inputs">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name..."
                    value={collaborator.name}
                    onChange={(e) =>
                      handleCollaboratorChange(index, "name", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    name="email"
                    placeholder="Email..."
                    value={collaborator.email}
                    onChange={(e) =>
                      handleCollaboratorChange(index, "email", e.target.value)
                    }
                  />
                  {errors[`collaborator_name_${index}`] && (
                    <p className="error">
                      {errors[`collaborator_name_${index}`]}
                    </p>
                  )}
                  {errors[`collaborator_email_${index}`] && (
                    <p className="error">
                      {errors[`collaborator_email_${index}`]}
                    </p>
                  )}
                </div>
              ))}
              <div className=" next-steps">
                <button type="button" onClick={addCollaborator}>
                  +Add more
                </button>
              </div>
            </div>
          </div>
          <div className="coll-msg">
            <h4>Write a message to those collaborating.</h4>
            <h4>Feel free to include any prompt to help them spark ideas!</h4>
            <textarea
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="prompt-msg-title">
            <div>
              <h4>Prompt suggestions</h4>
            </div>
            <div>
              <ul>
                <li>
                  <MdOutlinePhotoSizeSelectActual
                    style={{ marginRight: "20px" }}
                  />
                  Send in your favorite photo of the two of you together
                </li>
                <li>
                  <FaVideo style={{ marginRight: "20px" }} />
                  Record a video of your birthday message
                </li>
                <li>
                  <GiLoveSong style={{ marginRight: "20px" }} />
                  Add to a playlist with songs that make you think of them.
                </li>
              </ul>
            </div>
          </div>
          <div className="next-steps">
            <button type="submit" onClick={nextSteps}>
              Next step
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BoxSetupInformation;
