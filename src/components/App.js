import React, { useState } from 'react';
import'../index.css';
import Header from './Header.js';
import Main from './Main';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

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
    <div className="App">
      <Header />
      <Main onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onCardClick={setSelectedCard} />
      <Footer />
      <PopupWithForm name="profile" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
      <form className="popup__form" name="profile-form" noValidate>
        <div className="popup__input-zone">
          <input className="popup__input popup__input_type_name" required type="text" name="name" minLength="2" maxLength="40" placeholder="Введите Ваше имя"/>
          <span className="popup__error"></span>   
        </div>
        <div className="popup__input-zone">
          <input className="popup__input popup__input_type_description" required type="text" name="description" minLength="2" maxLength="200" placeholder="Укажите род занятий"/>
          <span className="popup__error"></span> 
        </div>
        <button className="popup__submit-button" type="submit" aria-label="Сохранить">Сохранить</button>
      </form>
      </PopupWithForm>
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
      <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <form className="popup__form" name="avatar-form" noValidate>
          <div className="popup__input-zone">
            <input className="popup__input popup__input_type_link" required type="url" placeholder="Ссылка на картинку"/>
            <span className="popup__error"></span> 
          </div>
          <button className="popup__submit-button" type="submit" aria-label="Сохранить">Сохранить</button>
        </form>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;