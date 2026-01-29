import {
  resetValidation,
  disableButton,
  enableValidation,
  settings,
} from "../scripts/validation.js";
import "./index.css";
import { Api } from "../utils/Api.js";

enableValidation(settings);

// Functions that open and close modals
function openModal(modal) {
  modal.classList.add("modal_is-open");
  closeModalWithOverlayAndEscape(modal);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-open");
  removeListeners(modal);
}

const modalCloseButtons = document.querySelectorAll(".modal__close-btn");
modalCloseButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

// Closing Modals by Clicking on Overlay or Pressing Escape
function clickCloseModal(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
};

function escCloseModal(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal.modal_is-open");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
};

function closeModalWithOverlayAndEscape(openedModal) {
  openedModal.addEventListener("click", clickCloseModal);
  document.addEventListener("keydown", escCloseModal);
};

function removeListeners(openedModal) {
  openedModal.removeEventListener("click", clickCloseModal);
  document.removeEventListener("keydown", escCloseModal);
};

// API Instantiation
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "bc01c42a-5a4c-4f24-aa6e-4ea372a00bfe",
    "Content-Type": "application/json",
  },
});

// Get Profile Content
api
  .getUserInfo()
  .then((result) => {
    profileName.textContent = result.name;
    profileDescription.textContent = result.about;
    profileAvatar.src = result.avatar;
  })
  .catch((err) => {
    console.error(err);
  });

// Get Initial Cards
api
  .getInitialCards()
  .then((initialCards) => {
    initialCards.forEach((initialCard) => {
      const newCardElement = getCardElement(initialCard);
      cardsContainer.prepend(newCardElement);
    });
  })
  .catch((err) => {
    console.error(err);
  });

// Edit Avatar
const editAvatarButton = document.querySelector(
  ".profile__edit-button_type_avatar",
);
const editAvatarModal = document.querySelector("#edit-profile-avatar-modal");
const editAvatarInput = editAvatarModal.querySelector(
  ".form__input_type_edit-avatar",
);
const editAvatarForm = editAvatarModal.querySelector(".form");
const editAvatarSubmitbtn = editAvatarForm.querySelector(".form__btn");
const avatarPic = document.querySelector(".profile__avatar");

editAvatarButton.addEventListener("click", () => {
  openModal(editAvatarModal);
});

function handleEditAvatarSubmit(evt, avatar) {
  evt.preventDefault();
  editAvatarSubmitbtn.textContent = "Saving...";
  api
    .updateProfileAvatar(avatar)
    .then(() => {
      avatarPic.src = avatar;
      closeModal(editAvatarModal);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editAvatarSubmitbtn.textContent = "Save";
    });
}
editAvatarForm.addEventListener("submit", (evt) => {
  handleEditAvatarSubmit(evt, editAvatarInput.value);
});

// Edit Profile Modal Elements
const editProfileButton = document.querySelector(
  ".profile__edit-button_type_edit-profile",
);
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileForm = editProfileModal.querySelector(".form");
const editProfileNameInput = editProfileForm.querySelector("#name");
const editProfileDescriptionInput =
  editProfileForm.querySelector("#description");
const editProfileSubmitButton = editProfileForm.querySelector(".form__btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__avatar");

// Edit Profile Button
editProfileButton.addEventListener("click", () => {
  openModal(editProfileModal);
  resetValidation(
    editProfileForm,
    Array.from(editProfileForm.querySelectorAll(settings.inputSelector)),
    settings,
  );
  editProfileNameInput.value = profileName.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
});

// Handle Edit Profile Submission
function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  editProfileSubmitButton.textContent = "Saving...";
  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((editedProfile) => {
      profileName.textContent = editedProfile.name;
      profileDescription.textContent = editedProfile.about;
      closeModal(editProfileModal);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editProfileSubmitButton.textContent = "Save";
    });
}
editProfileForm.addEventListener("submit", handleEditProfileSubmit);

// New Card Creation
const cardsContainer = document.querySelector(".cards");
const templateCard = document.querySelector("#card-template").content;

function getCardElement(data) {
  const cardElement = templateCard.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardId = data._id;
  likeButton.addEventListener("click", () => {
    handleLikeButton(cardId, likeButton);
  });
  if (data.isLiked) {
    likeButton.classList.add("card__like-button_active");
  }
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    handleDeleteButton(cardElement, data);
  });
  cardImage.addEventListener("click", () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewTitle.textContent = data.name;
    openModal(previewImageModal);
  });
  return cardElement;
}

// New Post Modal Elements
const newPostButton = document.querySelector(".profile__new-post-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostForm = newPostModal.querySelector(".form");
const newPostImgLinkInput = newPostForm.querySelector("#img-link");
const newPostCaptionInput = newPostForm.querySelector("#caption");
const newPostSubmitBtn = newPostForm.querySelector(".form__btn");

// New Post Button
newPostButton.addEventListener("click", () => {
  openModal(newPostModal);
});

// Handle New Post Submission
function handleNewPostSubmit(evt) {
  evt.preventDefault();
  newPostSubmitBtn.textContent = "Saving...";
  api
    .addCard({
      name: newPostCaptionInput.value,
      link: newPostImgLinkInput.value,
    })
    .then((newCard) => {
      const newCardElement = getCardElement(newCard);
      cardsContainer.prepend(newCardElement);
      evt.target.reset();
      disableButton(newPostSubmitBtn, settings);
      closeModal(newPostModal);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      newPostSubmitBtn.textContent = "Save";
    });
}
newPostForm.addEventListener("submit", handleNewPostSubmit);

// Preview Image Modal
const previewImageModal = document.querySelector("#preview");
const previewImage = previewImageModal.querySelector(".modal__image");
const previewTitle = previewImageModal.querySelector(
  ".modal__title_type_image",
);

// Card Deletion
const confirmDeleteModal = document.querySelector("#confirm-delete-modal");
const confirmDeleteBtn = confirmDeleteModal.querySelector(
  ".form__btn_type_confirm-delete",
);
let selectedCard;
let selectedCardId;

function handleDeleteButton(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  openModal(confirmDeleteModal);
}

// Handle Delete Submission
function handleDeleteSubmit(evt) {
  evt.preventDefault();
  confirmDeleteBtn.textContent = "Deleting...";
  api
    .removeCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(confirmDeleteModal);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      confirmDeleteBtn.textContent = "Delete";
    });
}

const deleteForm = confirmDeleteModal.querySelector(".modal__form");
const deleteCancel = confirmDeleteModal.querySelector(".form__btn_type_cancel");
deleteForm.addEventListener("submit", handleDeleteSubmit);
deleteCancel.addEventListener("click", () => {
  closeModal(confirmDeleteModal);
});

// Add and remove likes
function handleLikeButton(cardId, likeButton) {
  if (likeButton.classList.contains("card__like-button_active")) {
    likeButton.classList.remove("card__like-button_active");
    api.removeLike(cardId).catch((err) => {
      console.error(err);
      likeButton.classList.add("card__like-button_active");
    });
  } else {
    likeButton.classList.add("card__like-button_active");
    api.addLike(cardId).catch((err) => {
      console.error(err);
      likeButton.classList.remove("card__like-button_active");
    });
  }
}
