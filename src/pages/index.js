import {
  resetValidation,
  disableButton,
  enableValidation,
  settings,
} from "../scripts/validation.js";
import "./index.css";
import { Api } from "../utils/Api.js";

enableValidation(settings);
// const initialCards = [
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Golden Gate Bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
// ];

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
const clickCloseModal = (evt) => {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
};

const escCloseModal = (evt) => {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal.modal_is-open");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
};

const closeModalWithOverlayAndEscape = (openedModal) => {
  openedModal.addEventListener("click", clickCloseModal);
  document.addEventListener("keydown", escCloseModal);
};

const removeListeners = (openedModal) => {
  openedModal.removeEventListener("click", clickCloseModal);
  document.removeEventListener("keydown", escCloseModal);
};

// Edit Profile Modal Elements
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileForm = editProfileModal.querySelector(".form");
const editProfileNameInput = editProfileForm.querySelector("#name");
const editProfileDescriptionInput =
  editProfileForm.querySelector("#description");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__avatar");

// Edit Profile Button
editProfileButton.addEventListener("click", function () {
  openModal(editProfileModal);
  resetValidation(
    editProfileForm,
    Array.from(editProfileForm.querySelectorAll(settings.inputSelector)),
    settings
  );
  editProfileNameInput.value = profileName.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
});

// Card Creation
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
  likeButton.addEventListener("click", function () {
    handleLikeButton(cardId, likeButton);
  });
  if (data.isLiked) {
    likeButton.classList.add("card__like-button_active");
  }
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    handleDeleteButton(cardElement, data);
  });
  cardImage.addEventListener("click", function () {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewTitle.textContent = data.name;
    openModal(previewImageModal);
  });
  return cardElement;
}

// Preview Image Modal
const previewImageModal = document.querySelector("#preview");
const previewImage = previewImageModal.querySelector(".modal__image");
const previewTitle = previewImageModal.querySelector(
  ".modal__title_type_image"
);

// New Post Modal Elements
const newPostButton = document.querySelector(".profile__new-post-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostForm = newPostModal.querySelector(".form");
const newPostImgLinkInput = newPostForm.querySelector("#img-link");
const newPostCaptionInput = newPostForm.querySelector("#caption");
const newPostSubmitBtn = newPostForm.querySelector(".form__save-btn");

// New Post Button
newPostButton.addEventListener("click", function () {
  openModal(newPostModal);
});

// Delete Card
const confirmDeleteModal = document.querySelector("#confirm-delete-modal");
let selectedCard;
let selectedCardId;

function handleDeleteButton(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  openModal(confirmDeleteModal);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  api
    .removeCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(confirmDeleteModal);
    })
    .catch((err) => {
      console.error(err);
    });
}

const deleteForm = confirmDeleteModal.querySelector(".modal__form");
const deleteCancel = confirmDeleteModal.querySelector(".modal__cancel-btn");
deleteForm.addEventListener("submit", handleDeleteSubmit);
deleteCancel.addEventListener("click", () => {
  closeModal(confirmDeleteModal);
});

// Add and remove likes
function handleLikeButton(cardId, likeButton) {
  if (likeButton.classList.contains("card__like-button_active")) {
    likeButton.classList.remove("card__like-button_active");
    api
      .removeLike(cardId)
      .catch((err) => {
        console.error(err);
        likeButton.classList.add("card__like-button_active");
      });
  } else {
    likeButton.classList.add("card__like-button_active");
    api
      .addLike(cardId)
      .catch((err) => {
        console.error(err);
        likeButton.classList.remove("card__like-button_active");
      });
  }
}


// API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "bc01c42a-5a4c-4f24-aa6e-4ea372a00bfe",
    "Content-Type": "application/json",
  },
});

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

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((editedProfile) => {
      profileName.textContent = editedProfile.name;
      profileDescription.textContent = editedProfile.about;
    })
    .catch((err) => {
      console.error(err);
    });
  closeModal(editProfileModal);
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleNewPostSubmit(evt) {
  evt.preventDefault();
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
    });
}
newPostForm.addEventListener("submit", handleNewPostSubmit);

// api.getAppData()
//   .then(([userData, cardsData]) => {
//     userData =
//     cardsData =
//      // Step 1: Update the user profile section
//     // Use userData to populate name, about, and avatar

//     // Step 2: Render all the cards
//     // Use cardsData to create and display cards

//     // Step 3: Set up any additional functionality
//   })
