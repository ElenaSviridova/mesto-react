import React from 'react';
function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
      } 

    return (
        <article className="element">
            <button className="element__delete"></button>
            <img className="element__image" alt="картинки нет" src={props.image} onClick={handleClick}/>
            <div className="element__caption">
                <h2 className="element__title">{props.title}</h2>
                <div className="element__sign">
                    <button type="button" className="element__like"></button>
                    <p className="element__like-numbers">{props.likeNumbers}</p>
                </div>
            </div>
        </article>     
    )
}
export default Card