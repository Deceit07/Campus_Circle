import React from 'react';
import ItemCard from './ItemCard'

const Home = ({ items, onBorrow, onWaitlist }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Available Essentials</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {items.map(item => (
          <ItemCard key={item.id} item={item} onBorrow={onBorrow} onWaitlist={onWaitlist} />
        ))}
      </div>
    </div>
  );
};
export default Home;
