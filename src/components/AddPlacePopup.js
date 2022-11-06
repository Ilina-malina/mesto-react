import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {
    console.log(props);
    const placeRef = useRef();
    const linkRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onAddPlace(
          placeRef.current.value,
          linkRef.current.value
        );
    }

    return(
        <PopupWithForm name="place" title="Новое место" isOpen={props.isOpen} onClose={props.onClose} >
          <form className="popup__form" name="add-place__form" noValidate onSubmit={handleSubmit}>
            <div className="popup__input-zone">
              <input className="popup__input popup__input_type_place" ref={placeRef}required type="text" name="place" minLength="1" maxLength="30" placeholder="Название"/>
              <span className="popup__error"></span> 
            </div>
            <div className="popup__input-zone">
              <input className="popup__input popup__input_type_link" ref={linkRef} required type="url" placeholder="Ссылка на картинку"/>
              <span className="popup__error"></span> 
            </div>
            <button className="popup__submit-button popup__submit-button_disadled" type="submit" aria-label="Создать">Создать</button>
          </form>
        </PopupWithForm>
    )
}

export default AddPlacePopup;