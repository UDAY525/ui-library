import React, { useEffect, useRef, useState } from "react";
import "./style.css";

const DropOutside = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const options = ["Option 1", "Option 2", "Option 3"];

  return (
    <div id="dropdownSection">
      <h3>Close Dropdown on Outside Click</h3>

      <div id="dropDownOutside" ref={dropdownRef} className="dropdown">
        <button onClick={toggleDropdown} className="dropdown-toggle">
          {selected || "Select an option"}
        </button>

        {isOpen && (
          <ul className="dropdown-menu">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleOptionSelect(option)}
                className="dropdown-item"
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DropOutside;
