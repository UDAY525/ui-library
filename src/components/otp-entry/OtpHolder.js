import React from "react";
import { useState, useRef, useEffect } from "react";
import "./style.css";

const OtpHolder = () => {
  const otpLength = 4;
  const [otpArr, setOtpArr] = useState(new Array(otpLength).fill(""));
  const inputBoxRefs = useRef(new Array(otpLength));

  const handleEachInputChange = (e, index) => {
    const value = e.target.value.trim();
    if (isNaN(value) || value === "") return; // Prevent non-numeric and empty space characters
    const copiedOtpArr = [...otpArr];
    copiedOtpArr[index] = value.slice(-1); // Take only the last character
    setOtpArr(copiedOtpArr);
    if (index + 1 < otpLength) inputBoxRefs.current[index + 1].focus();
  };

  const handleInputKeyChanges = (e, index) => {
    if (e.code === "Space") return; // Prevent spacebar default behavior
    if (e.code === "Backspace") {
      const copiedOtpArr = [...otpArr];
      copiedOtpArr[index] = ""; // Clear the current input
      setOtpArr(copiedOtpArr);
      if (index - 1 >= 0) {
        inputBoxRefs.current[index - 1].focus(); // Move to the previous input box
      }
    }
  };

  useEffect(() => {
    if (inputBoxRefs?.current[0]) {
      inputBoxRefs.current[0].focus();
    }
  }, []);
  console.log(otpArr);
  return (
    <div className="otp-screen">
      <div>OTP Holder</div>
      <div>
        Current Value: <span>{otpArr.join("")}</span>
      </div>
      <div className="otp-wrapper">
        {otpArr.map((curr, index) => (
          <input
            type="text"
            ref={(el) => (inputBoxRefs.current[index] = el)}
            key={index}
            value={curr}
            onChange={(e) => handleEachInputChange(e, index)}
            onKeyDown={(e) => handleInputKeyChanges(e, index)}
          />
        ))}
      </div>
    </div>
  );
};

export default OtpHolder;
