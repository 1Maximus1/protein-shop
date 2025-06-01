import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/admin/admin.css";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("users");
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    category: "",
    imageUrl: "",
  });
  const navigate = useNavigate();
  const categories = [
    "протеїн",
    "креатини",
    "аміно",
    "вітаміни",
    "шейкери",
    "пляшки_для_води",
    "пояси",
    "бинти",
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const profileResponse = await fetch(
          "https://localhost:7164/api/auth/profile/admin",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!profileResponse.ok)
          throw new Error("Не вдалося завантажити профіль");

        const profileData = await profileResponse.json();
        if (!profileData.isAdmin) {
          navigate("/account");
          return;
        }

        const [usersRes, reviewsRes, productsRes] = await Promise.all([
          fetch("https://localhost:7164/api/admin/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("https://localhost:7164/api/reviews", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("https://localhost:7164/api/products", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!usersRes.ok || !reviewsRes.ok || !productsRes.ok)
          throw new Error("Не вдалося завантажити дані");

        const usersData = await usersRes.json();
        const reviewsData = await reviewsRes.json();
        const productsData = await productsRes.json();

        setUsers(usersData);
        setReviews(reviewsData);
        setProducts(productsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Ви впевнені, що хочете видалити цього користувача?"))
      return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://localhost:7164/api/admin/users/${userId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Не вдалося видалити користувача");

      setUsers(users.filter((user) => user.id !== userId));
      alert("Користувача успішно видалено");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleMakeAdmin = async (userId) => {
    if (!window.confirm("Надати цьому користувачу права адміністратора?"))
      return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://localhost:7164/api/admin/users/${userId}/make-admin`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Не вдалося змінити права користувача");

      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, isAdmin: true } : user
        )
      );
      alert("Права адміністратора успішно надані");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Ви впевнені, що хочете видалити цей відгук?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://localhost:7164/api/admin/reviews/${reviewId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Не вдалося видалити відгук");

      setReviews(reviews.filter((review) => review.id !== reviewId));
      alert("Відгук успішно видалено");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Ви впевнені, що хочете видалити цей товар?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://localhost:7164/api/admin/products/${productId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Не вдалося видалити товар");

      setProducts(products.filter((product) => product.id !== productId));
      alert("Товар успішно видалено");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://localhost:7164/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const addedProduct = await response.json();
      setProducts([...products, addedProduct]);
      setNewProduct({
        name: "",
        price: 0,
        category: "",
        imageUrl: "",
      });
      alert("Товар успішно додано");
    } catch (err) {
      setError(err.message);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("uk-UA", options);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return <div className="loading">Завантаження даних...</div>;

  return (
    <div className="admin-page">
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

      <main className="admin-content">
        <h1 className="admin-title">Адмін панель</h1>

        <div className="admin-tabs">
          <button
            className={`admin-tab ${
              activeTab === "users" ? "admin-tab--active" : ""
            }`}
            onClick={() => setActiveTab("users")}
          >
            Користувачі
          </button>
          <button
            className={`admin-tab ${
              activeTab === "reviews" ? "admin-tab--active" : ""
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Відгуки
          </button>
          <button
            className={`admin-tab ${
              activeTab === "products" ? "admin-tab--active" : ""
            }`}
            onClick={() => setActiveTab("products")}
          >
            Товари
          </button>
          <button
            onClick={handleLogout}
            className="account-action account-action--logout"
          >
            Вийти
          </button>
        </div>

        {error && (
          <div
            className="error-message"
            style={{ color: "red", margin: "20px 0" }}
          >
            Помилка: {error}
          </div>
        )}

        {activeTab === "users" && (
          <div className="admin-section">
            <h2 className="section-title">Керування користувачами</h2>
            <div className="users-list">
              {users.map((user) => (
                <div key={user.id} className="user-card">
                  <div className="user-info">
                    <h3 className="user-name">{user.name}</h3>
                    <p className="user-email">{user.email}</p>
                    <p className="user-date">
                      Зареєстрований: {formatDate(user.createdAt)}
                    </p>
                    <p className="user-role">Роль: {user.role}</p>
                  </div>
                  <div className="user-actions">
                    {!(user.role == "Admin") && (
                      <button
                        onClick={() => handleMakeAdmin(user.id)}
                        className="admin-button"
                      >
                        Зробити адміном
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="delete-button"
                      disabled={user.role == "Admin"}
                    >
                      Видалити
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="admin-section">
            <h2 className="section-title">Керування відгуками</h2>
            <div className="reviews-list">
              {reviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <span className="review-author">{review.author}</span>
                    <span className="review-date">
                      {formatDate(review.createdAt)}
                    </span>
                    <span className="review-rating">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </span>
                  </div>
                  <p className="review-text">{review.text}</p>
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="delete-button"
                  >
                    Видалити
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div className="admin-section">
            <h2 className="section-title">Керування товарами</h2>

            <div className="products-management">
              <div className="add-product-form">
                <h3>Додати новий товар</h3>
                <form onSubmit={handleAddProduct}>
                  <div className="form-group">
                    <label>Назва:</label>
                    <input
                      type="text"
                      value={newProduct.name}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Ціна:</label>
                    <input
                      type="number"
                      value={newProduct.price}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          price: parseFloat(e.target.value),
                        })
                      }
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Категорія:</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          category: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="">Оберіть категорію</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>URL зображення:</label>
                    <input
                      type="text"
                      value={newProduct.imageUrl}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          imageUrl: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <button type="submit" className="add-button">
                    Додати товар
                  </button>
                </form>
              </div>

              <div className="products-list-container">
                <h3 className="products-list-title">Список товарів</h3>
                <div className="products-list">
                  {products.map((product) => (
                    <div key={product.id} className="product-card">
                      <div className="product-info">
                        <h4>{product.name}</h4>
                        <p className="product-category">{product.category}</p>
                        <p className="product-price">{product.price} грн</p>
                      </div>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="delete-button"
                      >
                        Видалити
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
