import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import imageMapResize from "image-map-resizer";
import popularCategoriesImages from "../img/home/HomePage.js";
import map from "../img/home/nutrition-showcase/nutrition-showcase.png";
import "../css/global.css";
import "../css/home/theme.css";
import WeatherWidget from "../../WeatherWidget.jsx";

const categoryData = {
  protein: {
    name: "Протеїн",
    path: "/sport-nutrition?category=протеїн",
  },
  kreatine: {
    name: "Креатин",
    path: "/sport-nutrition?category=креатини",
  },
  bcaa: {
    name: "BCAA",
    path: "/sport-nutrition?category=аміно",
  },
  accessories: {
    name: "Аксесуари",
    path: "/accessories",
  },
  vitamins: {
    name: "Вітаміни",
    path: "/vitamins",
  },
};

const categories = ["protein", "kreatine", "bcaa", "accessories", "vitamins"];

export default function Home() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(categoryData[category].path);
  };

  useEffect(() => {
    imageMapResize();
  }, []);
  useEffect(() => {
    const faqItems = document.querySelectorAll(".faq__item");
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq__question");
      const answer = item.querySelector(".faq__answer");
      answer.style.maxHeight = "0px";
      const toggle = () => {
        const open = item.classList.toggle("faq__item--open");
        answer.style.maxHeight = open ? `${answer.scrollHeight}px` : "0px";
      };
      question.addEventListener("click", toggle);
      item._cleanup = () => question.removeEventListener("click", toggle);
    });

    const slider = document.querySelector(".popular-categories__list");
    const prev = document.querySelector(".popular-categories__arrow--prev");
    const next = document.querySelector(".popular-categories__arrow--next");
    const first = slider?.querySelector(".popular-categories__item");
    if (slider && prev && next && first) {
      let width = 0;
      const update = () => {
        const gap = parseInt(getComputedStyle(slider).gap) || 0;
        width = first.offsetWidth + gap;
        slider.scrollTo({ left: 0, behavior: "auto" });
      };
      window.addEventListener("resize", update);
      update();
      const onPrev = () =>
        slider.scrollBy({ left: -width, behavior: "smooth" });
      const onNext = () => slider.scrollBy({ left: width, behavior: "smooth" });
      prev.addEventListener("click", onPrev);
      next.addEventListener("click", onNext);
      return () => {
        window.removeEventListener("resize", update);
        prev.removeEventListener("click", onPrev);
        next.removeEventListener("click", onNext);
        faqItems.forEach((item) => item._cleanup && item._cleanup());
      };
    }
  }, []);
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
            {/* <input type="text" className="search" placeholder="Пошук товарів" /> */}
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

      <main className="main">
        <div className="main__container container">
          <section className="hero">
            <h1 className="hero__title">Ти можеш більше ніж ти думаєш!</h1>
            <p className="hero__subtitle">Все для справжніх атлетів!</p>
            <Link to="/sport-nutrition" className="button hero__button">
              Переглянути
            </Link>
          </section>

          <section className="popular-categories">
            <h2 className="popular-categories__title">Популярні категорії</h2>
            <div className="popular-categories__slider">
              <button
                className="popular-categories__arrow popular-categories__arrow--prev"
                aria-label="Попередня категорія"
              >
                ◀
              </button>
              <div className="popular-categories__list">
                {categories.map((cat) => (
                  <article key={cat} className="popular-categories__item">
                    <div
                      className="popular-categories__link"
                      onClick={() => handleCategoryClick(cat)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={popularCategoriesImages[cat]}
                        alt={categoryData[cat].name}
                        className="popular-categories__img"
                        width="158"
                      />
                      <h3 className="popular-categories__name">
                        {categoryData[cat].name}
                      </h3>
                    </div>
                  </article>
                ))}
              </div>
              <button
                className="popular-categories__arrow popular-categories__arrow--next"
                aria-label="Наступна категорія"
              >
                ▶
              </button>
            </div>
          </section>

          <section className="about-us">
            <div className="about-us__inner container">
              <h2 className="about-us__title">
                Про нас: магазин спортивного харчування Muscle.ua
              </h2>
              <div className="about-us__intro">
                <p className="about-us__text">
                  Спорт — це стиль життя, який надихає ставати кращими. У
                  Muscle.ua ви знайдете все необхідне для ефективних тренувань
                  та швидкого відновлення.
                </p>
                <p className="about-us__text">
                  Замовляйте зі зручною доставкою по Україні або забирайте
                  самовивозом у Києві.
                </p>
              </div>
              <h3 className="about-us__subtitle">
                Чому обирають спортивні добавки?
              </h3>
              <p className="about-us__text">
                Добавки допомагають поповнити енергію, прискорюють відновлення
                та підсилюють результати ваших тренувань.
              </p>
              <h3 className="about-us__subtitle">Наші категорії товарів</h3>
              <ul className="about-us__list">
                <li className="about-us__item">
                  <p>Протеїн — для нарощування м'язової маси.</p>
                </li>
                <li className="about-us__item">
                  <p>BCAA — незамінні амінокислоти.</p>
                </li>
                <li className="about-us__item">
                  <p>Вітаміни — підтримка імунітету.</p>
                </li>
                <li className="about-us__item">
                  <p>Аксесуари — повна підтримка вашого тренування.</p>
                </li>
              </ul>
              <p className="about-us__footer">
                Для детальнішої інформації дивіться наші відео на YouTube.
              </p>
            </div>
          </section>
          <section className="nutrition-showcase">
            <img
              src={map}
              alt=""
              className="nutrition-showcase__image"
              useMap="#storemap"
            />
            <map name="storemap">
              <area
                shape="poly"
                coords="358,96,337,95,320,97,301,98,285,98,268,100,234,107,253,103,216,114,205,121,205,133,202,144,204,152,203,166,203,177,202,192,197,201,183,208,176,211,170,222,151,245,141,266,140,316,142,340,143,367,141,392,144,425,146,640,193,685,236,700,312,717,351,782,351,824,413,858,479,863,516,836,521,786,517,715,536,702,557,691,543,493,582,392,585,260,540,203,521,193,524,120,489,101,392,92,434,91"
                title=""
                href="/sport-nutrition?category=протеїн"
              />
              <area
                shape="poly"
                coords="606,383,630,379,676,375,718,381,752,395,753,437,775,488,752,466,785,568,781,715,762,701,736,697,711,700,679,711,658,741,650,771,587,775,625,783,643,787,559,758,559,704,564,651,574,569,571,502,582,474,594,453,602,441,597,404,599,419"
                title="vitamins"
                href="/vitamins"
              />
              <area
                shape="poly"
                coords="709,87,810,82,861,90,758,80,905,87,924,125,924,162,960,183,953,237,942,282,932,336,922,511,914,577,908,615,875,635,859,652,840,672,836,698,823,711,794,712,782,505,791,567,789,591,790,624,790,658,778,466,768,436,764,403,724,358,698,365,682,362,685,322,748,370,684,277,679,245,664,221,666,172,703,143"
                title="accessories"
                href="/accessories"
              />
            </map>
          </section>
          <section className="faq">
            <h2 className="faq__title">Поширені питання</h2>
            <div className="faq__list">
              <div className="faq__item">
                <button className="faq__question">
                  Як зробити замовлення?
                </button>
                <div className="faq__answer">
                  <div className="faq__answer-content">
                    Натисніть кнопку "Переглянути", оберіть товар та заповніть
                    форму замовлення.
                  </div>
                </div>
              </div>

              <div className="faq__item">
                <button className="faq__question">
                  Які способи доставки доступні?
                </button>
                <div className="faq__answer">
                  <div className="faq__answer-content">
                    Ми пропонуємо кур'єрську доставку та самовивіз із наших
                    магазинів. Терміни доставки зазвичай складають 1–3 дні.
                  </div>
                </div>
              </div>

              <div className="faq__item">
                <button className="faq__question">Як повернути товар?</button>
                <div className="faq__answer">
                  <div className="faq__answer-content">
                    Заповніть форму повернення на сайті або зверніться до служби
                    підтримки. Ми приймаємо повернення протягом 14 днів.
                  </div>
                </div>
              </div>

              <div className="faq__item">
                <button className="faq__question">
                  Чи є знижки для постійних клієнтів?
                </button>
                <div className="faq__answer">
                  <div className="faq__answer-content">
                    Так, у нас діє програма лояльності: за кожну покупку
                    накопичуються бали, які можна обміняти на знижки.
                  </div>
                </div>
              </div>
            </div>
          </section>
          <h2 className="faq__title">Погода</h2>
          <WeatherWidget></WeatherWidget>
        </div>
      </main>

      <footer className="footer">
        <div className="footer__container">
          <p className="footer__text">© 2025 Muscle.ua. Всі права захищені.</p>
        </div>
      </footer>
    </>
  );
}
