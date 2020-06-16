import React from "react";
import "../CSS/AlertBox.scss";
import Octicon, { Alert, Flame } from "@primer/octicons-react";

export const AlertBox = ({ modalClass, modalText, modalFunction }) => {
  let setClass = () => {
    modalFunction("modal");
  };
  return (
    <div id={modalClass}>
      <div className="window">
        <div className={modalClass}>
          <div className="top-content">
            <div className="alert-left-text">
              <pre>
                <Octicon icon={Alert} size="medium" ariaLabel="Alert" />          Увага
                !!!
              </pre>
            </div>
            <button
              id="deleteModal"
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={() => setClass()}
            >
              &times;
            </button>
            <Octicon
              icon={Flame}
              size="large"
              ariaLabel="Flame"
              className="alertFlame"
            />
            <hr/>
            <p>{modalText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
