import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
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

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </div>
  );
}