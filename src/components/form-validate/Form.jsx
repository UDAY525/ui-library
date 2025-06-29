import React, { useState } from "react";
import "./style.css";

const Form = () => {
  const formConfig = [
    { id: 1, type: "email", name: "Email", placeholder: "Enter your email" },
    { id: 2, type: "text", name: "Name", placeholder: "Enter your name" },
    { id: 3, type: "number", name: "Age", placeholder: "Enter your age" },
  ];
  const initialState = formConfig.reduce(
    (accumulate, field) => (accumulate[field] = "")
  );
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const formDataChangeHandler = (e, name) => {
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const validateForm = () => {
    const newErrors = {};
    formConfig.forEach((field) => {
      const value = formData ? formData[field.name]?.trim?.() || "" : "";

      // Check if empty
      if (!value) {
        newErrors[field.name] = `${field.name} is required`;
        return;
      }

      // Type-specific validation
      if (field.type === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[field.name] = "Invalid email format";
        }
      }

      if (field.type === "number") {
        if (isNaN(value) || Number(value) <= 0) {
          newErrors[field.name] = "Please enter a valid number";
        }
      }

      if (field.name === "Name") {
        if (formData && formData[field.name].trim().length < 3) {
          newErrors[field.name] = "Name should be minimum 3 length";
        }
      }
    });

    return newErrors;
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const currentErrors = validateForm();
    if (Object.keys(currentErrors).length === 0) {
      console.log("Form Submitted", formData);
    } else {
      setErrors(currentErrors);
      console.log("Form validation errors", currentErrors);
    }
  };

  return (
    <div id="formValidateSection">
      <h3>Validate Form</h3>
      <div className="formCard">
        <h3>Customer form</h3>
        <form className="form" onSubmit={(e) => formSubmitHandler(e)}>
          {formConfig.map((item) => {
            return (
              <div className="field" key={item.id}>
                <label htmlFor={item.name}>{item.name}</label>
                <input
                  type={item.type}
                  id={item.name}
                  placeholder={item.placeholder}
                  value={formData[item.name] ?? ""}
                  onChange={(e) => formDataChangeHandler(e, item.name)}
                />
                {errors && errors[item.name] && <p>{errors[item.name]}</p>}
              </div>
            );
          })}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Form;
