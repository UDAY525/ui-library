import React, { useEffect, useState } from 'react'

const RandomColor = () => {
    const [colorType,setColorType] = useState("hex");
    const [color,setColor] = useState("#000000");
    function randomColorUtility(length){
        return Math.floor(Math.random()*length);
    }
    function handleRgbGenerator(){
        const r = randomColorUtility(256);
        const g = randomColorUtility(256);
        const b = randomColorUtility(256);
        setColor(`rgb(${r},${g}, ${b})`);
    }
    function handleHexGenerator(){
        const hex = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
        let hexColor = "#";
        for(let i=0;i<6;i++){
            hexColor += hex[randomColorUtility(hex.length)];
        }
        setColor(hexColor)
    }
    useEffect(()=>{
        if(colorType === "rgb")
            handleRgbGenerator();
        else
            handleHexGenerator();
    },[])
  return (
    <div style={{
        background: color,
      }}>
        <button onClick={() => setColorType("hex")}>Create HEX Color</button>
        <button onClick={() => setColorType("rgb")}>Create RGB Color</button>
        <button onClick={colorType==='hex'?handleHexGenerator:handleRgbGenerator}>Generate Random Color</button>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          fontSize: "60px",
          marginTop: "50px",
          flexDirection  :'column',
          gap :'20px'
        }}>
            <h3>{colorType==='hex'?"HEX Color":"RGB Color"}</h3>
            <h2>{color}</h2>
        </div>
    </div>
  )
}

export default RandomColor