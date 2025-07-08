const editProfileButton = document.querySelector('.profile__edit-button');
const editProfileModal = document.querySelector('#edit-profile-modal');
const editCloseBtn = editProfileModal.querySelector('.modal__close-btn');
const editProfileForm = editProfileModal.querySelector('.form');
const editProfileNameInput = editProfileForm.querySelector('#name');
const editProfileDescriptionInput = editProfileForm.querySelector('#description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');


editProfileButton.addEventListener('click', function () {
  editProfileModal.classList.add('modal_is-open');
  editProfileNameInput.value = profileName.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
})

editCloseBtn.addEventListener('click', function () {
  editProfileModal.classList.remove('modal_is-open');
});

function handleEditProfileSubmit(evt) {
    evt.preventDefault();
    const nameValue = editProfileNameInput.value;
    const descriptionValue = editProfileDescriptionInput.value;
    profileName.textContent = nameValue;
    profileDescription.textContent = descriptionValue;
    editProfileModal.classList.remove('modal_is-open');
}

editProfileForm.addEventListener('submit', handleEditProfileSubmit);



const newPostButton = document.querySelector('.profile__new-post-button');
const newPostModal = document.querySelector('#new-post-modal');
const newPostCloseBtn = newPostModal.querySelector('.modal__close-btn');
const newPostForm = newPostModal.querySelector('.form');
const newPostImgLinkInput = newPostForm.querySelector('#img-link');
const newPostCaptionInput = newPostForm.querySelector('#caption');

newPostButton.addEventListener('click', function () {
  newPostModal.classList.add('modal_is-open');
})

newPostCloseBtn.addEventListener('click', function () {
  newPostModal.classList.remove('modal_is-open');
});

function handleNewPostSubmit(evt) {
    evt.preventDefault();
    const imgLinkValue = newPostImgLinkInput.value;
    const captionValue = newPostCaptionInput.value;
    console.log(imgLinkValue);
    console.log(captionValue);
    newPostModal.classList.remove('modal_is-open');
}

newPostForm.addEventListener('submit', handleNewPostSubmit);