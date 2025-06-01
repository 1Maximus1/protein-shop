# Protein-Shop

## Фронтенд (React)

Це фронтенд-частина проєкту **protein-shop** на React.

### Передумови

- Node.js (рекомендується версія 18 або новіша)
- npm (або yarn/pnpm)

### Встановлення та запуск

1. **Клонувати репозиторій та перейти до ключової папки:**
    ```bash
    git clone https://github.com/1Maximus1/protein-shop.git
    cd frontend
    cd protein-shop
    ```

2. **Встановити залежності:**
    ```bash
    npm install
    # або
    yarn install
    ```

3. **Запустити додаток:**
    ```bash
    npm start
    # або
    npm run dev
    # або
    yarn start
    ```

---

## Бекенд (ASP.NET Core + Docker)

Це бекенд-частина проєкту **protein-shop** на .NET 8 (ASP.NET Core).

### Передумови

- Встановлений **Docker** (Docker Desktop)

### Запуск через Docker Compose

1. **Клонувати репозиторій та перейти до ключової папки:**
    ```bash
    git clone https://github.com/1Maximus1/protein-shop.git
    cd backend
    cd protein-shop
    ```

2. **Запусти бекенд через Docker Compose:**
    ```bash
    docker compose up --build
    ```

3. **Після підняття контейнерів:**
    - API буде доступний на `https://localhost:7164`  
      (або згідно з портом у `docker-compose.yml`)


**Готово! Можна тестувати protein-shop.** 🚀

!!!Також є автогенерація адміна, його cridentials:
```bash
Name = "Oleg Olegenko"
Role = "Admin"
Email = "mamaluga@gmail.com"
PasswordHash = "Password"
```

