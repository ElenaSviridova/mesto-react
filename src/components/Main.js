import React, { useEffect, useState } from 'react';
import editButtonPath from '../images/edit-button.svg';
import addButtonPath from '../images/plus.svg';
import api from '../utils/api';
import Card from '../components/Card';

function Main({onEditProfile, onAddPlace , onEditAvatar, onCardClick}) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards,setCards] = useState([]);

  useEffect(() => {
    api.getProfileInfo()
      .then(data => {
        setUserName(data.name)
        setUserDescription(data.about)
        setUserAvatar(data.avatar)
      })
  },[])

  useEffect(() => {
      api.getInitialCards()
        .then(data => {
            setCards(data.map(item => ({
                title: item.name,
                image: item.link,
                likeNumbers: item.likes.length,
                id: item._id
              })))
        })
  }, [])

    return (
        <main className="main">
              <section className="profile">
                      <div className="profile__avatar">
                          <img src={userAvatar} alt="Картинка профиля" className="profile__avatar-image"/>
                          <img onClick={onEditAvatar} src={editButtonPath} alt="Картинка при наведении" className="profile__avatar-hover"/>
                      </div>
                      <div className="profile__info">
                        <h1 className="profile__title">{userName}</h1>
                        <button onClick={onEditProfile} type="button" className="profile__edit-button">
                          <img src={editButtonPath} alt="картинка добавить текст" className="profile__edit-button-image"/>
                        </button>
                        <p className="profile__subtitle">{userDescription}</p>
                      </div> 
                      <button onClick={onAddPlace} type="button" className="profile__add-button">
                          <img src={addButtonPath} alt="иконка кнопки" className="profile__add-button-image"/>
                      </button>       
              </section>
              <section className="elements">
                  {cards.map((card) => <Card key={card.id} onCardClick={onCardClick} card={card} title={card.title} image={card.image} likeNumbers={card.likeNumbers} />)}
                   
              </section>
        </main>
    )
};

export default Main;