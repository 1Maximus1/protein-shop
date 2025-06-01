import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../css/about-us.css";

export default function About() {
  return (
    <div className="about-page page page-with-sidebar">
      <header className="header">
        <div className="header__container">
          <Link to="/" className="header__logo">
            Muscle.ua
          </Link>
          <nav className="nav">
            <ul className="nav__list">
              <li className="nav__item">
                <NavLink to="/sport-nutrition" className="nav__link">
                  Спортивне харчування
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink to="/accessories" className="nav__link">
                  Аксесуари
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink to="/vitamins" className="nav__link">
                  Вітаміни
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink to="/contacts" className="nav__link">
                  Контакти
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="about-content container">
        <div className="side-bar__container">
          <nav className="breadcrumbs" aria-label="Хлібні крихти">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to="/" className="breadcrumbs__link">
                  Головна
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link">Про нас</span>
              </li>
            </ul>
          </nav>
          <aside className="sidebar-menu">
            <ul>
              <li className="sidebar-menu__item">
                <NavLink
                  to="/payment-delivery"
                  className={({ isActive }) =>
                    isActive
                      ? "sidebar-menu__link sidebar-menu__link--active"
                      : "sidebar-menu__link"
                  }
                >
                  Оплата і доставка
                </NavLink>
              </li>
              <li className="sidebar-menu__item">
                <NavLink
                  to="/contacts"
                  className={({ isActive }) =>
                    isActive
                      ? "sidebar-menu__link sidebar-menu__link--active"
                      : "sidebar-menu__link"
                  }
                >
                  Контакти
                </NavLink>
              </li>
              <li className="sidebar-menu__item">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "sidebar-menu__link sidebar-menu__link--active"
                      : "sidebar-menu__link"
                  }
                >
                  Про нас
                </NavLink>
              </li>
              <li className="sidebar-menu__item">
                <NavLink
                  to="/exchange"
                  className={({ isActive }) =>
                    isActive
                      ? "sidebar-menu__link sidebar-menu__link--active"
                      : "sidebar-menu__link"
                  }
                >
                  Обмін та повернення
                </NavLink>
              </li>
              <li className="sidebar-menu__item">
                <NavLink
                  to="/terms"
                  className={({ isActive }) =>
                    isActive
                      ? "sidebar-menu__link sidebar-menu__link--active"
                      : "sidebar-menu__link"
                  }
                >
                  Угода користувача
                </NavLink>
              </li>
              <li className="sidebar-menu__item">
                <NavLink
                  to="/reviews"
                  className={({ isActive }) =>
                    isActive
                      ? "sidebar-menu__link sidebar-menu__link--active"
                      : "sidebar-menu__link"
                  }
                >
                  Відгуки про магазин
                </NavLink>
              </li>
            </ul>
          </aside>
        </div>

        <main className="about main-content">
          <h1 className="about__title">Про нас</h1>

          <h2 className="about__subtitle">Хто ми?</h2>
          <p className="about__text">
            Ми вважаємо себе невеликим магазином, незважаючи на те, що працюємо
            з 2013 року.
          </p>
          <p className="about__text">
            Називайте нас «Мускул», «Масло сторі», «Містер Мускул» – без
            різниці. Головне, щоб ви були задоволені нашим сервісом.
          </p>
          <p className="about__text">
            А взагалі правильно – «Масл Стор». Тепер ми просто MUSCLE.
          </p>

          <h2 className="about__subtitle">Наша команда</h2>
          <p className="about__text">
            У нас працюють молоді ентузіасти, які п’ють протеїн, приймають
            омегу-3 і головне — займаються спортом.
          </p>
          <p className="about__text">
            Ми не «напхаємо» товар, а радимо по-дружньому. Так, буває: радимо
            найкраще — ви бачите результат і повертаєтесь до нас знову.
          </p>

          <h2 className="about__subtitle">Факти про магазин:</h2>
          <ul className="about__list">
            <li className="about__list-item">Працюємо з 2013 року.</li>
            <li className="about__list-item">
              У нас є офлайн-магазини в Києві.
            </li>
            <li className="about__list-item">
              Найбільший YouTube-канал про спортивне харчування в СНД.
            </li>
            <li className="about__list-item">
              Пояснюємо простими словами для простих людей.
            </li>
          </ul>

          <p className="about__text">
            <div>Бути спортивним просто!</div>
          </p>
        </main>
      </div>

      <footer className="footer">
        <div className="footer__container">
          <p className="footer__text">© 2025 Muscle.ua. Всі права захищені.</p>
        </div>
      </footer>
    </div>
  );
}
