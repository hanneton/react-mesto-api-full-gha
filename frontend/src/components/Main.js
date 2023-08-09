import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {

    const userInfo = React.useContext(CurrentUserContext);
    return (
        <main className="content">
            <section className="user-profile content__user-profile">
                <a onClick={props.onEditAvatar} className="user-profile__link" href="#">
                    <img className="user-profile__avatar" src={userInfo.avatar}
                        alt="аватар пользователя" />
                </a>
                <div className="user-profile__info">
                    <div className="user-profile__container">
                        <h1 className="user-profile__name">{userInfo.name}</h1>
                        <button onClick={props.onEditProfile} className="user-profile__edit-button" type="button"></button>
                    </div>
                    <p className="user-profile__occupation">{userInfo.about}</p>
                </div>
                <button onClick={props.onAddPlace} className="user-profile__add-button" type="button"></button>
            </section>
            <section className="elements content__elements">
                {props.cards.map(card => {
                    return (<Card key={card._id} card={card} onCardDelete={props.onCardDelete} onCardLike={props.onCardLike} onCardClick={props.onCardClick} />)
                })}
            </section>
        </main>
    )
}

export default Main;