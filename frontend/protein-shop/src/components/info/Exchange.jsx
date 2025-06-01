import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../css/exchange.css";

export default function Exchange() {
  return (
    <div className="exchange-page page page-with-sidebar">
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

      <div className="exchange-content container">
        <aside className="side-bar__container">
          <nav className="breadcrumbs" aria-label="Хлібні крихти">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to="/" className="breadcrumbs__link">
                  Головна
                </Link>
              </li>
              <li className="breadcrumbs__item" aria-current="page">
                <span className="breadcrumbs__link">Обмін та повернення</span>
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
                    isActive ? "sidebar-menu__link" : "sidebar-menu__link"
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
          <h1 className="main-content__title">Обмін та повернення</h1>

          <section className="exchange__section">
            <h2 className="main-content__subtitle">
              Гарантії та повернення товару
            </h2>
            <p className="main-content__text">
              Товар на сайті — 100 % оригінальний. Поверненню не підлягає, якщо
              не відповідає замовленню або виявлений брак.
            </p>
            <h3 className="main-content__subtitle">
              Умови роботи без «розумних» слів:
            </h3>
            <ul className="main-content__list">
              <li className="main-content__list-item">
                Ми гарантуємо безпечні та сертифіковані товари.
              </li>
              <li className="main-content__list-item">
                Обробка та відправка замовлення протягом робочого дня.
              </li>
              <li className="main-content__list-item">
                Якщо технічні проблеми, ми запропонуємо альтернативу.
              </li>
              <li className="main-content__list-item">
                Готові вирішувати питання особисто, щоб ви залишились
                задоволені.
              </li>
            </ul>
          </section>

          <section className="exchange__section">
            <h2 className="main-content__subtitle">Ваші зобов’язання:</h2>
            <ul className="main-content__list">
              <li className="main-content__list-item">
                Перевірити цілісність пакунку при отриманні.
              </li>
              <li className="main-content__list-item">
                Повернути товар протягом 14 днів у разі пошкодження.
              </li>
              <li className="main-content__list-item">
                Для Нової пошти забрати посилку протягом 3–4 днів, інакше вона
                повернеться автоматично.
              </li>
              <li className="main-content__list-item">
                Замовлення за передоплатою відправляються після надходження
                коштів.
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
