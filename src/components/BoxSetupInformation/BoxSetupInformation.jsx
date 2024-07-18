import { useState } from "react";
import DatePicker from "react-datepicker";
import "../BoxSetupInformation/BoxSetupInformation.css";
import "react-datepicker/dist";
import "react-datepicker/dist/react-datepicker.css";
const BoxSetupInformation = () => {
  const [value, setValue] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const occations = [
    {
      id: 1,
      typeOccation: "Graduation",
    },
    {
      id: 2,
      typeOccation: "happy birthday",
    },
  ];
  const handleOptoin = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className>
      <div className="box-setup-title">
        <h3> Mement Box setup</h3>
      </div>
      <div className="box-setup-content">
        <h5> Step 1 of 2: Information</h5>
        <div className="occation">
          <h4>What's the occation?</h4>
          <select id="options" className="form-select" onChange={handleOptoin}>
            <option> select</option>
            {occations.map((ocation) => (
              <option value={ocation.id}>{ocation.typeOccation}</option>
            ))}
          </select>
        </div>
        <div className="celebrate">
          <h4>Who are you celebrating?</h4>
          <input type="text" placeholder="Type name here..." />
        </div>
        <div className="occation-date">
          <h4>When is the occation?</h4>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="MM/dd/yyyy"
          />
        </div>
      </div>
    </div>
  );
};
export default BoxSetupInformation;
