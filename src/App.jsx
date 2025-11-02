// src/App.jsx
import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Restaurants from './pages/Restaurants';
import MyReviews from './pages/MyReviews';
import AddReview from './pages/AddReview';
import RestaurantDetail from './pages/RestaurantDetail';

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith('/restaurants/') && !location.pathname.endsWith('/restaurants');

  return (
    <div className="min-vh-100 d-flex flex-column">
      {!hideNavbar && (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#e53935' }}>
          <div className="container">
            <Link className="navbar-brand fw-bold text-white d-flex align-items-center" to="/">
              <span className="me-2">🍴</span>
              <span className="fs-4">TastyFood</span>
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    className="nav-link text-white px-3 py-2 rounded"
                    to="/"
                    style={{
                      fontWeight: location.pathname === '/' ? '600' : 'normal',
                      backgroundColor: location.pathname === '/' ? 'rgba(0,0,0,0.1)' : 'transparent'
                    }}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white px-3 py-2 rounded"
                    to="/restaurants"
                    style={{
                      fontWeight: location.pathname === '/restaurants' ? '600' : 'normal',
                      backgroundColor: location.pathname === '/restaurants' ? 'rgba(0,0,0,0.1)' : 'transparent'
                    }}
                  >
                    Restaurants
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white px-3 py-2 rounded"
                    to="/my-reviews"
                    style={{
                      fontWeight: location.pathname === '/my-reviews' ? '600' : 'normal',
                      backgroundColor: location.pathname === '/my-reviews' ? 'rgba(0,0,0,0.1)' : 'transparent'
                    }}
                  >
                    My Reviews
                  </Link>
                </li>
                <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                  <Link
                    className="nav-link btn btn-outline-light btn-sm px-3 py-1"
                    to="/add-review"
                    style={{ borderColor: 'white', color: 'white' }}
                  >
                    ✍️ Add Review
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}

      <main className="flex-grow-1">
        <div className="container py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/restaurants/:id" element={<RestaurantDetail />} />
            <Route path="/my-reviews" element={<MyReviews />} />
            <Route path="/add-review" element={<AddReview />} />
          </Routes>
        </div>
      </main>

      {!hideNavbar && (
        <footer className="bg-light py-3 mt-auto text-center text-muted small">
          <div className="container">
            © {new Date().getFullYear()} TastyFood • Restaurant Review Platform
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;