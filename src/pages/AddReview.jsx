// src/pages/AddReview.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function AddReview() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 text-center">
          <div className="mb-4">
            <span className="badge bg-danger">TastyFood</span>
          </div>
          <h2 className="fw-bold text-dark mb-3">Add a Restaurant Review</h2>
          <p className="lead text-muted mb-4">
            Discover amazing dishes first, then share your honest dining experience with the community.
          </p>
          <Link
            to="/restaurants"
            className="btn btn-danger btn-lg px-4 py-2 fw-semibold shadow-sm"
          >
            🍽️ Browse Restaurants
          </Link>
          <div className="mt-4">
            <p className="text-muted small">
              Reviews can only be added from restaurant detail pages.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}