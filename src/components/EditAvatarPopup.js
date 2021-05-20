import React, { useState, useEffect, useRef } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const currentUser = React.useContext(CurrentUserContext);
    const avatarRef = React.useRef(); 
    
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(
              avatarRef.current.value/* Значение инпута, полученное с помощью рефа */,
        );
        avatarRef.current.value="";
    }
    

    return (
        <PopupWithForm title="Обновить аватар" name="avatar" isOpen={isOpen} onClose={onClose} buttonText='Сохранить' onSubmit={handleSubmit} >
                <input name="Link" type="url" id= "avatar-input" className="popup__input popup__input_text_about-yourself" placeholder="Ссылка на картинку" ref={avatarRef}/>
                <span className="popup__error avatar-input-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;