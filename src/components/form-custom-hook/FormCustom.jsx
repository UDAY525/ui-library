import React, { useState } from "react";
import useForm from "./useForm";
import "./style.css";

const FormCustom = () => {
  const formConfig = [
    { id: 1, type: "email", name: "Email", placeholder: "Enter your email" },
    { id: 2, type: "text", name: "Name", placeholder: "Enter your name" },
    { id: 3, type: "number", name: "Age", placeholder: "Enter your age" },
  ];
  const { formData, errors, formDataChangeHandler, setErrors, validateForm } =
    useForm(formConfig);

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

export default FormCustom;
