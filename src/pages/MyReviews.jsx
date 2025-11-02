// src/pages/MyReviews.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function MyReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'reviews'), (snapshot) => {
      const reviewsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReviews(reviewsList);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("⚠️ Are you sure you want to delete this review? This action cannot be undone.")) {
      try {
        await deleteDoc(doc(db, 'reviews', id));
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete review.");
      }
    }
  };

  const handleUpdate = async (id, currentComment) => {
    const newComment = prompt("✏️ Edit your review:", currentComment);
    if (newComment !== null && newComment.trim() !== "") {
      try {
        await updateDoc(doc(db, 'reviews', id), {
          comment: newComment.trim(),
          updatedAt: new Date()
        });
      } catch (err) {
        console.error("Update failed:", err);
        alert("Failed to update review.");
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Fetching your reviews...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-dark">My Restaurant Reviews</h2>
        <span className="badge bg-danger">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</span>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-5 bg-light rounded-3">
          <p className="lead text-muted mb-3">You haven't reviewed any restaurants yet.</p>
          <Link to="/restaurants" className="btn btn-danger px-4 py-2 fw-semibold">
            🍽️ Browse Restaurants
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {reviews.map(review => (
            <div key={review.id} className="col-md-6">
              <div className="card h-100 border-0 shadow-sm hover-card">
                <img
                  src={review.image}
                  className="card-img-top"
                  alt={review.name}
                  style={{ height: '180px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{review.name}</h5>
                  <p className="text-muted small mb-2">
                    <span className="badge bg-light text-dark border me-1">{review.area}</span>
                    {review.category}
                  </p>
                  <p className="text-warning mb-2">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)} ({review.rating}/5)
                  </p>
                  <p className="flex-grow-1">{review.comment}</p>
                  <div className="mt-auto d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-warning flex-grow-1"
                      onClick={() => handleUpdate(review.id, review.comment)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger flex-grow-1"
                      onClick={() => handleDelete(review.id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .hover-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 0.5rem 1rem rgba(229, 57, 53, 0.25) !important;
          transition: all 0.25s ease;
        }
      `}</style>
    </div>
  );
}