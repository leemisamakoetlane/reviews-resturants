// src/pages/Restaurants.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Restaurants() {
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState('chicken');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(search)}`);
        const data = await res.json();
        setMeals(data.meals || []);
      } catch (err) {
        console.error("Failed to fetch meals", err);
        setMeals([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce: only fetch after user stops typing for 300ms
    const timer = setTimeout(fetchRestaurants, 300);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-dark">Restaurants & Dishes</h2>
        <span className="badge bg-danger">Powered by TheMealDB</span>
      </div>

      <input
        type="text"
        className="form-control mb-4 shadow-sm"
        placeholder="Search dishes or cuisines (e.g., pasta, beef)..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search meals"
      />

      {loading ? (
        <div className="text-center py-4">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Fetching delicious options...</p>
        </div>
      ) : (
        <div className="row g-4">
          {meals.length === 0 ? (
            <div className="col-12 text-center py-5">
              <p className="lead text-muted">No dishes found. Try another search!</p>
              <button
                className="btn btn-outline-danger mt-2"
                onClick={() => setSearch('')}
              >
                Clear Search
              </button>
            </div>
          ) : (
            meals.map((meal) => (
              <div key={meal.idMeal} className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm hover-shadow">
                  <img
                    src={meal.strMealThumb}
                    className="card-img-top"
                    alt={meal.strMeal}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">{meal.strMeal}</h5>
                    <p className="card-text text-muted small">
                      <span className="badge bg-light text-dark border">{meal.strArea}</span> Cuisine
                    </p>
                    <Link
                      to={`/restaurants/${meal.idMeal}`}
                      state={{ meal }}
                      className="btn btn-danger mt-auto fw-semibold"
                    >
                      View & Review
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <style jsx>{`
        .hover-shadow:hover {
          box-shadow: 0 0.5rem 1rem rgba(229, 57, 53, 0.2) !important;
          transform: translateY(-2px);
          transition: all 0.2s ease;
        }
      `}</style>
    </div>
  );
}