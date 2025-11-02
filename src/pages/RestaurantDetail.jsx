// src/pages/RestaurantDetail.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function RestaurantDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const meal = location.state?.meal;

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!meal) {
    return (
      <div className="text-center py-5">
        <p className="text-danger fs-5">⚠️ Restaurant not found.</p>
        <button className="btn btn-outline-danger mt-3" onClick={() => navigate('/restaurants')}>
          ← Back to Restaurants
        </button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert("Please write a review before submitting!");
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'reviews'), {
        type: 'restaurant',
        name: meal.strMeal,
        idMeal: meal.idMeal,
        image: meal.strMealThumb,
        area: meal.strArea,
        category: meal.strCategory,
        rating: Number(rating),
        comment: comment.trim(),
        createdAt: serverTimestamp(),
      });
      alert("✅ Review submitted successfully!");
      navigate('/my-reviews');
    } catch (err) {
      console.error("Error adding review:", err);
      alert("❌ Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="row">
      <div className="col-lg-6 mb-4 mb-lg-0">
        <img
          src={meal.strMealThumb}
          className="img-fluid rounded shadow-sm"
          alt={meal.strMeal}
          style={{ maxHeight: '500px', objectFit: 'cover', width: '100%' }}
        />
      </div>
      <div className="col-lg-6">
        <h2 className="fw-bold text-dark">{meal.strMeal}</h2>
        <div className="d-flex gap-3 mb-3">
          <span className="badge bg-light text-dark border">📍 {meal.strArea}</span>
          <span className="badge bg-light text-dark border">🍽️ {meal.strCategory}</span>
        </div>

        <div className="card border-0 shadow-sm p-4 mt-4">
          <h3 className="mb-4 text-dark">Write Your Review</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-medium">Rating (1–5)</label>
              <select
                className="form-select form-select-lg"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                disabled={isSubmitting}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {'★'.repeat(num)}{'☆'.repeat(5 - num)} ({num})
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label fw-medium">Your Experience</label>
              <textarea
                className="form-control"
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this dish..."
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="d-flex gap-2">
              <button
                type="submit"
                className="btn btn-danger px-4 py-2 fw-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary px-4 py-2"
                onClick={() => navigate(-1)}
                disabled={isSubmitting}
              >
                ← Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}