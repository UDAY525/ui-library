import React, { useState } from "react";
import "../group-check/style.css";

const checkBoxesData = [
  {
    id: "1",
    name: "Fruits",
    children: [
      {
        id: "1.1",
        name: "Citrus",
        children: [
          {
            id: "1.1.1",
            name: "Orange",
            children: [
              {
                id: "1.1.1.1",
                name: "Blood Orange",
                children: [],
              },
              {
                id: "1.1.1.2",
                name: "Navel Orange",
                children: [],
              },
            ],
          },
          {
            id: "1.1.2",
            name: "Lemon",
            children: [],
          },
          {
            id: "1.1.3",
            name: "Lime",
            children: [
              {
                id: "1.1.3.1",
                name: "Key Lime",
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: "1.2",
        name: "Berries",
        children: [
          {
            id: "1.2.1",
            name: "Strawberry",
            children: [],
          },
          {
            id: "1.2.2",
            name: "Blueberry",
            children: [
              {
                id: "1.2.2.1",
                name: "Wild Blueberry",
                children: [],
              },
              {
                id: "1.2.2.2",
                name: "Highbush Blueberry",
                children: [],
              },
            ],
          },
          {
            id: "1.2.3",
            name: "Raspberry",
            children: [],
          },
        ],
      },
      {
        id: "1.3",
        name: "Tropical",
        children: [
          {
            id: "1.3.1",
            name: "Mango",
            children: [
              {
                id: "1.3.1.1",
                name: "Alphonso Mango",
                children: [],
              },
              {
                id: "1.3.1.2",
                name: "Haden Mango",
                children: [],
              },
            ],
          },
          {
            id: "1.3.2",
            name: "Pineapple",
            children: [],
          },
          {
            id: "1.3.3",
            name: "Papaya",
            children: [
              {
                id: "1.3.3.1",
                name: "Red Lady Papaya",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

const CheckBox = () => {
  const [checked, setChecked] = useState({});

  const handleOnChangeCheck = (node, e) => {
    setChecked((prev) => {
      const newState = { ...prev, [node.id]: e.target.checked };
      const isChecked = e.target.checked;

      // Update all children recursively
      const updateChildren = (node) => {
        node.children?.forEach((child) => {
          newState[child.id] = isChecked;
          child.children && updateChildren(child);
        });
      };
      updateChildren(node);

      // Update parent nodes recursively
      const updateParents = (node, parentData) => {
        if (!parentData) return;

        const allChildrenChecked = parentData.children.every(
          (child) => newState[child.id]
        );
        newState[parentData.id] = allChildrenChecked;

        // Find the parent's parent and update recursively
        checkBoxesData.forEach((topLevelNode) =>
          findAndUpdateParent(topLevelNode, parentData.id)
        );
      };

      const findAndUpdateParent = (currentNode, childId) => {
        if (!currentNode.children) return null;

        if (currentNode.children.some((child) => child.id === childId)) {
          updateParents(currentNode, currentNode);
          return currentNode;
        }

        for (const child of currentNode.children) {
          const parent = findAndUpdateParent(child, childId);
          if (parent) return parent;
        }

        return null;
      };

      // Start updating parents from the current node
      checkBoxesData.forEach((topLevelNode) =>
        findAndUpdateParent(topLevelNode, node.id)
      );

      return newState;
    });
  };

  return (
    <div>
      <h1>CheckBox</h1>
      <CheckBoxItem
        checkBoxesData={checkBoxesData}
        handleOnChangeCheck={handleOnChangeCheck}
        checked={checked}
      />
    </div>
  );
};

const CheckBoxItem = ({ checkBoxesData, handleOnChangeCheck, checked }) => {
  return (
    <div>
      {checkBoxesData.map((checkItem, index) => (
        <div key={index} className="check-container">
          <div className="checkbox-content">
            <input
              type="checkbox"
              checked={!!checked[checkItem.id]} // Use checked attribute
              onChange={(e) => handleOnChangeCheck(checkItem, e)}
            />
            <span>{checkItem.name}</span>
          </div>
          {checkItem.children && (
            <CheckBoxItem
              checkBoxesData={checkItem.children}
              handleOnChangeCheck={handleOnChangeCheck}
              checked={checked}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CheckBox;
