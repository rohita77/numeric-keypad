import React, { useState } from "react";
import Keypad from "./Keypad"; // Import your Keypad component
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleKeypadSubmit = (encryptedPin) => {
    console.log("Encrypted PIN:", encryptedPin);
    //TODO: Handle the encrypted PIN as needed
    //TODO: submit the encrypted pin directly to microservice

    handleCloseModal();
  };

  return (
    <div className="App">
      <button className="btn btn-primary" onClick={handleOpenModal}>
        Open Keypad
      </button>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Enter PIN</h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleCloseModal}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <Keypad onSubmit={handleKeypadSubmit} />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
