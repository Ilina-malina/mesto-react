import React, { useState, useEffect } from 'react';
import { api } from '../utils/Api.js';
import Card from './Card.js';


function Main(props) {
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getUserInfo().then(data => {
            setUserName(data.name);
            setUserDescription(data.about);
            setUserAvatar(data.avatar);
        });
    }, [])

    useEffect(() => {
        api.getInitialCards().then(cards => {
            setCards(cards);
        })
    }, [])

    return (
        <main className="main">
            <section className="profile">        
              <div className="profile__image" style={{ backgroundImage: `url(${userAvatar})` }} >
                <div className="profile__overlay">
                  <div className="profile__overlay-image" onClick={props.onEditAvatar}>
                  </div>
                </div>
              </div>
              <div className="profile__info">
                <div className="profile__container">
                  <h1 className="profile__name">{userName}</h1>
                  <button className="profile__edit-button" type="button" aria-label="Редактировать профиль" onClick={props.onEditProfile}></button>
                </div>
                <p className="profile__subscribe">{userDescription}</p>
              </div>
              <button className="profile__add-button" type="button" aria-label="Добавить информацию" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                {cards.map((card, i) => <Card key={i} card={card} onCardClick={props.onCardClick} />)}
            </section>
        </main>
    )
}

export default Main;