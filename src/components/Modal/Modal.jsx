import React, { useEffect, useRef } from "react";
import "./Modal.css";

const Modal = ({ modalType, setModalType }) => {
  const modalRef = useRef(null);

  const closeModal = () => setModalType(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") closeModal();
    };
    if (modalType) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [modalType]);

  const handleOutsideClick = (e) => {
    if (e.target === modalRef.current) closeModal();
  };

  if (!modalType) return null;

  return (
    <div
      className="modal modal_is-opened"
      ref={modalRef}
      onClick={handleOutsideClick}
    >
      <div className="modal__container">
        <button
          type="button"
          className="modal__close-btn"
          onClick={closeModal}
        ></button>
        <h2 className="modal__title">
          {modalType === "signup" ? "Sign Up" : "Log In"}
        </h2>
        <form
          className="modal__form"
          onSubmit={(e) => {
            e.preventDefault();
            closeModal();
          }}
        >
          {modalType === "signup" ? (
            <>
              <label className="modal__label">
                Name
                <input
                  type="text"
                  className="modal__input"
                  placeholder="Type your name"
                  required
                  minLength="2"
                  maxLength="40"
                />
                <span className="modal__error"></span>
              </label>
              <label className="modal__label">
                Email
                <input
                  type="email"
                  className="modal__input"
                  placeholder="email"
                  required
                  minLength="2"
                  maxLength="200"
                />
                <span className="modal__error"></span>
              </label>
            </>
          ) : (
            <>
              <label className="modal__label">
                Email
                <input
                  type="email"
                  className="modal__input"
                  placeholder="Type your email"
                  required
                  minLength="2"
                  maxLength="40"
                />
                <span className="modal__error"></span>
              </label>
              <label className="modal__label">
                Password
                <input
                  type="password"
                  className="modal__input"
                  placeholder="Password"
                  required
                  minLength="2"
                  maxLength="200"
                />
                <span className="modal__error"></span>
              </label>
            </>
          )}
          <button type="submit" className="modal__submit-btn">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
