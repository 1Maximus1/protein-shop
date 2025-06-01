import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/cart.css";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchCart = async () => {
      try {
        const response = await fetch("https://localhost:7164/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok)
          throw new Error(
            "Не вдалося завантажити кошик. Треба зайти в свій аккаунт (login or Register)"
          );

        const data = await response.json();
        setCartItems(data.items ?? []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [navigate]);

  const updateQuantity = async (productId, newQuantity) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://localhost:7164/api/cart/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantity: newQuantity }),
        }
      );

      if (!response.ok) throw new Error("Не вдалося оновити кількість");

      const updatedCart = await response.json();
      setCartItems(updatedCart.items ?? []);
    } catch (err) {
      setError(err.message);
    }
  };

  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://localhost:7164/api/cart/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Не вдалося видалити товар");

      const updatedCart = await response.json();
      setCartItems(updatedCart.items ?? []);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmitOrder = async () => {
    if (!address.trim()) {
      setAddressError("Будь ласка, введіть адресу доставки");
      return;
    } else {
      setAddressError("");
    }

    setIsSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://localhost:7164/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
          shippingAddress: address,
          totalAmount: calculateTotal(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Не вдалося оформити замовлення");
      }

      navigate(`/account`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  if (loading) return <div className="loading">Завантаження кошика...</div>;
  if (error) return <div className="error">Помилка: {error}</div>;

  return (
    <div className="page">
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

      <main className="cart-page">
        <h1 className="cart-page__title">Кошик</h1>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Ваш кошик порожній</p>
            <Link to="/sport-nutrition" className="cart-empty__button">
              Перейти до покупок
            </Link>
          </div>
        ) : (
          <div className="cart-container">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="cart-item__image"
                  />
                  <div className="cart-item__info">
                    <h3 className="cart-item__name">{item.name}</h3>
                    <p className="cart-item__price">{item.price} грн</p>
                    <div className="cart-item__quantity">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="cart-item__remove"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2 className="cart-summary__title">Підсумок</h2>
              <div className="cart-summary__row">
                <span>
                  Товари (
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                </span>
                <span>{calculateTotal()} грн</span>
              </div>
              <div className="cart-summary__row">
                <span>Доставка</span>
                <span>Безкоштовно</span>
              </div>
              <div className="cart-summary__total">
                <span>Всього</span>
                <span>{calculateTotal()} грн</span>
              </div>

              <div className="shipping-address">
                <label
                  htmlFor="shippingAddress"
                  className="shipping-address__label"
                >
                  Адреса доставки
                </label>
                <input
                  type="text"
                  id="shippingAddress"
                  className={`shipping-address__input ${
                    addressError ? "input-error" : ""
                  }`}
                  placeholder="Введіть адресу доставки"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (addressError && e.target.value.trim()) {
                      setAddressError("");
                    }
                  }}
                  required
                />
                {addressError && (
                  <div className="form__error form__error--address">
                    {addressError}
                  </div>
                )}
              </div>

              {error && (
                <div className="form__error form__error--server">{error}</div>
              )}

              <button
                className="cart-summary__checkout"
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Обробка..." : "Оформити замовлення"}
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="container footer__container">
          <p className="footer__text">© 2025 Muscle.ua. Всі права захищені.</p>
        </div>
      </footer>
    </div>
  );
}
