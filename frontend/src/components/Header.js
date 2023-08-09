import { Link } from "react-router-dom";
import React from "react";
import { useLocation } from 'react-router-dom';

function Header(props) {
    const currentLocation = useLocation();
    return (
        <header className="header">
            <Link to="/" className="logo header__logo" />
            <div>
                <Link to={`/${props.isLoggedIn
                    ? ''
                    : `sign${currentLocation.pathname === '/signup'
                        ? 'in'
                        : 'up'}`}`}
                    className="header__link"
                >
                    {props.isLoggedIn
                        ? props.email
                        : currentLocation.pathname === '/signup'
                            ? 'Войти'
                            : 'Регистрация'}
                </Link>
                {props.isLoggedIn && <Link to="/signin" onClick={props.signOut} className="header__link">Выйти</Link>}
            </div>
        </header>
    )
}

export default Header;