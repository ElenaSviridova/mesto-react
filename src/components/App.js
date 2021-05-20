import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState([]);
    const [cards, setCards] = useState([]);
    
    useEffect(() => {
        api.getInitialCards()
          .then(data => {
              console.log(data)
              setCards(data);
          })
          .catch(err => {
              console.log(err)
          })
    }, [])

    useEffect(() => {
        api.getProfileInfo()
          .then(data => {
            setCurrentUser(data)
          })
          .catch(err => {
              console.log(err)
          })
      },[])

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(null)
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

    function handleUpdateUser({name,about}) {
        api.changeProfileInfo(name, about)
        .then(data => {
            setCurrentUser(data)
          })
          .catch(err => {
              console.log(err)
          })
          .finally(closeAllPopups())
    }

    function handleUpdateAvatar(link) {
        api.updateAvatar(link)
        .then(data => {
            setCurrentUser(data)
          })
          .catch(err => {
              console.log(err)
          })
          .finally(closeAllPopups())
    }

  return (
      <CurrentUserContext.Provider value= {currentUser}>
      <CardsContext.Provider value= {cards}>    
       <div className="page">
          <Header />
          <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} setCards={setCards}/>
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <PopupWithForm title="Новое место" name="add" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} buttonText='Создать'>
                <input name="Name" type="text" id= "author-add-input" className="popup__input popup__input_text_name" placeholder="Название" />
                <span className="popup__error author-add-input-error"></span>
                <input name="Link" type="url" id= "profile-add-input" className="popup__input popup__input_text_about-yourself" placeholder="Ссылка на картинку" />
                <span className="popup__error profile-add-input-error"></span>
          </PopupWithForm>
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}  />
          <PopupWithForm title='Вы уверены?' name="delete-card" isOpen={false} onClose={closeAllPopups} buttonText='Да'>

          </PopupWithForm>
            {/* <div className="popup popup_delete-card">
                <form name="myForm" className="popup__container" >
                    <button type="button" className="popup__close-button">
                        <img src={closeIconPath} alt="картинка закрытия окна" className="popup__close-icon"/>
                    </button>
                    <h2 className="popup__question">Вы уверены?</h2>
                    <button type="submit" className="popup__button popup__button_margin">Да</button>
                </form>    
            </div> */}
            <Footer />
        </div>
        </CardsContext.Provider>
       </CurrentUserContext.Provider>
  );
}

export default App;
