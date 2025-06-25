import React from 'react';
import { User, Tag, Clock } from 'lucide-react';

const ItemCard = ({ item, onBorrow, onWaitlist }) => {
  const { id, name, category, owner, status, condition, imageUrl, isDonation } = item;

  const getStatusBadge = () => {
    if (isDonation) {
        return <span className="bg-purple-100 text-purple-800 px-3 py-1 text-xs font-semibold rounded-full">Donation</span>;
    }
    switch (status) {
        case 'Available':
            return <span className="bg-green-100 text-green-800 px-3 py-1 text-xs font-semibold rounded-full">Available</span>;
        case 'Borrowed':
            return <span className="bg-red-100 text-red-800 px-3 py-1 text-xs font-semibold rounded-full">Borrowed</span>;
        default:
            return null;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col">
      <img 
        src={imageUrl} 
        alt={name} 
        className="w-full h-48 object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/600x400/e2e8f0/4a5568?text=No+Image`; }}
      />
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-gray-800 flex-1 pr-2">{name}</h3>
            {getStatusBadge()}
        </div>
        <p className="text-sm text-indigo-500 font-medium mt-1">{category}</p>
        
        <div className="mt-4 space-y-2 text-gray-600 text-sm flex-grow">
            <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-gray-400" />
                <span>Lender: <span className="font-medium">{owner}</span></span>
            </div>
            <div className="flex items-center">
                <Tag className="h-4 w-4 mr-2 text-gray-400" />
                <span>Condition: <span className="font-medium">{condition}</span></span>
            </div>
        </div>

        <div className="mt-6">
            {status === 'Available' && (
                <button
                  onClick={() => onBorrow(id)}
                  className={`w-full py-2 px-4 rounded-md font-semibold text-white transition-colors duration-300 ${
                    isDonation ? 'bg-purple-600 hover:bg-purple-700' : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  {isDonation ? 'Claim Item' : 'Borrow Item'}
                </button>
            )}
             {status === 'Borrowed' && !isDonation && (
                <button
                  onClick={() => onWaitlist(id)}
                  className="w-full py-2 px-4 rounded-md font-semibold text-white transition-colors duration-300 bg-yellow-500 hover:bg-yellow-600"
                >
                  <div className="flex items-center justify-center">
                    <Clock className="h-4 w-4 mr-2"/>
                    Join Waitlist
                  </div>
                </button>
            )}
        </div>
      </div>
    </div>
  );
};
export default ItemCard;
