import React, { useState } from "react";
import { z } from "zod";
import "./style.css";

const FormZodValidate = () => {
  const formConfig = [
    { id: 1, type: "email", name: "Email", placeholder: "Enter your email" },
    { id: 2, type: "text", name: "Name", placeholder: "Enter your name" },
    { id: 3, type: "number", name: "Age", placeholder: "Enter your age" },
  ];

  const formSchema = z.object({
    Age: z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val > 18, {
        message: "Age should be greater than 18",
      }),
    Name: z.string().min(3, "Name should be minimum of 3 characters"),
    Email: z.string().email("Invalid email address"),
  });

  const [formData, setFormData] = useState(
    formConfig.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {})
  );

  const [errors, setErrors] = useState({});

  const formDataChangeHandler = (e, name) => {
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const result = formSchema.safeParse(formData);

    if (result.success) {
      console.log("✅ Form Submitted Successfully:", result.data);
      setErrors({});
    } else {
      // Convert Zod formatted error to flat { fieldName: message } structure
      const formattedErrors = result.error.format();
      const flatErrors = Object.fromEntries(
        Object.entries(formattedErrors)
          .filter(([key]) => key !== "_errors")
          .map(([key, value]) => [key, value._errors[0]])
      );
      setErrors(flatErrors);
      console.log("❌ Validation Errors:", flatErrors);
    }
  };

  return (
    <div id="formValidateSection">
      <h3>Validate Form</h3>
      <div className="formCard">
        <h3>Customer form</h3>
        <form className="form" onSubmit={formSubmitHandler}>
          {formConfig.map((item) => (
            <div className="field" key={item.id}>
              <label htmlFor={item.name}>{item.name}</label>
              <input
                type={item.type}
                id={item.name}
                placeholder={item.placeholder}
                value={formData[item.name]}
                onChange={(e) => formDataChangeHandler(e, item.name)}
              />
              {errors[item.name] && (
                <p className="error">{errors[item.name]}</p>
              )}
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default FormZodValidate;
