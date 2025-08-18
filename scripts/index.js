const initialCards = [
  {name: 'Val Thorens', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg'},
  {name: 'Restaurant terrace', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg'},
  {name: 'An outdoor cafe', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg'},
  {name: 'A very long bridge, over the forest and through the trees', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg'},
  {name: 'Tunnel with morning light', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg'},
  {name: 'Mountain house', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg'},
  {name: 'Golden Gate Bridge', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg'}
]

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

initialCards.forEach(function (card) {
  const cardElement = getCardElement(card);
  const cardsContainer = document.querySelector(".cards");
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
}

function closeModal(modal) {
  modal.classList.remove("modal_is-open");
}

editProfileButton.addEventListener("click", function () {
  openModal(editProfileModal);
  editProfileNameInput.value = profileName.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
});

editCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
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

newPostButton.addEventListener("click", function () {
  openModal(newPostModal);
  newPostImgLinkInput.value = "";
  newPostCaptionInput.value = "";
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  const cardsContainer = document.querySelector(".cards");
  const newCardData = {
    name: newPostCaptionInput.value,
    link: newPostImgLinkInput.value
  };
  const newCardElement = getCardElement(newCardData);
  cardsContainer.prepend(newCardElement);
  closeModal(newPostModal);
}

newPostForm.addEventListener("submit", handleNewPostSubmit);

// Preview Image Modal
const previewImageModal = document.querySelector("#preview");
const previewCloseBtn = previewImageModal.querySelector(".modal__close-btn_type_image");
const previewImage = previewImageModal.querySelector(".modal__image");
const previewTitle = previewImageModal.querySelector(".modal__title_type_image");
previewCloseBtn.addEventListener("click", function () {
  closeModal(previewImageModal);
});