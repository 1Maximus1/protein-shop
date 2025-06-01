import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/account.css";

export default function Account() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviews, setReviews] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("orders");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      navigate("/login");
      return;
    }

    const checkAdminStatus = async () => {
      try {
        const adminCheckResponse = await fetch(
          "https://localhost:7164/api/auth/profile/admin",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (adminCheckResponse.ok) {
          const adminData = await adminCheckResponse.json();
          if (adminData.isAdmin) {
            navigate("/admin", { replace: true });
            return;
          }
        }

        const [profileRes, reviewsRes, ordersRes] = await Promise.all([
          fetch("https://localhost:7164/api/user/profile", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("https://localhost:7164/api/reviews/user", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("https://localhost:7164/api/orders", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!profileRes.ok) throw new Error("Не вдалося завантажити профіль");

        const profileData = await profileRes.json();
        const reviewsData = await reviewsRes.json();
        const ordersData = await ordersRes.json();

        setUser(profileData);
        setReviews(reviewsData);
        setOrders(ordersData);
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Помилка завантаження даних:", err.message);
        setError(err.message);
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString)
      .toLocaleString("uk-UA", options)
      .replace(",", " о");
  };

  if (loading) {
    return (
      <div className="loading">
        <p>Завантаження профілю...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

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

      <main className="account-page">
        <h1 className="account-page__title">Особистий кабінет</h1>

        {error && (
          <div className="form__error form__error--server">{error}</div>
        )}

        {user && (
          <div className="account-info">
            <div className="account-info__item">
              <span className="account-info__label">Ім'я:</span>
              <span className="account-info__value">
                {user.name || "Не вказано"}
              </span>
            </div>
            <div className="account-info__item">
              <span className="account-info__label">Email:</span>
              <span className="account-info__value">{user.email}</span>
            </div>
          </div>
        )}
        <div className="account-actions">
          <button onClick={handleLogout} className="account-action--logout">
            Вийти
          </button>
        </div>

        <div className="account-tabs">
          <button
            className={`account-tab ${
              activeTab === "orders" ? "account-tab--active" : ""
            }`}
            onClick={() => setActiveTab("orders")}
          >
            Мої замовлення
          </button>
          <button
            className={`account-tab ${
              activeTab === "reviews" ? "account-tab--active" : ""
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Мої відгуки
          </button>
        </div>
        <h2 className="section-title">Історія замовлень</h2>

        {activeTab === "orders" && (
          <div className="orders-section">
            {orders.length > 0 ? (
              <div className="orders-list">
                {orders.map((order) => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <span className="order-id">Замовлення #{order.id}</span>
                      <span className="order-date">
                        {formatDate(order.createdAt)}
                      </span>
                      <span
                        className={`order-status order-status--${order.status.toLowerCase()}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="order-products">
                      {order.items.map((item) => (
                        <div key={item.id} className="order-product__item">
                          <div className="product-info">
                            <h3 className="product-name">{item.name}</h3>
                            <p className="product-quantity">
                              {item.quantity} × {item.price} грн
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="order-footer">
                      <span className="order-total">
                        Адрес: {order.address}
                      </span>
                    </div>
                    <div className="order-footer">
                      <span className="order-total">
                        Сума: {order.totalAmount} грн
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-orders">У вас ще немає замовлень</p>
            )}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="reviews-section">
            <h2 className="section-title">Мої відгуки</h2>
            {reviews.length > 0 ? (
              <div className="reviews-list">
                {reviews.map((review) => (
                  <div key={review.id} className="review-card">
                    <div className="review-meta">
                      <span className="review-author">{user.name}</span>
                      <span className="review-date">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>
                    <div className="review-rating">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </div>
                    <div className="review-content">
                      <p className="review-text">{review.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-reviews">Ви ще не залишили жодного відгуку</p>
            )}
          </div>
        )}
      </main>
      <footer className="footer">
        <div className="container footer__container">
          <p className="footer__text">© 2025 Muscle.ua. Всі права захищені.</p>
        </div>
      </footer>
    </>
  );
}
