document.addEventListener("DOMContentLoaded", function () {
  //Sign Up
  // const editProfileBtn = document.querySelector(".-btn");
  // const editProfileModal = document.querySelector("#edit-profile-modal");
  // const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
  // const editProfileForm = editProfileModal.querySelector(".modal__form");
  // const editProfileName = editProfileModal.querySelector("#profile-name-input");
  // const editProfileDescription = editProfileModal.querySelector(
  //   "#profile-description-input"
  // );

  const modals = document.querySelectorAll(".modal");
  console.log("modals:", modals);
  console.log("type of modals:", typeof modals);

  //Log In
  const signUpBtn = document.querySelectorAll(".header__signup-btn");
  const newSignUpModal = document.querySelector("#signup-modal");
  const newSignUpCloseBtn = newSignUpModal.querySelector(".modal__close-btn");
  const newSignUpForm = newSignUpModal.querySelector(".modal__form");
  const newSignUpName = newSignUpModal.querySelector("#profile-name-input");
  const newSignUpEmail = newSignUpModal.querySelector("#profile-email-input");
  const newSubmitBtn = newSignUpModal.querySelector(".modal__submit-btn");

  function handleEscape(evt) {
    if (evt.key === "Escape") {
      const openedModal = document.querySelector(".modal_is-opened");
      closeModal(openedModal);
    }
  }

  function openModal(modal) {
    modal.classList.add("modal_is-opened");
    document.addEventListener("keydown", handleEscape);
  }

  function closeModal(modal) {
    modal.classList.remove("modal_is-opened");
    document.removeEventListener("keydown", handleEscape);
  }

  modals.forEach((modals) => {
    modals.addEventListener("click", (evt) => {
      if (evt.target === modals) {
        closeModal(modals);
      }
    });
  });

  // editProfileBtn.addEventListener("click", function () {
  //   editProfileName.value = profileNameEl.textContent;
  //   editProfileDescription.value = profileDescriptionEl.textContent;
  //   resetValidation(
  //     editProfileModal,
  //     [editProfileName, editProfileDescription],
  //     config
  //   );
  //   openModal(editProfileModal);
  // });

  // editProfileCloseBtn.addEventListener("click", function () {
  //   closeModal(editProfileModal);
  // });

  signUpBtn.addEventListener("click", function () {
    openModal(newSignUpModal);
  });

  newSignUpCloseBtn.addEventListener("click", function () {
    closeModal(newSignUpModal);
  });

  // previewCloseBtn.addEventListener("click", function () {
  //   closeModal(previewModal);
  // });

  // function handleEditProfileSubmit(evt) {
  //   evt.preventDefault();
  //   profileNameEl.textContent = editProfileName.value;
  //   profileDescriptionEl.textContent = editProfileDescription.value;
  //   closeModal(editProfileModal);
  // }

  // editProfileForm.addEventListener("submit", handleEditProfileSubmit);
});
