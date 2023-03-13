const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const cardsSection = document.querySelector(".elements__cards");
const cardTemplate = document.querySelector("#element-template").content;
const popupProfile = document.querySelector(".popup__profile");
const profileCloseButton = popupProfile.querySelector(".popup__close-button");
const profileSave = popupProfile.querySelector(".form");
const popupItemTitle = popupProfile.querySelector(".popup__item_title");
const popupItemSubtitle = popupProfile.querySelector(".popup__item_subtitle");
const popupCardAdd = document.querySelector(".popup__card");
const buttonClosePlace = popupCardAdd.querySelector(".popup__close-button");
const savePlace = popupCardAdd.querySelector(".popup__input");
const popupCardName = popupCardAdd.querySelector(".popup__item_title");
const popupCardSrc = popupCardAdd.querySelector(".popup__item_subtitle");
const popupCardView = document.querySelector(".popup__img");
const buttonCloseView = popupCardView.querySelector(".popup__close-button");
const popupImage = popupCardView.querySelector(".popup__image");
const popupTitle = popupCardView.querySelector(".popup__title");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function openProfilePopup() {
  popupItemTitle.value = profileTitle.textContent;
  popupItemSubtitle.value = profileSubtitle.textContent;
  openPopup(popupProfile);
}

function closeProfilePopup() {
  closePopup(popupProfile);
}

function saveProfileFromPopup(popupProfile) {
  popupProfile.preventDefault();
  profileTitle.textContent = popupItemTitle.value;
  profileSubtitle.textContent = popupItemSubtitle.value;
  closeProfilePopup();
}

function createCardElement(placeName, placePhotoSrc) {
  const cardNew = cardTemplate.querySelector(".element").cloneNode(true);
  const imageNewCard = cardNew.querySelector(".element__img");

  imageNewCard.src = placePhotoSrc;
  imageNewCard.alt = "Фото. " + placeName;
  cardNew.querySelector(".element__title").textContent = placeName;
  cardNew
    .querySelector(".element__delete-button")
    .addEventListener("click", function () {
      const cardElement = cardNew
        .querySelector(".element__delete-button")
        .closest(".element");
      cardElement.remove();
    });
  cardNew
    .querySelector(".element__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__like-button_active");
    });
  imageNewCard.addEventListener(
    "click",
    openCardViewPopup(placePhotoSrc, placeName)
  );

  return cardNew;
}

function insertCard2Page(card) {
  cardsSection.prepend(card);
}

function saveCardfromPopup() {
  const newCard = createCardElement(popupCardName.value, popupCardSrc.value);
  insertCard2Page(newCard);
  closePopup(popupCardAdd);
}

function openCardAddPopup() {
  popupCardName.value = "";
  popupCardSrc.value = "";
  openPopup(popupCardAdd);
}

function openCardViewPopup(src, alt) {
  return function () {
    popupImage.setAttribute("src", src);
    popupImage.setAttribute("alt", alt);
    popupTitle.textContent = alt;
    openPopup(popupCardView);
  };
}

editButton.addEventListener("click", openProfilePopup);
profileCloseButton.addEventListener("click", closeProfilePopup);
profileSave.addEventListener("submit", saveProfileFromPopup);

addButton.addEventListener("click", openCardAddPopup);
buttonClosePlace.addEventListener("click", () => closePopup(popupCardAdd));
savePlace.addEventListener("submit", saveCardfromPopup);
buttonCloseView.addEventListener("click", () => closePopup(popupCardView));

const initialCards = [
  {
    name: "Карелия",
    link: "https://russia.meteors.ru/images/jatoms/tours/desyat-chudes-karelii/1634045abe1d4daab35ed178c2707eb5.jpeg",
  },
  {
    name: "Эльбрус",
    link: "https://photocentra.ru/images/main77/778017_main.jpg",
  },
  {
    name: "Домбай",
    link: "https://vsegda-pomnim.com/uploads/posts/2022-04/1650921709_16-vsegda-pomnim-com-p-gori-dombai-foto-17.jpg",
  },
  {
    name: "Полярный",
    link: "https://i.pinimg.com/originals/b5/93/fb/b593fb1b2cc14e948611c8449dcf75c3.jpg",
  },
  {
    name: "Финский залив",
    link: "https://puzzleit.ru/files/puzzles/217/217397/_original.jpg",
  },
  {
    name: "Карачаево-Черкессия",
    link: "https://photocentra.ru/images/main69/693431_main.jpg",
  },
];

initialCards.forEach((element) => {
  const newCard = createCardElement(element.name, element.link);
  insertCard2Page(newCard);
});
