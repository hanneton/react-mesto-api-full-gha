
function PopupWithForm(props) {

    function handleMouseDown(event) {
        if ((event.target === event.currentTarget) || (event.target.classList.contains('popup__close-button'))) {
            props.onClose();
        }
    }

    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen && "popup_opened"}`}
            onMouseDown={handleMouseDown}>
            <div className="popup__container">
                <h2 className="popup__heading">{props.title}</h2>
                <form onSubmit={props.onSubmit} className="form" action="submit" noValidate>
                    {props.children}
                    <button className="popup__save-button" type="submit">Сохранить</button>
                </form>
                <button className="popup__close-button" type="button" aria-label="кнопка закрыть"></button>
            </div>
        </div>
    )
}

export default PopupWithForm;