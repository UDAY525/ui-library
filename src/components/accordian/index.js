import React, { useState } from 'react'
import data from "./data.js"
import './style.css'

const Accordion = () => {
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [selected,setSelected] = useState(null);
  const [multiple,setMultiple] = useState([]);

  function handleSingleSelection(id){
    setSelected(prev => prev==id?null:id);
  }
  function handleMultiSelection(id){
    if(multiple.includes(id))
      setMultiple(multiple.filter(item => item!==id));
    else
    setMultiple([...multiple,id]);
  }
  function handleMultiSlectionToggle() {
    setEnableMultiSelection(prev => !prev);
    setSelected(null);
    setMultiple([]);
  }
  return (
    <div className='acc-wrapper'>
    <button onClick={handleMultiSlectionToggle}>
      {enableMultiSelection ? "Disable Multi Selection" : "Enable Multi Selection"}
    </button>
    <div className='accordion'>
      {data && data.length > 0 ? (
        data.map((dataItem) => (
          <div className='item' key={dataItem.id}>
            <div className='title' onClick={() => 
              enableMultiSelection 
              ? handleMultiSelection(dataItem.id)
              : handleSingleSelection(dataItem.id)
            }>
              <h3>{dataItem.question}</h3>
              <span>+</span>
            </div>
            {
              enableMultiSelection
                ? multiple.includes(dataItem.id) && (
                  <div className='acc-content'>{dataItem.answer}</div>
                )
                : selected === dataItem.id && (
                  <div className='acc-content'>{dataItem.answer}</div>
                )
            }
          </div>
        ))
      ) : (
        <div>No Data Found</div>
      )}
    </div>
  </div>
  )
}

export default Accordion;