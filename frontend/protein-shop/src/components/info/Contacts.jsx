import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../css/contacts.css";

export default function Contacts() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id.replace("q-", "")]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitSuccess(false);

    if (!formData.name.trim()) {
      setError("Будь ласка, введіть ваше ім'я");
      return;
    }

    if (!formData.contact.trim()) {
      setError("Будь ласка, введіть ваш телефон або email");
      return;
    }

    if (!formData.message.trim()) {
      setError("Будь ласка, введіть ваше повідомлення");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://localhost:7164/api/question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          contactInfo: formData.contact,
          question: formData.message,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Помилка при відправці запитання");
      }

      setSubmitSuccess(true);
      setFormData({
        name: "",
        contact: "",
        message: "",
      });

      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err) {
      setError(
        err.message ||
          "Сталася помилка при відправці форми. Будь ласка, спробуйте ще раз."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contacts-page page page-with-sidebar">
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

      <div className="contacts-content container">
        <div className="side-bar__container">
          <nav className="breadcrumbs" aria-label="Хлібні крихти">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to="/" className="breadcrumbs__link">
                  Головна
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link">Контакти</span>
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

        <main className="main-content">
          <h1 className="main-content__title">Контакти</h1>

          <ul className="contacts-info__list">
            <li className="contacts-info__item">
              <span>Телефон:</span>
              <a href="tel:0983432301" className="contacts-info__link">
                098-343-22-01
              </a>
            </li>
            <li className="contacts-info__item">
              <span>Email:</span>
              <a href="mailto:info@muscle222" className="contacts-info__link">
                info@muscle222
              </a>
            </li>
            <li className="contacts-info__item">
              <span>Viber:</span>
              <a
                href="viber://chat?number=+380926958323"
                className="contacts-info__link"
              >
                092-695-83-23
              </a>
            </li>
            <li className="contacts-info__item">
              <span>Telegram:</span>
              <a href="https://t.me/muscle3" className="contacts-info__link">
                @muscle
              </a>
            </li>
          </ul>

          <div className="contacts-address">
            <h2 className="contacts-address__title">Адреса</h2>
            <p className="contacts-address__text">
              м. Київ, вул. Борщагівська, 222,
              <br />
              ТРЦ «Oleg», 1 поверх
              <br />
              Пн–Пт: 10:00–20:00, Сб–Нд: 11:00–18:00
            </p>
          </div>

          <div className="contacts-map__container">
            <iframe
              className="contacts-map"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1270.3400964636419!2d30.4529669!3d50.4470573!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cc27725b49d7%3A0xd00801d72ba54c32!2z0KHQutCy0LXRgCDRltC80LXQvdGWINCe0LvQtdC90Lgg0KLQtdC70ZbQs9C4!5e0!3m2!1suk!2sua!4v1748733807609!5m2!1suk!2sua"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <section className="question-form">
            <h2 className="question-form__title">Маєш питання?</h2>
            <form className="question-form__form" onSubmit={handleSubmit}>
              <div className="question-form__group">
                <label htmlFor="q-name" className="question-form__label">
                  Ім'я
                </label>
                <input
                  type="text"
                  id="q-name"
                  className="question-form__input"
                  placeholder="Ваше ім'я"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="question-form__group">
                <label htmlFor="q-contact" className="question-form__label">
                  Телефон або Email
                </label>
                <input
                  type="text"
                  id="q-contact"
                  className="question-form__input"
                  placeholder="Контактні дані"
                  value={formData.contact}
                  onChange={handleChange}
                />
              </div>
              <div className="question-form__group">
                <label htmlFor="q-message" className="question-form__label">
                  Повідомлення
                </label>
                <textarea
                  id="q-message"
                  className="question-form__textarea"
                  rows="4"
                  placeholder="Ваше питання"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              {error && (
                <div
                  className="question-form__error"
                  style={{ color: "red", marginBottom: "15px" }}
                >
                  {error}
                </div>
              )}

              {submitSuccess && (
                <div
                  className="question-form__success"
                  style={{ color: "green", marginBottom: "15px" }}
                >
                  Ваше повідомлення успішно відправлено!
                </div>
              )}

              <button
                type="submit"
                className="question-form__button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Відправляємо..." : "Відправити"}
              </button>
            </form>
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
