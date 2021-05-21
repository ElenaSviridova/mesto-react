import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const addPlaceNameRef = useRef();
    const addPlaceLinkRef = useRef();
    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
              name: addPlaceNameRef.current.value,
              link: addPlaceLinkRef.current.value
    });
    }

    return (
        <PopupWithForm title="Новое место" name="add" isOpen={isOpen} onClose={onClose} buttonText='Создать' onSubmit={handleSubmit} >
                <input name="Name" type="text" id= "author-add-input" className="popup__input popup__input_text_name" placeholder="Название" ref={addPlaceNameRef} />
                <span className="popup__error author-add-input-error"></span>
                <input name="Link" type="url" id= "profile-add-input" className="popup__input popup__input_text_about-yourself" placeholder="Ссылка на картинку" ref={addPlaceLinkRef}/>
                <span className="popup__error profile-add-input-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;