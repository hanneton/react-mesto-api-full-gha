import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
function Card({ onCardClick, onCardLike, onCardDelete, card }) {

    const userInfo = React.useContext(CurrentUserContext);
    function handleClick() {
        onCardClick(card);
    }
    function handleLike() {
        onCardLike(card);
    }
    function handleDelete() {
        onCardDelete(card);
    }

    return (
        <figure className="element">
            <img onClick={handleClick} src={card.link} alt={card.name} className="element__pic" />
            <figcaption className="element__caption">
                <h2 className="element__name">{card.name}</h2>
                <div className="element__like-container">
                    <button onClick={handleLike} className={`element__like-button ${card.likes.some((_id) => _id === userInfo._id) &&
                        "element__like-button_active"}`}
                        type="button" aria-label="кнопка лайк"></button>
                    <span className="element__like-counter">{card.likes.length}</span>
                </div>
            </figcaption>
            {card.owner === userInfo._id && <button className="element__trash-btn" onClick={handleDelete}></button>}
        </figure>
    )
}

export default Card;