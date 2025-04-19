import React, { useState } from "react";
// import './style.css';
import addFolderIcon from './add-folder.png'; // Import the image properly

const FolderItem = ({ data }) => {
  const [folderData, setFolderData] = useState(data); // Maintain local state for folder data
  const [openFolders, setOpenFolders] = useState({}); // Track open state for each folder
  const [hoveredFolder, setHoveredFolder] = useState(null); // Track hovered folder

  if (!folderData || folderData.length === 0) return null; // Ensure a valid return for empty data

  const handleFolderClick = (e, folderId) => {
    e.stopPropagation();
    setOpenFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId], // Toggle the open state for the clicked folder
    }));
  };

  const handleAddFolder = (e, folderId) => {
    e.stopPropagation();
    const newFolderName = prompt('Enter new folder name');
    if (newFolderName) {
      addNewItem(folderId, newFolderName, true); // Add a new folder
    }
  };

  const handleAddFile = (e, folderId) => {
    e.stopPropagation();
    const newFileName = prompt('Enter new file name');
    if (newFileName) {
      addNewItem(folderId, newFileName, false); // Add a new file
    }
  };

  const handleRemoveItem = (e, folderId) => {
    e.stopPropagation();
    const updatedData = [...folderData];

    const removeItemRecursively = (items) => {
      return items.filter((item) => {
        if (item.id === folderId) return false; // Remove the matching item
        if (item.children) {
          item.children = removeItemRecursively(item.children);
        }
        return true;
      });
    };

    const newData = removeItemRecursively(updatedData);
    setFolderData(newData); // Update the state with the new structure
  };

  const addNewItem = (folderId, newItemName, isFolder) => {
    const updatedData = [...folderData];

    const addItemRecursively = (items) => {
      items.forEach((item) => {
        if (item.id === folderId) {
          if (!item.children) item.children = [];
          item.children.push({
            id: `${folderId}-${item.children.length + 1}`, // Generate a unique ID
            filename: newItemName,
            isFolder: isFolder,
            children: isFolder ? [] : null,
          });
        } else if (item.children) {
          addItemRecursively(item.children);
        }
      });
    };

    addItemRecursively(updatedData);
    setFolderData(updatedData); // Update the state with the new structure
  };

  return (
    <>
      {folderData.map((folder) => (
        <div
          key={folder.id}
          className={`folder-container ${!folder.children || folder.children.length === 0 ? 'empty' : ''}`}
          onMouseEnter={() => setHoveredFolder(folder.id)}
          onMouseLeave={() => setHoveredFolder(null)}
        >
          <div
            className={folder.isFolder ? 'folderItem' : 'fileItem'}
            onClick={(e) => handleFolderClick(e, folder.id)}
          >
            {folder.filename}
            {hoveredFolder === folder.id && folder.isFolder && (
              <>
                <img
                  src={addFolderIcon}
                  alt="Add Folder"
                  className="add-folder-icon"
                  onClick={(e) => handleAddFolder(e, folder.id)}
                />
                <button
                  className="add-file-button"
                  onClick={(e) => handleAddFile(e, folder.id)}
                >
                  + File
                </button>
                <button
                  className="remove-item-button"
                  onClick={(e) => handleRemoveItem(e, folder.id)}
                >
                  Remove
                </button>
              </>
            )}
          </div>
          {openFolders[folder.id] && folder?.children && folder.children.length > 0 && (
            <FolderItem data={folder.children} />
          )}
        </div>
      ))}
    </>
  );
};

export default FolderItem;
