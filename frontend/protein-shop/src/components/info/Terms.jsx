import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../css/terms.css";

export default function Terms() {
  return (
    <div className="terms-page page page-with-sidebar">
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

      <div className="terms-content container">
        <aside className="side-bar__container">
          <nav className="breadcrumbs" aria-label="Хлібні крихти">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to="/" className="breadcrumbs__link">
                  Головна
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link">Умови</span>
              </li>
            </ul>
          </nav>
          <div className="sidebar-menu">
            <ul>
              <li className="sidebar-menu__item">
                <NavLink
                  to="/payment-delivery"
                  className={({ isActive }) =>
                    isActive ? "sidebar-menu__link" : "sidebar-menu__link"
                  }
                >
                  Оплата і доставка
                </NavLink>
              </li>
              <li className="sidebar-menu__item">
                <NavLink
                  to="/contacts"
                  className={({ isActive }) =>
                    isActive ? "sidebar-menu__link" : "sidebar-menu__link"
                  }
                >
                  Контакти
                </NavLink>
              </li>
              <li className="sidebar-menu__item">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "sidebar-menu__link" : "sidebar-menu__link"
                  }
                >
                  Про нас
                </NavLink>
              </li>
              <li className="sidebar-menu__item">
                <NavLink
                  to="/exchange"
                  className={({ isActive }) =>
                    isActive ? "sidebar-menu__link" : "sidebar-menu__link"
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
                    isActive ? "sidebar-menu__link" : "sidebar-menu__link"
                  }
                >
                  Відгуки про магазин
                </NavLink>
              </li>
            </ul>
          </div>
        </aside>

        <main className="main-content">
          <h1 className="main-content__title">
            Публічна оферта та Політика конфіденційності
          </h1>

          <section className="policy__section">
            <h2 className="main-content__subtitle">
              1. Загальні поняття та сфера застосування
            </h2>
            <p className="main-content__text">
              1.1. Публічна оферта (далі – «Оферта») – публічна пропозиція
              Продавця щодо укладення Договору-оферти...
            </p>
            <ul className="main-content__list">
              <li className="main-content__list-item">
                1.2. Товар або Послуга – об'єкт угоди сторін...
              </li>
              <li className="main-content__list-item">
                1.3. Інтернет-магазин – сайт Продавця за адресою...
              </li>
              <li className="main-content__list-item">
                1.4. Покупець – дієздатна фізична особа...
              </li>
              <li className="main-content__list-item">
                1.5. Продавець – ФОП Семак Р.В....
              </li>
            </ul>
          </section>

          <section className="policy__section">
            <h2 className="main-content__subtitle">2. Предмет Договору</h2>
            <p className="main-content__text">
              2.1. Продавець зобов’язується передати у власність Покупцю
              Товар...
            </p>
            <p className="main-content__text">
              2.2. Датою укладення Договору-оферти є момент акцепту оферти
              Покупцем.
            </p>
          </section>

          <section className="policy__section">
            <h2 className="main-content__subtitle">3. Оформлення Замовлення</h2>
            <ul className="main-content__list">
              <li className="main-content__list-item">
                3.1. Покупець самостійно оформлює замовлення...
              </li>
              <li className="main-content__list-item">
                3.2. Продавець має право відмовитися...
              </li>
              <li className="main-content__list-item">
                3.3. Покупець зобов'язується надати...
              </li>
            </ul>
          </section>

          <section className="policy__section">
            <h2 className="main-content__subtitle">
              4. Ціна і Доставка Товару
            </h2>
            <ul className="main-content__list">
              <li className="main-content__list-item">
                4.1. Ціни визначаються Продавцем та вказані на сайті...
              </li>
              <li className="main-content__list-item">
                4.2. Ціни можуть змінюватися в односторонньому порядку...
              </li>
              <li className="main-content__list-item">
                4.3. Вартість доставки оплачується Покупцем...
              </li>
            </ul>
          </section>
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
