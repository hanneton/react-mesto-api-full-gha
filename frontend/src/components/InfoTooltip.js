
export default function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpen && "popup_opened"}`}>
            <div className="popup__container">
                <div className={`popup__icon ${props.icon && 'popup__icon_success'}`}></div>
                <h2 className="popup__heading">{props.icon
                    ? `Вы успешно зарегистрировались!`
                    : `Что-то пошло не так!
                Попробуйте ещё раз.`}
                </h2>
                <button onClick={props.onClose} className="popup__close-button" type="button" aria-label="кнопка закрыть"></button>
            </div>
        </div>
    )
}