import React from 'react';

function Card(props) {

    const handleCardClick = () => {
        props.onCardClick(props.card);
      };

    return(
        <article className="element">
          <img className="element__photo" alt={props.card.name} onClick={handleCardClick} style={{ backgroundImage: `url(${props.card.link})` }} />
          <button className="element__delete-button" type="button" aria-label="Удалить"></button>
          <div className="element__description">
            <h2 className="element__title">{props.card.name}</h2>
            <div className="element__likes-container">
              <button className="element__like-button" type="button" aria-label="Нравится"></button>
              <p className="element__likes-amount">0</p>
            </div>
          </div>
        </article>
    )
}

export default Card;