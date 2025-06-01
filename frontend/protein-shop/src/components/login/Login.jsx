import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const emailValid = email.includes("@") && email.includes(".");
    const passwordValid = password.length >= 8;

    setEmailError(email && !emailValid ? "Введіть коректний email" : "");
    setPasswordError(
      password && !passwordValid
        ? "Пароль має містити щонайменше 8 символів"
        : ""
    );

    setIsValid(emailValid && passwordValid);
  }, [email, password]);

  const checkAdminStatus = async (token) => {
    try {
      const response = await fetch(
        "https://localhost:7164/api/auth/profile/admin",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok)
        throw new Error("Не вдалося перевірити статус адміністратора");

      const data = await response.json();
      return data.isAdmin;
    } catch (err) {
      console.error("Admin check error:", err);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const loginResponse = await fetch(
        "https://localhost:7164/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!loginResponse.ok) {
        let message = "Помилка входу";
        const contentType = loginResponse.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const err = await loginResponse.json();
          message = err.message || message;
        } else {
          message = await loginResponse.text();
        }
        setError(message);
        setLoading(false);
        return;
      }

      const loginData = await loginResponse.json();
      localStorage.setItem("token", loginData.token);

      const isAdmin = await checkAdminStatus(loginData.token);

      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/account");
      }
    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
            <Link to="/account" className="header__icon header__icon--account">
              <svg
                fill="#2c8c49"
                viewBox="0 0 512 512"
                stroke="#2c8c49"
                xmlns="http://www.w3.org/2000/svg"
              >
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
      <main className="login-page">
        <h1 className="login-page__title">Увійти</h1>
        {error && (
          <div className="form__error form__error--server">{error}</div>
        )}
        <form className="login-page__form" onSubmit={handleSubmit} noValidate>
          <div className="form__group">
            <label htmlFor="loginEmail" className="form__label">
              Е-пошта
            </label>
            <input
              type="email"
              id="loginEmail"
              className="form__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <div className="form__error">{emailError}</div>}
          </div>

          <div className="form__group">
            <label htmlFor="loginPass" className="form__label">
              Пароль
            </label>
            <input
              type="password"
              id="loginPass"
              className="form__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordError && (
              <div className="form__error">{passwordError}</div>
            )}
          </div>

          <button
            type="submit"
            className="form__submit"
            disabled={!isValid || loading}
          >
            {loading ? "Завантаження..." : "Увійти"}
          </button>
        </form>

        <div className="login-page__register">
          Немає акаунта? <Link to="/register">Зареєструватися</Link>
        </div>
      </main>
    </>
  );
}
