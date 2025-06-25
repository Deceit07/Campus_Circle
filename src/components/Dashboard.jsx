import React from 'react';
import { Star, CheckCircle, Clock } from 'lucide-react';

const Dashboard = ({ myItems, borrowedItems, onReturn }) => {
  const borrowerScore = 4.8; // Mock data
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600">Welcome back, Current User!</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Borrower Score</p>
            <div className="flex items-center text-2xl font-bold text-yellow-500">
                <Star className="h-6 w-6 mr-1 fill-current"/> {borrowerScore}
            </div>
          </div>
      </div>
      

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center"><Clock className="mr-2"/>Items I'm Borrowing</h2>
          {borrowedItems.length === 0 ? (
            <div className="text-gray-500 bg-white p-6 rounded-lg shadow-sm">You haven't borrowed any items yet.</div>
          ) : (
            <div className="space-y-4">
              {borrowedItems.map(item => (
                <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">From: {item.owner}</p>
                    <p className="text-sm text-gray-500">Return by: {item.returnDate}</p>
                  </div>
                  <button onClick={() => onReturn(item.id)} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 font-medium transition-colors flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1"/> Return
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Items I've Listed</h2>
          {myItems.length === 0 ? (
            <div className="text-gray-500 bg-white p-6 rounded-lg shadow-sm">You haven't listed any items.</div>
          ) : (
            <div className="space-y-4">
              {myItems.map(item => (
                <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center">
                    <div>
                        <p className="font-bold text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.isDonation ? "Donated Item" : `Condition: ${item.condition}`}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${item.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {item.status === 'Available' ? 'Available' : `On loan to ${item.borrowedBy}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
