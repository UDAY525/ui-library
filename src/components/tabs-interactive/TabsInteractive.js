import React, { useEffect, useState } from "react";
import "./style.css";
const TabsInteractive = () => {
  const tabsConfig = [
    { id: "1", name: "Dashboard", content: "This is dashboard" },
    { id: "2", name: "Settings", content: "This is settings" },
    { id: "3", name: "Profile", content: "This is profile" },
  ];
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        setActiveTab((prev) => (prev + 1) % tabsConfig.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
  }, [tabsConfig.length]);

  return (
    <div className="tabs-outer-container">
      <h3>TabsInteractive</h3>
      <div className="tabs-btns-nav">
        {tabsConfig.map((tab, index) => (
          <button
            tabIndex={0}
            className={`${activeTab === index ? "active" : ""}`}
            key={index}
            onClick={() => setActiveTab(index)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="tab-content">{tabsConfig[activeTab].content}</div>
    </div>
  );
};

export default TabsInteractive;
