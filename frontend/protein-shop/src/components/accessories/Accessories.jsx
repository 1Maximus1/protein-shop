import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/global.css";
import "../css/sport.nutrition.css";
import "../css/sports-nutrition/theme.css";

export default function Accessories() {
  const navigate = useNavigate();

  const addToCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token || token === "null" || token === "undefined") {
      alert("Будь ласка, увійдіть в систему, щоб додати товар до кошика");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("https://localhost:7164/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (!response.ok)
        throw new Error(
          "Не вдалося додати товар до кошика. Треба зайти в свій аккаунт (login or Register)"
        );

      alert("Товар додано до кошика!");
    } catch (err) {
      setError(err.message);
    }
  };

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [categories, setCategories] = useState({
    шейкери: true,
    пляшки_для_води: true,
    пояси: true,
    бинти: true,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://localhost:7164/api/products/accessories"
        );
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setCategories((prev) => ({ ...prev, [value]: checked }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setCategories({
      шейкери: true,
      пляшки_для_води: true,
      пояси: true,
      бинти: true,
    });
    setCurrentPage(1);
  };

  const filteredProducts = products.filter((p) => {
    const min = parseFloat(minPrice) || 0;
    const max = parseFloat(maxPrice) || Infinity;
    const okPrice = p.price >= min && p.price <= max;
    const okCat = categories[p.category] || false;
    return okPrice && okCat;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div className="loading">Завантаження товарів...</div>;
  if (error) return <div className="error">Помилка: {error}</div>;

  const token = localStorage.getItem("token");
  return (
    <div className="page">
      <header className="header">
        <div className="container header__container">
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
                xmlnsXlink="http://www.w3.org/1999/xlink"
                stroke="#2c8c49"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                    stroke="#2c8c49"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </svg>
            </Link>
          </div>
        </div>
        <nav className="breadcrumbs" aria-label="Хлібні крихти">
          <div className="container">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to="/" className="breadcrumbs__link">
                  Головна
                </Link>
              </li>
              <li className="breadcrumbs__separator">›</li>
              <li className="breadcrumbs__item" aria-current="page">
                Аксесуари
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <main className="product-page">
        <div className="container product-page__container">
          <h1 className="product-page__title">Аксесуари</h1>

          <aside className="filters" aria-labelledby="filters-title">
            <h2 id="filters-title" className="filters__title">
              Фільтри
            </h2>

            <div className="filters__group">
              <h3 className="filters__subtitle">Ціновий діапазон</h3>
              <div className="filters__price-range">
                <div className="filters__price-input">
                  <label htmlFor="price-min" className="filters__label">
                    Від
                  </label>
                  <input
                    type="number"
                    id="price-min"
                    className="filters__input"
                    placeholder="0"
                    min="0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <span className="filters__currency">грн</span>
                </div>
                <div className="filters__price-input">
                  <label htmlFor="price-max" className="filters__label">
                    До
                  </label>
                  <input
                    type="number"
                    id="price-max"
                    className="filters__input"
                    placeholder="∞"
                    min="0"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                  <span className="filters__currency">грн</span>
                </div>
              </div>
            </div>

            <div className="filters__group">
              <h3 className="filters__subtitle">Категорії</h3>
              <div className="filters__categories">
                {Object.keys(categories).map((cat) => (
                  <label key={cat} className="filters__checkbox">
                    <input
                      type="checkbox"
                      name="category"
                      value={cat}
                      checked={categories[cat]}
                      onChange={handleCategoryChange}
                    />
                    <span className="filters__checkbox-custom"></span>
                    <span className="filters__checkbox-label">
                      {cat
                        .split("_")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button className="filters__reset" onClick={resetFilters}>
              Скинути фільтри
            </button>
          </aside>

          <section className="products" aria-label="Список товарів">
            {currentProducts.length > 0 ? (
              <>
                <div className="products__grid">
                  {currentProducts.map((p) => (
                    <article key={p.id} className="product">
                      <div className="product__img-container">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="product__img"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://via.placeholder.com/150?text=No+Image";
                          }}
                        />
                      </div>
                      <div className="product__content">
                        <h3 className="product__title">{p.name}</h3>
                        <p className="product__price">{p.price} грн</p>
                        <button
                          className="product__button"
                          onClick={() => addToCart(p.id)}
                        >
                          Купити
                        </button>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="pagination">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="pagination__button"
                  >
                    Назад
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`pagination__button ${
                          currentPage === number
                            ? "pagination__button--active"
                            : ""
                        }`}
                      >
                        {number}
                      </button>
                    )
                  )}

                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="pagination__button"
                  >
                    Вперед
                  </button>
                </div>
              </>
            ) : (
              <div className="products__empty">
                Товарів за обраними фільтрами не знайдено
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="container footer__container">
          <p className="footer__text">© 2025 Muscle.ua. Всі права захищені.</p>
        </div>
      </footer>
    </div>
  );
}
