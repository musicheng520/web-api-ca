# Assignment 2 - Web API.

Name: Sicheng Mu
Student Number:20109735
Youtube URL:https://youtu.be/kSJpUQEQEhA


This project is a full-stack Movies web application built with a **React front-end** and a **Node.js / Express back-end**.  
It integrates with the **TMDB API** and includes **user authentication**, **protected routes**, and **user-specific data storage** using **MongoDB**.

---

## Features Overview

### 1. Movies API Integration
- The backend acts as a wrapper around the TMDB API.
- All movie-related data is fetched through the custom Web API instead of directly from TMDB.
- Supported endpoints include:
  - `/api/movies/discover`
  - `/api/movies/popular`
  - `/api/movies/top_rated`
  - `/api/movies/now_playing`
  - `/api/movies/upcoming`
  - `/api/movies/:id`
  - `/api/movies/genres`

The React frontend communicates with these endpoints using `fetch` and React Query.

---

### 2. Users and Authentication
- Users can **sign up** and **log in** via dedicated pages.
- Authentication is handled using **JWT (JSON Web Tokens)**.
- After login:
  - The token is stored in `localStorage`
  - An `AuthContext` manages authentication state
- Protected routes require a valid token.
- The site header updates depending on login status.
- Password validation is implemented on the backend.
- Authentication errors are returned and displayed on the frontend.

---

### 3. Another API – Favourites & Watchlist
A separate API was created to manage **user-specific movie data**.

#### Favourites API
- MongoDB collection stores favourites per user.
- Endpoints:
  - `GET /api/favourites` – fetch current user's favourites
  - `POST /api/favourites` – add a movie to favourites
  - `DELETE /api/favourites/:id` – remove a favourite
- All routes are protected using JWT authentication.
- Each favourite is linked to the logged-in user.
- Two different users see different favourite lists.

#### Watchlist API
- Similar structure to favourites.
- Each user has their own watchlist.
- Endpoints:
  - `GET /api/watchlist`
  - `POST /api/watchlist`
  - `DELETE /api/watchlist/:id`

---

## Frontend Integration
- React Query is used for data fetching and cache management.
- Query keys are scoped per user to avoid data leakage.

---

## How to Run the Project

### Backend
```bash
cd movies-api
npm install
npm run dev
 
### Frontend
cd react-movies
npm install
npm start

---

## Summary

This project is a full-stack Movies web application that integrates a React frontend with a custom Node.js and Express Web API.

All movie-related data is accessed through the backend API, which wraps the TMDB API and exposes multiple endpoints such as discover, popular, top rated, upcoming, and movie details.

User authentication is implemented using JWT. The application includes signup and login pages, an authentication context on the frontend, and protected routes on the backend. The site header updates based on the user’s login state, and authentication errors are handled and displayed correctly.

A separate MongoDB-backed API was created to manage user-specific content. Each user has their own favourites and watchlist, which are stored in the database and protected by authentication middleware. Different users see different data when logged in, demonstrating correct user isolation.

The frontend fully integrates with the backend APIs using React Query, providing dynamic updates and clear UI feedback when users add or remove movies from favourites or watchlists.

Overall, the application demonstrates full frontend–backend integration, secure authentication, multiple API implementations, and correct handling of user-specific data.
