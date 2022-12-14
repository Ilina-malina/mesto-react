import React, { useState, useEffect } from 'react';
import'../index.css';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { CardsContext } from '../contexts/CardsContext.js';
import Header from './Header.js';
import Main from './Main';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { api } from '../utils/Api.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({name: '', about: ''});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo().then(data => {
        setCurrentUser(data);
    })
    .catch((err) => {
      console.log(err);
    })
}, [])

  useEffect(() => {
    api.getInitialCards().then(cardList => {
        setCards(cardList);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  const handleLike = (card) => {
    if (card.likes.some(item => item._id === currentUser._id)) {
      api.deleteLike(card._id).then((newCard) => {
        setCards((cards) => cards.map((item) => card._id === item._id ? newCard : item));
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
     api.putLike(card._id).then((newCard) => {
      setCards((cards) => cards.map((item) => card._id === item._id ? newCard : item));
     })
     .catch((err) => {
      console.log(err);
    })
    }
  };

  const handleCardDelete = (card) => {
      api.deleteCard(card._id).then(() => {
        setCards((cards) => cards.filter(item => item._id !== card._id))
      })
      .catch((err) => {
        console.log(err);
      })
  };

function handleUpdateUser(name, about) {
  api.editUserInfo(name, about).then(data => {
    setCurrentUser(data);
    closeAllPopups();
  })
  .catch((err) => {
    console.log(err);
  })
}

function handleUpdateAvatar(avatar) {
  api.editUserAvatar(avatar).then(data => {
    setCurrentUser(data);
    closeAllPopups();
  })
  .catch((err) => {
    console.log(err);
  })
}

function handleAddPlaceSubmit(name, link) {
  api.addCard({
    name: name,
    link: link
  }).then(newCard => {
    setCards([newCard, ...cards]);
    closeAllPopups();
  })
  .catch((err) => {
    console.log(err);
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
      <CardsContext.Provider value={cards}>
      <div className="App">
        <Header />
        <Main 
          onAddPlace={handleAddPlaceClick} 
          onEditAvatar={handleEditAvatarClick} 
          onEditProfile={handleEditProfileClick} 
          onCardClick={setSelectedCard}
          onCardLike={handleLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <PopupWithForm name="delete-confirmation" title="???? ???????????????" onClose={closeAllPopups}>
          <button className="popup__submit-button" type="submit" aria-label="????">??????????????????????</button>
        </PopupWithForm>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;