import React, { useEffect, useState } from 'react';
import editButtonPath from '../images/edit-button.svg';
import addButtonPath from '../images/plus.svg';
import api from '../utils/api';
import Card from '../components/Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';

function Main({onEditProfile, onAddPlace , onEditAvatar, onCardClick, setCards}) {
  const cards = React.useContext(CardsContext);
  const currentUser = React.useContext(CurrentUserContext);
  
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

    return (
        <main className="main">
              <section className="profile">
                      <div className="profile__avatar">
                          <img src={currentUser.avatar} alt="Картинка профиля" className="profile__avatar-image"/>
                          <img onClick={onEditAvatar} src={editButtonPath} alt="Картинка при наведении" className="profile__avatar-hover"/>
                      </div>
                      <div className="profile__info">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button onClick={onEditProfile} type="button" className="profile__edit-button">
                          <img src={editButtonPath} alt="картинка добавить текст" className="profile__edit-button-image"/>
                        </button>
                        <p className="profile__subtitle">{currentUser.about}</p>
                      </div> 
                      <button onClick={onAddPlace} type="button" className="profile__add-button">
                          <img src={addButtonPath} alt="иконка кнопки" className="profile__add-button-image"/>
                      </button>       
              </section>
              <section className="elements">
                  {cards.map((card) => <Card key={card._id} onCardClick={onCardClick} card={card} name={card.name} link={card.link} likes={card.likes} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>)} 
              </section>
        </main>
        
    )
};

export default Main;