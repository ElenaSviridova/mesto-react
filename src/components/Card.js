import React from 'react';
function Card({card, onCardClick, name, link, likes}) {
    function handleClick() {
        onCardClick(card);
      } 

    return (
        <article className="element">
            <button className="element__delete"></button>
            <img className="element__image" alt="картинки нет" src={link} onClick={handleClick}/>
            <div className="element__caption">
                <h2 className="element__title">{name}</h2>
                <div className="element__sign">
                    <button type="button" className="element__like"></button>
                    <p className="element__like-numbers">{likes.length}</p>
                </div>
            </div>
        </article>     
    )
}
export default Card