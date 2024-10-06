import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import "./Keypad.css";

const Keypad = ({ onSubmit }) => {
  const maxPinLength = 6;
  const blankPin = "------";
  const [pin, setPin] = useState(blankPin);
  const [pin2, setPin2] = useState(blankPin);
  const [keypad, setKeypad] = useState([]);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState("");

  let encryptedPIN = "";

  useEffect(() => {
    generateRandomKeypad();
  }, []);

  const generateRandomKeypad = () => {
    const numbers = Array.from({ length: 10 }, (_, i) => i.toString());
    setKeypad(numbers.sort(() => Math.random() - 0.5));
  };

  const handleButtonClick = (num) => {
    if (pin.includes("-")) {
      const pos = pin.indexOf("-");
      const newPin = pin.substring(0, pos) + num + pin.substring(pos + 1);
      setPin(newPin);
      console.log(`Pin: Replaced position ${pos} in ${pin} with ${num}`);
      generateRandomKeypad(); // Randomize the keypad after each tap
    } else if (pin2.includes("-")) {
      const pos = pin2.indexOf("-");
      const newPin2 = pin2.substring(0, pos) + num + pin2.substring(pos + 1);
      setPin2(newPin2);
      console.log(`Pin2: Replaced position ${pos} in ${pin2} with ${num}`);
      generateRandomKeypad(); // Randomize the keypad after each tap
    }
  };

  const encryptPin = (pin) => {
    //TODO: retrieve public RSA key from servier/microservice
    return CryptoJS.AES.encrypt(pin, "your-secret-key").toString();
  };

  const clearPin = () => {
    setPin(blankPin);
    setPin2(blankPin);
    generateRandomKeypad(); // Randomize the keypad after each tap
  };

  const handleSubmit = () => {
    if (pin.length === maxPinLength && !pin.includes("-")) {
      encryptedPIN = encryptPin(pin);
      setShowPasswordInput(true);
    } else {
      console.error("PIN must be 6 digits long");
    }
  };

  const handlePasswordSubmit = () => {
    // Add your password validation logic here
    onSubmit(encryptedPIN);
    setShowPasswordInput(false);
    setPin(blankPin);
    setPin2(blankPin);
    setPassword("");
  };

  return (
    <div className="keypad-modal">
      <div className="keypad">
        <br />
        <div>
          <div className="pin-display">
            {pin.split("").map((v, i) => (
              <span key={i}>{v === "-" ? "- " : "* "}</span>
            ))}
          </div>
          Choose a 6 digit pin
          <br />
          <div className="pin-display">
            {pin2.split("").map((v, i) => (
              <span key={i}>{v === "-" ? "- " : "* "}</span>
            ))}
          </div>
          <span hidden={!pin2.includes("-") || pin.includes("-")}>
            Choose the same 6 digits again
          </span>
          <br />
          <span
            hidden={pin2.includes("-") || pin.includes("-") || pin === pin2}
          >
            Both PINs don't match
          </span>
        </div>
        <br />
        {keypad.length > 0 &&
          keypad.map((num) => (
            <button
              key={num}
              onClick={() => handleButtonClick(num)}
              disabled={!pin.includes("-") && !pin2.includes("-")}
            >
              {num}
            </button>
          ))}
        <button className="clear" onClick={clearPin} disabled={pin === pin2}>
          Clear
        </button>
        <button
          className="submit"
          onClick={handleSubmit}
          disabled={pin.includes("-") || pin !== pin2}
        >
          Submit
        </button>
      </div>

      {showPasswordInput && (
        <div className="password-overlay">
          Hand back tablet to staff to proceed
          <input
            type="password"
            className="form-control"
            placeholder="enter staff password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handlePasswordSubmit}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Keypad;
