import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer'
import closeIconPath from '../images/Close-Icon.svg';
import '../index.css';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(false);

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(false)
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
          <PopupWithForm title="Редактировать профиль" name="edit" isOpen={isEditProfilePopupOpen} children = {
              <>
                <input name="Author" type="text" id= "author-input" className="popup__input popup__input_text_name" />
                <span className="popup__error author-input-error"></span>
                <input name="Profile" type="text" id= "profile-input" className="popup__input popup__input_text_about-yourself" />
                <span className="popup__error profile-input-error"></span>
                <button type="submit" className="popup__button">Сохранить</button>
              </>
          } onClose={closeAllPopups} />
          <PopupWithForm title="Новое место" name="add" isOpen={isAddPlacePopupOpen} children = {
              <>
                <input name="Name" type="text" id= "author-add-input" className="popup__input popup__input_text_name" placeholder="Название" />
                <span className="popup__error author-add-input-error"></span>
                <input name="Link" type="url" id= "profile-add-input" className="popup__input popup__input_text_about-yourself" placeholder="Ссылка на картинку" />
                <span className="popup__error profile-add-input-error"></span>
                <button type="submit" className="popup__button">Создать</button>
              </>
          } onClose={closeAllPopups}/>
          <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={selectedCard}/>
          <PopupWithForm title="Обновить аватар" name="avatar" isOpen={isEditAvatarPopupOpen} children = {
              <>
                <input name="Link" type="url" id= "avatar-input" className="popup__input popup__input_text_about-yourself" placeholder="Ссылка на картинку" />
                <span className="popup__error avatar-input-error"></span>
                <button type="submit" className="popup__button">Сохранить</button>
              </>
          } onClose={closeAllPopups} />
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
