import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    validate();
  }, [name, email, password, agree]);

  const validate = () => {
    let valid = true;
    const namePattern = /^[A-Za-zА-Яа-яЇїІіЄєҐґ\s-]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!namePattern.test(name.trim())) {
      setNameError("Лише букви, пробіли та дефіси");
      valid = false;
    } else {
      setNameError("");
    }

    if (!emailPattern.test(email.trim())) {
      setEmailError("Невірний формат e-mail");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 6) {
      setPasswordError("Пароль має бути щонайменше 6 символів");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!agree) valid = false;
    setIsValid(valid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://localhost:7164/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        let message = "Користувач з таким email вже існує.";
        console.log(message);
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const err = await response.json();
          message = err.message || message;
        } else {
          message = await response.text();
        }
        setError(message);
        setLoading(false);
        return;
      }

      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const token = localStorage.getItem("token");
  return (
    <>
      <header className="header">
        <div className="header__container">
          <Link to="/" className="header__logo">
            Muscle.ua
          </Link>
          <nav className="nav">
            <ul className="nav__list">
              <li className="nav__item">
                <Link to="/sport-nutrition" className="nav__link">
                  Спортивне харчування
                </Link>
              </li>
              <li className="nav__item">
                <Link to="/accessories" className="nav__link">
                  Аксесуари
                </Link>
              </li>
              <li className="nav__item">
                <Link to="/vitamins" className="nav__link">
                  Вітаміни
                </Link>
              </li>
              <li className="nav__item">
                <Link to="/contacts" className="nav__link">
                  Контакти
                </Link>
              </li>
            </ul>
          </nav>
          <div className="header__actions">
            <Link
              to={token ? "/account" : "/login"}
              className="header__icon header__icon--account"
            >
              <svg
                fill="#2c8c49"
                viewBox="0 0 512 512"
                id="_x30_1"
                version="1.1"
                xml:space="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                stroke="#2c8c49"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M256,90 c37.02,0,67.031,35.468,67.031,79.219S293.02,248.438,256,248.438s-67.031-35.468-67.031-79.219S218.98,90,256,90z M369.46,402 H142.54c-11.378,0-20.602-9.224-20.602-20.602C121.938,328.159,181.959,285,256,285s134.062,43.159,134.062,96.398 C390.062,392.776,380.839,402,369.46,402z"></path>
                </g>
              </svg>
            </Link>
            <Link to="/cart" className="header__icon header__icon--cart">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                    stroke="#2c8c49"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </Link>
          </div>
        </div>
      </header>

      <main className="register-page">
        <h1 className="register-page__title">Реєстрація</h1>
        {error && (
          <div className="form__error form__error--server">{error}</div>
        )}
        <form
          className="register-page__form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="form__group">
            <label htmlFor="regName" className="form__label">
              Ім'я та прізвище
            </label>
            <input
              type="text"
              id="regName"
              className="form__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {nameError && <div className="form__error">{nameError}</div>}
          </div>

          <div className="form__group">
            <label htmlFor="regEmail" className="form__label">
              Е-пошта
            </label>
            <input
              type="email"
              id="regEmail"
              className="form__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <div className="form__error">{emailError}</div>}
          </div>

          <div className="form__group">
            <label htmlFor="regPass" className="form__label">
              Пароль
            </label>
            <input
              type="password"
              id="regPass"
              className="form__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordError && (
              <div className="form__error">{passwordError}</div>
            )}
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="regAgree"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              required
            />
            <label htmlFor="regAgree">
              Підтверджуючи реєстрацію, я приймаю умови користувацької угоди
            </label>
          </div>

          <button
            type="submit"
            className="form__submit"
            disabled={!isValid || loading}
          >
            {loading ? "Завантаження..." : "Зареєструватися"}
          </button>
        </form>

        <div className="register-page__login">
          Вже є акаунт? <Link to="/login">Увійти</Link>
        </div>
      </main>
    </>
  );
}
