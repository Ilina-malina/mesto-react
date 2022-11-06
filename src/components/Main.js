import React, { useState, useEffect } from 'react';
import { api } from '../utils/Api.js';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {
    const [cards, setCards] = useState([]);

    const currentUser = React.useContext(CurrentUserContext);

    useEffect(() => {
        api.getInitialCards().then(cards => {
            setCards(cards);
        })
    }, [])

    const handleLike = (card) => {  
      if (card.likes.some(item => item._id === currentUser._id)) {
        api.deleteLike(card._id).then((newCard) => {
          setCards((cards) => cards.map((item) => card._id === item._id ? newCard : item));
        })
      } else {
       api.putLike(card._id).then((newCard) => {
        setCards((cards) => cards.map((item) => card._id === item._id ? newCard : item));
       })
      }
    };

    const handleCardDelete = (card) => {
        api.deleteCard(card._id).then(() => {
          setCards((cards) => cards.filter(item => item._id !== card._id))
        })
    };

    return (
        <main className="main">
            <section className="profile">        
              <div className="profile__image" style={{ backgroundImage: `url(${currentUser.avatar})` }} >
                <div className="profile__overlay">
                  <div className="profile__overlay-image" onClick={props.onEditAvatar}>
                  </div>
                </div>
              </div>
              <div className="profile__info">
                <div className="profile__container">
                  <h1 className="profile__name">{currentUser.name}</h1>
                  <button className="profile__edit-button" type="button" aria-label="Редактировать профиль" onClick={props.onEditProfile}></button>
                </div>
                <p className="profile__subscribe">{currentUser.about}</p>
              </div>
              <button className="profile__add-button" type="button" aria-label="Добавить информацию" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                {cards.map((card) => <Card key={card._id} card={card} onCardClick={props.onCardClick} onLikeClick={handleLike} onCardDelete={handleCardDelete} />)}
            </section>
        </main>
    )
}

export default Main;