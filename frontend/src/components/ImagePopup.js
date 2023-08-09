
function ImagePopup(props) {
    return (
        <div onMouseDown={props.onClose} className={`popup popup_type_enlarge ${props.isOpen && "popup_opened"}`}>
            <figure className="popup__element">
                <img className="popup__pic" src={props.card.link} alt={props.card.name} />
                <button className="popup__close-button" type="button" aria-label="кнопка закрыть"></button>
                <figcaption className="popup__caption">
                    <p className="popup__text">{props.card.name}</p>
                </figcaption>
            </figure>
        </div>
    )
}

export default ImagePopup;