import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../css/store-reviews.css";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    text: "",
    rating: 0,
  });
  const [sortType, setSortType] = useState("newest");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    const fetchReviews = async () => {
      try {
        const response = await fetch("https://localhost:7164/api/reviews");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserProfile = async () => {
      if (!token) return;

      try {
        const response = await fetch(
          "https://localhost:7164/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch profile");
        const profileData = await response.json();
        setUser(profileData);
      } catch (err) {
        console.error("Profile fetch error:", err);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    };

    fetchReviews();
    fetchUserProfile();
  }, []);

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("uk-UA", options);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStarClick = (rating) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://localhost:7164/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Не вдалося надіслати відгук");

      const newReview = await response.json();
      setReviews((prev) => [newReview, ...prev]);
      setFormData({ text: "", rating: 0 });
      alert("Ваш відгук успішно додано!");
    } catch (error) {
      console.error("Помилка при відправці відгуку:", error);
      alert("Сталася помилка: " + error.message);
    }
  };

  const sortReviews = () => {
    const sortedReviews = [...reviews];
    switch (sortType) {
      case "newest":
        return sortedReviews.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "oldest":
        return sortedReviews.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      case "rating":
        return sortedReviews.sort((a, b) => b.rating - a.rating);
      default:
        return sortedReviews;
    }
  };

  const handleSortChange = (type) => {
    setSortType(type);
  };

  const handleWriteReviewClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    document
      .querySelector(".review-form")
      .scrollIntoView({ behavior: "smooth" });
  };

  if (loading) return <div className="loading">Завантаження відгуків...</div>;
  if (error) return <div className="error">Помилка: {error}</div>;

  return (
    <div className="reviews-page page page-with-sidebar">
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

      <div className="reviews-content container">
        <aside className="side-bar__container">
          <nav className="breadcrumbs" aria-label="Хлібні крихти">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to="/" className="breadcrumbs__link">
                  Головна
                </Link>
              </li>
              <li className="breadcrumbs__item" aria-current="page">
                <span className="breadcrumbs__link">Відгуки про магазин</span>
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
          <div className="reviews__header">
            <div className="reviews__rating">
              {calculateAverageRating(reviews)} ★★★★★ ({reviews.length}{" "}
              відгуків)
            </div>
            <button
              className="reviews__button"
              onClick={handleWriteReviewClick}
            >
              Написати відгук
            </button>
            <div className="reviews__sort">
              <button
                className={`reviews__sort-button ${
                  sortType === "newest" ? "reviews__sort-button--active" : ""
                }`}
                onClick={() => handleSortChange("newest")}
              >
                спочатку нові
              </button>
              <button
                className={`reviews__sort-button ${
                  sortType === "rating" ? "reviews__sort-button--active" : ""
                }`}
                onClick={() => handleSortChange("rating")}
              >
                по рейтингу
              </button>
              <button
                className={`reviews__sort-button ${
                  sortType === "oldest" ? "reviews__sort-button--active" : ""
                }`}
                onClick={() => handleSortChange("oldest")}
              >
                спочатку старі
              </button>
            </div>
          </div>

          <div className="review-list">
            {sortReviews().map((review) => (
              <div key={review.id} className="review-item">
                <span className="review-item__author">
                  {review.user?.name || review.author}
                </span>
                <span className="review-item__date">
                  {formatDate(review.createdAt)}
                </span>
                <span className="review-item__stars">
                  {renderStars(review.rating)}
                </span>
                <p className="review-item__text">{review.text}</p>
              </div>
            ))}
          </div>

          {isAuthenticated ? (
            <form className="review-form" onSubmit={handleSubmit}>
              <h2 className="main-content__subtitle">Написати новий відгук</h2>
              <div className="review-form__group">
                <textarea
                  name="text"
                  className="review-form__textarea"
                  placeholder="Ваш відгук"
                  value={formData.text}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="review-form__stars">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`review-form__star ${
                      i < formData.rating ? "selected" : ""
                    }`}
                    onClick={() => handleStarClick(i + 1)}
                  >
                    {i < formData.rating ? "★" : "☆"}
                  </span>
                ))}
              </div>
              <button type="submit" className="review-form__submit">
                Надіслати
              </button>
            </form>
          ) : (
            <div className="review-login-prompt">
              <p>
                Щоб залишити відгук, будь ласка,{" "}
                <Link to="/login">увійдіть</Link> або{" "}
                <Link to="/register">зареєструйтесь</Link>.
              </p>
            </div>
          )}
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

function calculateAverageRating(reviews) {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / reviews.length).toFixed(1);
}
