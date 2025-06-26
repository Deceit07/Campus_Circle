import React, { useState } from 'react';
import { Star } from 'lucide-react';

const RatingModal = ({ item, onConfirm, onCancel }) => {
  const [rating, setRating] = useState(0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-2">Return Successful!</h2>
        <p className="text-gray-600 mb-4">
          Please rate the borrower, <span className="font-semibold">{item.borrowedBy || 'Guest'}</span>, for their handling of your item.
        </p>

        <div className="flex justify-center items-center space-x-2 my-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-10 w-10 cursor-pointer transition-all duration-150 ${
                rating >= star ? 'text-yellow-400 fill-current' : 'text-gray-300 hover:text-yellow-200'
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={() => onConfirm(0)}
            className="px-4 py-2 text-gray-600 rounded-md hover:bg-gray-100"
          >
            Skip
          </button>
          <button
            onClick={() => onConfirm(rating)}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-semibold disabled:bg-gray-400"
            disabled={rating === 0}
          >
            Submit Rating
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
