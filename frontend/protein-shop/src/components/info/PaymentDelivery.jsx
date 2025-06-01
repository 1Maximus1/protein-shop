import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../css/payment-delivery.css";

export default function PaymentDelivery() {
  return (
    <div className="payment-delivery-page page page-with-sidebar">
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

      <div className="content container">
        <aside className="side-bar__container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to="/" className="breadcrumbs__link">
                  Головна
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link">Оплата і доставка</span>
              </li>
            </ul>
          </nav>
          <div className="sidebar-menu">
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
          </div>
        </aside>

        <main className="main-content">
          <h1 className="main-content__title">Оплата і доставка</h1>

          <section className="delivery-methods">
            <h2 className="main-content__subtitle">Способи доставки</h2>
            <div className="delivery-methods__list">
              <div className="delivery-methods__item">
                <p className="main-content__text">
                  Нова Пошта (
                  <span className="delivery-methods__highlight">
                    від 4000 грн — безкоштовно
                  </span>
                  )<br />
                  Замовлення відправляємо щодня до 18:00. Строки 1–2 дні.
                </p>
              </div>
              <div className="delivery-methods__item">
                <p className="main-content__text">
                  Кур'єр «Нова Пошта» — за тарифами перевізника.
                </p>
              </div>
              <div className="delivery-methods__item">
                <p className="main-content__text">
                  Самовивіз із магазину:
                  <br />
                  м. Київ, вул. Борщагівська, 154, ТРЦ «Мармелад», 1 поверх.
                </p>
              </div>
            </div>
          </section>

          <section className="payment-methods">
            <h2 className="main-content__subtitle">Способи оплати</h2>
            <div className="payment-methods__list">
              <div className="payment-methods__item">
                <p className="main-content__text">
                  Оплата карткою онлайн (
                  <span className="payment-methods__highlight">0% комісії</span>
                  ) — Visa, MasterCard.
                </p>
              </div>
              <div className="payment-methods__item">
                <p className="main-content__text">
                  Оплата частинами Monobank (до 5 місяців).
                </p>
              </div>
              <div className="payment-methods__item">
                <p className="main-content__text">
                  Оплата частинами ПриватБанк (до 5 платежів).
                </p>
              </div>
              <div className="payment-methods__item">
                <p className="main-content__text">
                  Готівкою кур'єру або у відділенні Нової Пошти.
                </p>
              </div>
            </div>
          </section>

          <section className="guarantee">
            <h2 className="main-content__subtitle">
              Гарантії та повернення товару
            </h2>
            <p className="main-content__text">
              Ми гарантуємо 100% оригінальність товарів. Якщо товар має брак, ви
              можете повернути його протягом 14 днів.
            </p>
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
