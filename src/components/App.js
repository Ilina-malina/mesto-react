import React, { useState, useEffect } from 'react';
import'../index.css';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Header from './Header.js';
import Main from './Main';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import { api } from '../utils/Api.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api.getUserInfo().then(data => {
        setCurrentUser(data);
    });
}, [])

function handleUpdateUser(name, about) {
  api.editUserInfo(name, about).then(data => {
    setCurrentUser(data);
    closeAllPopups();
  })
}

function handleUpdateAvatar(avatar) {
  api.editUserAvatar(avatar).then(data => {
    setCurrentUser(data);
    closeAllPopups();
  })
}

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header />
        <Main 
          onAddPlace={handleAddPlaceClick} 
          onEditAvatar={handleEditAvatarClick} 
          onEditProfile={handleEditProfileClick} 
          onCardClick={setSelectedCard}
        />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <PopupWithForm name="place" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <form className="popup__form" name="add-place__form" noValidate>
            <div className="popup__input-zone">
              <input className="popup__input popup__input_type_place" required type="text" name="place" minLength="1" maxLength="30" placeholder="Название"/>
              <span className="popup__error"></span> 
            </div>
            <div className="popup__input-zone">
              <input className="popup__input popup__input_type_link" required type="url" placeholder="Ссылка на картинку"/>
              <span className="popup__error"></span> 
            </div>
            <button className="popup__submit-button popup__submit-button_disadled" type="submit" aria-label="Создать">Создать</button>
          </form>
        </PopupWithForm>
        <PopupWithForm name="delete-confirmation" title="Вы уверены?" onClose={closeAllPopups}>
          <button className="popup__submit-button" type="submit" aria-label="Да">Подтвердить</button>
        </PopupWithForm>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;