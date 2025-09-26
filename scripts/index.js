const initialCards = [
  {name: 'Val Thorens', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg'},
  {name: 'Restaurant terrace', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg'},
  {name: 'An outdoor cafe', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg'},
  {name: 'A very long bridge, over the forest and through the trees', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg'},
  {name: 'Tunnel with morning light', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg'},
  {name: 'Mountain house', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg'},
  {name: 'Golden Gate Bridge', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg'}
]

const cardsContainer = document.querySelector(".cards");

// Card Creation
const templateCard = document.querySelector("#card-template").content;
function getCardElement(data) {
  const cardElement = templateCard.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.classList.remove("card__like-button_active");
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("card__like-button_active");
  });
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    cardElement.remove();
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
const previewCloseBtn = previewImageModal.querySelector(".modal__close-btn_type_image");
const previewImage = previewImageModal.querySelector(".modal__image");
const previewTitle = previewImageModal.querySelector(".modal__title_type_image");

// Initial Cards Rendering
initialCards.forEach(function (card) {
  const cardElement = getCardElement(card);
  cardsContainer.append(cardElement);
});

// Edit Profile Modal
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".form");
const editProfileNameInput = editProfileForm.querySelector("#name");
const editProfileDescriptionInput = editProfileForm.querySelector("#description");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");


function openModal(modal) {
  modal.classList.add("modal_is-open");
  editProfileNameInput.value = profileName.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
  closeModalWithOverlayAndEscape(modal);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-open");
  removeListeners(modal);
}

editProfileButton.addEventListener("click", function () {
  openModal(editProfileModal);
  resetValidation(editProfileForm, Array.from(editProfileForm.querySelectorAll(settings.inputSelector)), settings);
});

const modalCloseBtns = document.querySelectorAll(".modal__close-btn");
modalCloseBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const modal = btn.closest(".modal");
    closeModal(modal);
  });
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  const nameValue = editProfileNameInput.value;
  const descriptionValue = editProfileDescriptionInput.value;
  profileName.textContent = nameValue;
  profileDescription.textContent = descriptionValue;
  closeModal(editProfileModal);
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

// New Post Modal
const newPostButton = document.querySelector(".profile__new-post-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".form");
const newPostImgLinkInput = newPostForm.querySelector("#img-link");
const newPostCaptionInput = newPostForm.querySelector("#caption");
const newPostSubmitBtn = newPostForm.querySelector(".form__save-btn");

newPostButton.addEventListener("click", function () {
  openModal(newPostModal);
});

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  const newCardData = {
    name: newPostCaptionInput.value,
    link: newPostImgLinkInput.value
  };
  const newCardElement = getCardElement(newCardData);
  cardsContainer.prepend(newCardElement);
  evt.target.reset();
  disableButton(newPostSubmitBtn, settings);
  closeModal(newPostModal);
}

newPostForm.addEventListener("submit", handleNewPostSubmit);

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