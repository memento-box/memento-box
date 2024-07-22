import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchOccasions, submitBoxSetup } from "../../redux/reducers/boxSetupSlice.reducer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa";
import "./BoxSetupInformation.css";

const BoxSetupInformation = () => {
  const history = useHistory();
  const [occasionId, setOccasionId] = useState("");
  const [celebrating, setCelebrating] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [collaborators, setCollaborators] = useState([{ name: "", email: "" }]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const occasions = useSelector((state) => state.boxSetup.occasions);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOccasionsData = async () => {
      try {
        await dispatch(fetchOccasions());
      } catch (error) {
        console.error("Error fetching occasions:", error);
      }
    };
    fetchOccasionsData();
  }, [dispatch]);

  const handleOption = (event) => {
    setOccasionId(event.target.value);
  };

  const handleCollaboratorChange = (index, field, value) => {
    const newCollaborators = [...collaborators];
    newCollaborators[index][field] = value;
    setCollaborators(newCollaborators);
  };

  const addCollaborator = () => {
    setCollaborators([...collaborators, { name: "", email: "" }]);
  };

  const validate = () => {
    const newErrors = {};
    if (!occasionId) newErrors.occasionId = "Occasion is required";
    if (!celebrating) newErrors.celebrating = "Celebrating name is required";
    collaborators.forEach((collaborator, index) => {
      if (!collaborator.name) newErrors[`collaborator_name_${index}`] = "Name is required";
      if (!collaborator.email) newErrors[`collaborator_email_${index}`] = "Email is required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      const formData = {
        occasionId,
        celebrating,
        startDate,
        collaborators,
        message,
      };
      dispatch(submitBoxSetup(formData));
      history.push("/box-setup-design");
    }
  };

  // Function to handle prompt button clicks
  const addPromptToMessage = (text) => {
    setMessage((prevMessage) => `${prevMessage}\n${text}`);
  };

  return (
    <div className="box-setup-information">
      <div className="box-setup-title">
        <h3>Memento Box Setup</h3>
      </div>
      <div className="box-setup-content">
        <h5>Step 1 of 2: Box Information</h5>
        <form onSubmit={handleSubmit}>
          <div className="form-group occasion">
            <h4>What's the occasion?</h4>
            <select
              id="occasion"
              className="form-select"
              value={occasionId}
              onChange={handleOption}
            >
              <option value="">Select</option>
              {occasions.map((occ) => (
                <option key={occ.id} value={occ.id}>
                  {occ.name}
                </option>
              ))}
            </select>
            {errors.occasionId && <p className="error">{errors.occasionId}</p>}
          </div>
          <div className="form-group celebrate">
            <h4>Who are you celebrating?</h4>
            <input
              type="text"
              placeholder="Type name here..."
              value={celebrating}
              onChange={(e) => setCelebrating(e.target.value)}
            />
            {errors.celebrating && <p className="error">{errors.celebrating}</p>}
          </div>
          <div className="form-group occasion-date">
            <h4>When is the occasion?</h4>
            <DatePicker
              className="date"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="MM/dd/yyyy"
            />
          </div>
          <div className="form-group collaborate">
            <div className="coll-title">
              <h4>Who is collaborating on this?</h4>
              <a href="#">Sync contacts</a>
            </div>
            <div className="coll-contacts">
              {collaborators.map((collaborator, index) => (
                <div key={index} className="collaborator-inputs">
                  <input
                    type="text"
                    placeholder="Name..."
                    value={collaborator.name}
                    onChange={(e) =>
                      handleCollaboratorChange(index, "name", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Email..."
                    value={collaborator.email}
                    onChange={(e) =>
                      handleCollaboratorChange(index, "email", e.target.value)
                    }
                  />
                  {errors[`collaborator_name_${index}`] && (
                    <p className="error">{errors[`collaborator_name_${index}`]}</p>
                  )}
                  {errors[`collaborator_email_${index}`] && (
                    <p className="error">{errors[`collaborator_email_${index}`]}</p>
                  )}
                </div>
              ))}
              <div className="next-steps">
                <button type="button" onClick={addCollaborator}>
                  + Add more
                </button>
              </div>
            </div>
          </div>
          <div className="form-group coll-msg">
            <h4>Write a message to those collaborating.</h4>
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
          </div>
          <div className="prompt-msg">
            <div className="prompt-item">
              <button type="button" onClick={() => addPromptToMessage("Send in your favorite photo of the two of you together.")}>
                <MdOutlinePhotoSizeSelectActual />
                Photos
              </button>
              <p>Send in your favorite photo of the two of you together.</p>
            </div>
            <div className="prompt-item">
              <button type="button" onClick={() => addPromptToMessage("Record a voice memo talking about your favorite memory of them.")}>
                <FaMicrophone />
                Voice Notes
              </button>
              <p>Record a voice memo talking about your favorite memory of them.</p>
            </div>
            <div className="prompt-item">
              <button type="button" onClick={() => addPromptToMessage("Record a video of your birthday message.")}>
                <FaVideo />
                Video messages
              </button>
              <p>Record a video of your birthday message.</p>
            </div>
          </div>
          <div className="final-steps">
            <button type="submit">Next</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BoxSetupInformation;
