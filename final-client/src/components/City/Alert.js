import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";


export default function AlertButton(props) {
  const notify = () => toast.info(props.text || "Wow how easy");

  return (
    <div>
      <button
        className="add-button"
        onClick={() => {
          notify();
          props.onClick();
        }}
      ><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNjAiIGhlaWdodD0iNjAiCnZpZXdCb3g9IjAgMCAzMCAzMCIKc3R5bGU9IiBmaWxsOiMwMDAwMDA7Ij4gICAgPHBhdGggZD0iTTE1LDNDOC4zNzMsMywzLDguMzczLDMsMTVjMCw2LjYyNyw1LjM3MywxMiwxMiwxMnMxMi01LjM3MywxMi0xMkMyNyw4LjM3MywyMS42MjcsMywxNSwzeiBNMjAsMTZoLTR2NCBjMCwwLjU1My0wLjQ0OCwxLTEsMXMtMS0wLjQ0Ny0xLTF2LTRoLTRjLTAuNTUyLDAtMS0wLjQ0Ny0xLTFzMC40NDgtMSwxLTFoNHYtNGMwLTAuNTUzLDAuNDQ4LTEsMS0xczEsMC40NDcsMSwxdjRoNCBjMC41NTIsMCwxLDAuNDQ3LDEsMVMyMC41NTIsMTYsMjAsMTZ6Ij48L3BhdGg+PC9zdmc+"/></button>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </div>
  );
}
