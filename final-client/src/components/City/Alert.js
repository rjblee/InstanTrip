import React from "react";
import { toast } from "react-toastify";
import "../../styles/City.css";

export default function AlertButton(props) {
  const notify = () => toast.info(props.text || "Wow how easy");

  return (
    <div>
      <button
        className="example_g"
        onClick={() => {
          notify();
          props.onClick();
        }}
      >Add
      </button>

     
    </div>
  );
}