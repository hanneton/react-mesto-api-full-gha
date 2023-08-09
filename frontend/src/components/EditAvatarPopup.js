import PopupWithForm from "./PopupWithForm.js";
import React from "react";
function EditAvatarPopup(props) {

    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar(avatarRef.current.value);
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} name="update-avatar" title="Обновить аватар" isOpen={props.isOpen}>
            <input ref={avatarRef} id="avatar-src-input" className="form__item form__item_el_src" name="link"
                placeholder="Ссылка на картинку" type="url" required />
            <span className="form__input-error avatar-src-input-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;