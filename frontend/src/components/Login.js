import React from "react";
import { useForm } from "../hooks/useForm";

function Login(props) {

    const { values, handleChange } = useForm({
        email: '',
        password: ''
    })

    function handleSubmit(e) {
        e.preventDefault();
        props.onSignIn(values.password, values.email);
    }

    return (
        <div className="auth">
            <h2 className="auth__title">Вход</h2>
            <form onSubmit={handleSubmit} className="auth__form">
                <input onChange={handleChange} value={values.email} name="email" className="auth__input" placeholder="Email"></input>
                <input onChange={handleChange} value={values.password} name="password" className="auth__input" placeholder="Пароль"></input>
                <button className="auth__btn" type="submit">Войти</button>
            </form>
        </div>
    )
}

export default Login;