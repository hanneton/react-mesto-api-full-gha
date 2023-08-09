import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Footer from './Footer.js';
import Header from './Header.js';
import Main from './Main.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import Login from './Login.js';
import InfoTooltip from './InfoTooltip';
import * as auth from './Authorization';

function App() {

  const [isEditProfilePopupOpen, setEditPopupState] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPopupState] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupState] = React.useState(false);
  const [isImagePopupOpen, setImagePopupState] = React.useState(false);
  const [selectedCard, setSelectedCardState] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const [isTooltipPopupOpen, setTooltipPopupOpen] = React.useState(false);
  const [tooltipIcon, setTooltipIcon] = React.useState(false);


  const navigate = useNavigate();

  React.useEffect(() => {
    Promise.all([api.getInitialInfo(), api.getInitialCards()])
      .then(([info, cards]) => {
        setCurrentUser(info);
        setCards(cards);
      })
      .catch(err => console.log(err));
  }, [isLoggedIn])

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [isImagePopupOpen])



  function handleCardLike(card) {
    const isLiked = card.likes.some(id => id === currentUser._id);
    api.setLikeStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => {
          return state.map((c) => c._id === card._id ? newCard : c)
        })
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(state => {
          return state.filter(c => c._id !== card._id);
        })
      })
      .catch(err => console.log(err));
  }

  function handleCardClick(card) {
    setImagePopupState(true);
    setSelectedCardState(card);
  }

  function handleEditAvatarClick() {
    setAvatarPopupState(true);
  }

  function handleEditProfileClick() {
    setEditPopupState(true);
  }

  function handleAddPlaceClick() {
    setAddPopupState(true);
  }

  function handleEscClose(event) {
    if (event.key === "Escape") {
      closeAllPopups();
    }
  }

  function closeAllPopups() {
    setSelectedCardState({});
    setImagePopupState(false);
    setEditPopupState(false);
    setAddPopupState(false);
    setAvatarPopupState(false);
    setTooltipPopupOpen(false);
    setTooltipIcon(false);
  }

  function handleUpdateUser({ name, about }) {
    api.editProfileInfo(name, about)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api.updateUserPic(avatar)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleAddPlaceSubmit(name, link) {
    api.addCard(name, link)
      .then((newCard) => {
        setCards([...cards, newCard]);
        closeAllPopups();
      })
      .catch(console.log);
  }

  function onSuccess() {
    setTooltipIcon(true);

    setTooltipPopupOpen(true);
  }

  function onError() {
    setTooltipPopupOpen(true);
  }

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getPersonalData(jwt)
        .then((data) => {
          setEmail(data.email);
          setLoggedIn(true);
          navigate('/');
        })
        .catch(err => console.log(err));
    }
  }

  React.useEffect(() => {
    checkToken();
  }, [isLoggedIn])

  function handleSignUp(password, email) {
    auth.register(password, email)
      .then(() => {
        onSuccess();
        navigate('/signin')
      })
      .catch(err => {
        console.log(err);
        onError();
      })
  }

  function handleSignIn(password, email) {
    auth.authentification(password, email)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        navigate('/');
      })
      .catch(err => {
        console.log(err);
        onError();
      })
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
  }

  return (
    <div className="App">
      <div className="page">
        <Header isLoggedIn={isLoggedIn} email={email} signOut={handleSignOut} />
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route
              path="/"
              element={<ProtectedRoute
                element={Main}
                cards={cards} onCardDelete={handleCardDelete}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                isLoggedIn={isLoggedIn}
              />} />
            <Route
              path="/signup"
              element={<Register onSignUp={handleSignUp} />}
            />
            <Route
              path="/signin"
              element={<Login onSignIn={handleSignIn} />}
            />
          </Routes>
          <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
          <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
        <CurrentUserContext.Provider value={cards}>
          <AddPlacePopup onAddCard={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
        <ImagePopup onClose={closeAllPopups} card={selectedCard} isOpen={isImagePopupOpen} />
        <InfoTooltip onClose={closeAllPopups} isOpen={isTooltipPopupOpen} icon={tooltipIcon} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
