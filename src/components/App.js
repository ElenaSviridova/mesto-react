import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer'
import closeIconPath from '../images/Close-Icon.svg';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState('');

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard('')
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }
    
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }
    
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function handleCardClick(card) {
        setSelectedCard(card)
    }

  return (
       <div className="page">
          <Header />
          <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>
          <PopupWithForm title="Редактировать профиль" name="edit" isOpen={isEditProfilePopupOpen}  onClose={closeAllPopups} buttonText='Сохранить'>
                <input name="Author" type="text" id= "author-input" className="popup__input popup__input_text_name" />
                <span className="popup__error author-input-error"></span>
                <input name="Profile" type="text" id= "profile-input" className="popup__input popup__input_text_about-yourself" />
                <span className="popup__error profile-input-error"></span>
          </PopupWithForm>
          <PopupWithForm title="Новое место" name="add" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} buttonText='Создать'>
                <input name="Name" type="text" id= "author-add-input" className="popup__input popup__input_text_name" placeholder="Название" />
                <span className="popup__error author-add-input-error"></span>
                <input name="Link" type="url" id= "profile-add-input" className="popup__input popup__input_text_about-yourself" placeholder="Ссылка на картинку" />
                <span className="popup__error profile-add-input-error"></span>
          </PopupWithForm>
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <PopupWithForm title="Обновить аватар" name="avatar" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} buttonText='Сохранить'>
                <input name="Link" type="url" id= "avatar-input" className="popup__input popup__input_text_about-yourself" placeholder="Ссылка на картинку" />
                <span className="popup__error avatar-input-error"></span>
          </PopupWithForm>
            <div className="popup popup_delete-card">
                <form name="myForm" className="popup__container" >
                    <button type="button" className="popup__close-button">
                        <img src={closeIconPath} alt="картинка закрытия окна" className="popup__close-icon"/>
                    </button>
                    <h2 className="popup__question">Вы уверены?</h2>
                    <button type="submit" className="popup__button popup__button_margin">Да</button>
                </form>    
            </div>
            <Footer />
        </div>
  );
}

export default App;
