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
import AddPlacePopup from './AddPlacePopup';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState('');
    const [cards, setCards] = useState([]);

  function handleCardDelete(card) {
        api.removeCards(card._id).then(setCards((state) => state.filter((c) => c._id !== card._id))) 
            
  }

  function handleCardLike(card) {

    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }
    
    useEffect(() => {
        api.getInitialCards()
          .then(data => {
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

    function handleAddPlaceSubmit(card) {
        api.addCard(card)
        .then(newCard => {
            setCards([...cards, newCard])
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
          <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} cards={cards} />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}  />
          <PopupWithForm title='Вы уверены?' name="delete-card" isOpen={false} onClose={closeAllPopups} buttonText='Да'>
          </PopupWithForm>
          <Footer />
        </div>
        </CardsContext.Provider>
       </CurrentUserContext.Provider>
  );
}

export default App;
