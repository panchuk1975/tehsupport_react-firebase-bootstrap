import React from "react";
import "../CSS/ModalBox.scss";
import Octicon, { Alert, Flame } from "@primer/octicons-react";

export const ModalBox = ({
  modalClass,
  modalText,
  modalFunction,
  Id,
  innerFunction,
}) => {
  let setClass = () => {
    modalFunction("modal");
  };
  return (
    <div id={modalClass}>
      <div className="window">
        <form className={modalClass}>
          <div className="top-content">
            <div className="left-text">
              <pre>
                <Octicon icon={Alert} size="medium" ariaLabel="Alert" />            Увага!!!
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
              className="flame"
            />
            <p>{modalText}</p>
            <button
              id="close-btn"
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={() => {
                innerFunction(Id);
                setClass();
              }}
            >
              Видалити дані!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
