// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center">
          <div className="mb-4">
            <span className="badge bg-danger">TastyFood</span>
          </div>
          <h1 className="display-5 fw-bold text-dark mb-3">
            Makoetlane's Taste Discover
          </h1>
          <p className="lead text-muted mb-5">
            Explore top restaurants, savor delicious dishes, and share your honest dining experiences.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link
              to="/restaurants"
              className="btn btn-danger btn-lg px-4 py-2 fw-semibold shadow-sm"
            >
              🍽️ Browse Restaurants
            </Link>
            <Link
              to="/my-reviews"
              className="btn btn-outline-danger btn-lg px-4 py-2 fw-semibold shadow-sm"
            >
              ✍️ My Reviews
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center mt-5 pt-4 border-top">
        <p className="text-muted small">
          Powered by TheMealDB •
        </p>
      </div>
    </div>
  );
}