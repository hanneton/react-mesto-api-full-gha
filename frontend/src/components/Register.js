import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../hooks/useForm";

function Register(props) {


    const { values, handleChange } = useForm({
        email: '',
        password: ''
    })

    function handleSubmit(e) {
        e.preventDefault();
        props.onSignUp(values.password, values.email);
    }

    return (
        <div className="auth">
            <h2 className="auth__title">Регистрация</h2>
            <form onSubmit={handleSubmit} className="auth__form">
                <input onChange={handleChange} value={values.email} name="email" className="auth__input" placeholder="Email" />
                <input onChange={handleChange} value={values.password} name="password" className="auth__input" placeholder="Пароль" />
                <button className="auth__btn" type="submit">Зарегистрироваться</button>
            </form>
            <Link to="/signin" className="auth__caption">Уже зарегистрированы? Войти</Link>
        </div>
    )
}

export default Register;