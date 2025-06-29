import React, { useState } from "react";

const useForm = (formConfig) => {
  const [formData, setFormData] = useState(
    formConfig.reduce((acc, field) => ({
      ...acc,
      [field]: "",
    }))
  );
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
  return { formData, errors, formDataChangeHandler, setErrors, validateForm };
};

export default useForm;
