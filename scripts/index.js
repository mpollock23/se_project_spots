const editProfileButton = document.querySelector('.profile__edit-button');
const editProfileModal = document.querySelector('#edit-profile-modal');
const editCloseBtn = editProfileModal.querySelector('.modal__close-btn');

editProfileButton.addEventListener('click', function () {
  editProfileModal.classList.add('modal_is-open');
})
editCloseBtn.addEventListener('click', function () {
  editProfileModal.classList.remove('modal_is-open');
});

const newPostButton = document.querySelector('.profile__new-post-button');
const newPostModal = document.querySelector('#new-post-modal');
const newPostCloseBtn = newPostModal.querySelector('.modal__close-btn');

newPostButton.addEventListener('click', function () {
  newPostModal.classList.add('modal_is-open');
})
newPostCloseBtn.addEventListener('click', function () {
  newPostModal.classList.remove('modal_is-open');
});