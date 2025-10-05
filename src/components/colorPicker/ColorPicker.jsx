import React, { useState } from "react";
import "./ColorPicker.css";
import { ChromePicker } from "react-color";

const ColorPicker = ({sendColor,initialColor}) => {
    const [color, setColor] = useState("");
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [displayColor, setDisplayColor] = useState(false);

    const handleColorClick = () => {
        setDisplayColorPicker(!displayColorPicker)
    }

    const handleColorClose = () => {
        setDisplayColorPicker(false)
    }

    const handleColorChange = (color) => {
        setColor(color.hex)
        setDisplayColor(true)
    }

    const handleColorDetail = () => {
        sendColor(color);
    }

    const styles = {
    popover: {
      position: "absolute",
      zIndex: "2",
      bottom: 0,
      right:"10px",
      bottom:"60px",
    },
    cover: {
      position: "fixed",
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
    },
  };

  return (
    <div className="color-picker-container">
      <div
        className="color-picker-box"
        style={ displayColor ? {background: `${color}`}: {background:`${initialColor}`}}
        onClick={()=>{
            handleColorClick();
            handleColorDetail();
        }}
      >
        {displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={handleColorClose} />
            <ChromePicker color={color} onChange={handleColorChange} />
          </div>
        ) : null}
      </div>
      <div style={{color:"black"}}>{displayColor ? color : initialColor}</div>
      
    </div>
  );
};

export default ColorPicker;
