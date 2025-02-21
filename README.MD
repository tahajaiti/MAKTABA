# Mektaba

## Introduction

Mektaba is a single-page application (SPA) built with **React** and **TypeScript** on the frontend, using **Zustand** for state management. The backend is a **Laravel** API, designed with efficiency and maintainability in mind. This document explains the functionality of the application and the technical choices made during development.

## Features

### Frontend

- **State Management:** Implemented with **Zustand**, chosen for its simplicity compared to Redux and its efficiency in managing global state.
- **Pagination & Conditional Rendering:** Books and borrow buttons dynamically render based on user roles and conditions.
- **Admin Features:** Admins can **add, remove, and edit** books.
- **User Profile Page:**
  - Displays the user's **borrowed books**.
  - Allows users to **return books**.
  - Shows **user information**.
- **Routing & Performance:** Built as an SPA using **Vite** for faster builds and optimized performance.

### Backend

- **Laravel API:**
  - Designed without major packages, except for **CORS** to allow frontend-backend communication.
  - **Role-based Access Control (RBAC):** Implemented a `roles` table to manage user permissions effectively.
  - **Seeders:** Used seeders to speed up development and populate the database.
  - **Resources & API Responses:**
    - Created a **User Resource** to structure API responses properly.
    - Used Laravel's **resource controllers** for clean and maintainable code.
  - **API Documentation:**
    - Integrated **Swagger** to generate documentation automatically.
    - Available at `/api/documentation` endpoint.
  - **Route & Resource Management:**
    - Defined clear routes for authentication, borrowing system, and admin functionalities.

## Technical Choices

### Frontend

- **React + TypeScript:** Type safety ensures fewer runtime errors.
- **Zustand over Redux:** Simple API, minimal boilerplate, and easy integration.
- **Vite:** Faster development server and optimized build process.

### Backend

- **Laravel Framework:** Chosen for its robust features, ease of database management, and built-in security.
- **Seeders & Factories:** Helped streamline data generation during development.
- **Swagger for Documentation:** Provides clear API reference for developers.

## Installation & Setup

### Backend (Laravel API)

1. Clone the repository and navigate to the backend directory:

```sh
   git clone https://github.com/tahajaiti/MAKTABA.git
   cd backend
```

2. Install dependencies:

```sh
   composer install
```

3. Set up environment variables:

```sh
   cp .env.example .env
   php artisan key:generate
```

4. Run migrations and seed the database:

```sh
   php artisan migrate --seed
```

5. Start the Laravel server:

```sh
   php artisan serve
```

### Frontend (React + Vite)

1. Navigate to the frontend directory:

```sh
   cd frontend
```

2. nstall dependencies:

```sh
   npm install
```

3. Start the development server:

```sh
   npm run dev
```

## API Documentation

- Available at: **`/api/documentation`**
- Generated using **Swagger**, providing clear API endpoints and request/response formats.

## Conclusion

Mektaba is a streamlined library management system with **role-based functionalities, efficient state management, and a well-structured API**. Built with **React, TypeScript, Zustand, and Laravel**, it ensures a smooth user experience and maintainable architecture.
