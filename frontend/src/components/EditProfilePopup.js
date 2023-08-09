import PopupWithForm from "./PopupWithForm.js";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { useForm } from "../hooks/useForm"
function EditProfilePopup(props) {

    const userInfo = React.useContext(CurrentUserContext);
    const { values, handleChange, setValues } = useForm({
        name: '',
        about: ''
    })

    React.useEffect(() => {
        setValues({
            name: userInfo.name,
            about: userInfo.about
        });
    }, [userInfo, props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name: values.name,
            about: values.about,
        });
    }

    return (

        <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} name="edit" title="Редактировать профиль" isOpen={props.isOpen}>
            <input onChange={handleChange} value={"" || values.name} id="name-input" className="form__item form__item_el_name" name="name" placeholder="Иван"
                type="text" required minLength="2" maxLength="40" />
            <span className="form__input-error name-input-error">
            </span>
            <input onChange={handleChange} value={"" || values.about} id="occupation-input" className="form__item form__item_el_occupation" name="about"
                placeholder="Сантехник" type="text" required minLength="2" maxLength="200" />
            <span className="form__input-error occupation-input-error">
            </span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;