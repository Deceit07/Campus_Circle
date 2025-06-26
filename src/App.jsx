import React, { useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import AddItemForm from './components/AddItemForm';
import Dashboard from './components/Dashboard';
import MessageBox from './components/MessageBox';
import RatingModal from './components/RatingModal';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuth } from './context/AuthContext';

const initialItems = [
  {
    id: 1,
    name: 'TI-84 Plus Calculator',
    category: 'Electronics',
    owner: 'alice@example.com',
    status: 'Available',
    condition: 'Like New',
    borrowedBy: null,
    returnDate: null,
    imageUrl: 'https://placehold.co/600x400/93c5fd/374151?text=Calculator',
    isDonation: false
  },
  {
    id: 2,
    name: 'Navy Blue Blazer (Size M)',
    category: 'Apparel',
    owner: 'bob@example.com',
    status: 'Borrowed',
    condition: 'Good',
    borrowedBy: 'you@example.com',
    returnDate: '2025-07-30',
    imageUrl: 'https://placehold.co/600x400/6ee7b7/374151?text=Blazer',
    isDonation: false
  },
  {
    id: 3,
    name: 'Organic Chemistry Lab Coat',
    category: 'Lab Equipment',
    owner: 'charlie@example.com',
    status: 'Available',
    condition: 'Used',
    borrowedBy: null,
    returnDate: null,
    imageUrl: 'https://placehold.co/600x400/fca5a5/374151?text=Lab+Coat',
    isDonation: false
  },
  {
    id: 4,
    name: 'Free: Intro to Algorithms Textbook',
    category: 'Textbooks',
    owner: 'alice@example.com',
    status: 'Available',
    condition: 'Good',
    borrowedBy: null,
    returnDate: null,
    imageUrl: 'https://placehold.co/600x400/c4b5fd/374151?text=Textbook',
    isDonation: true
  }
];

export default function App() {
  const [items, setItems] = useState(initialItems);
  const [page, setPage] = useState('home');
  const [modal, setModal] = useState({ type: null, item: null });
  const [notification, setNotification] = useState(null);
  const [authPage, setAuthPage] = useState(null);

  const { user, logout } = useAuth();

  const myItems = items.filter(i => i.owner === (user?.email ?? 'Guest'));
  const borrowedItems = items.filter(i => i.borrowedBy === (user?.email ?? 'Guest'));

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddItem = (newItem) => {
    const item = {
      ...newItem,
      id: Date.now(),
      status: 'Available',
      borrowedBy: null,
      returnDate: null,
      owner: user?.email ?? 'Guest'
    };
    setItems(prev => [item, ...prev]);
    showNotification('Item listed!');
    setPage('dashboard');
  };

  const handleBorrowClick = (id) => {
    const item = items.find(i => i.id === id);
    setModal({ type: 'borrow', item });
  };

  const confirmBorrow = () => {
    const { item } = modal;
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 14);
    setItems(items.map(i =>
      i.id === item.id
        ? {
            ...i,
            status: 'Borrowed',
            borrowedBy: user?.email ?? 'Guest',
            returnDate: item.isDonation ? null : returnDate.toISOString().split('T')[0]
          }
        : i
    ));
    showNotification(item.isDonation ? 'Item claimed!' : 'Item borrowed!');
    setModal({ type: null, item: null });
    setPage('dashboard');
  };

  const handleReturnClick = (id) => {
    const item = items.find(i => i.id === id);
    setModal({ type: 'return', item });
  };

  const confirmReturn = () => {
    const { item } = modal;
    if (item.isDonation) {
      finalizeReturn(item, 0);
    } else {
      setModal({ type: 'rating', item });
    }
  };

  const finalizeReturn = (item, rating) => {
    if (rating > 0) {
      console.log(`Rated ${item.borrowedBy}: ${rating} stars`);
    }
    setItems(items.map(i =>
      i.id === item.id
        ? { ...i, status: 'Available', borrowedBy: null, returnDate: null }
        : i
    ));
    showNotification('Item returned!');
    setModal({ type: null, item: null });
  };

  const handleWaitlistClick = (id) => {
    const item = items.find(i => i.id === id);
    setModal({ type: 'waitlist', item });
  };

  const confirmWaitlist = () => {
    showNotification(`Added to waitlist for "${modal.item.name}"`);
    setModal({ type: null, item: null });
  };

  const renderPage = () => {
    if (page === 'addItem') return <AddItemForm onAddItem={handleAddItem} />;
    if (page === 'dashboard') return <Dashboard myItems={myItems} borrowedItems={borrowedItems} onReturn={handleReturnClick} />;
    return <Home items={items} onBorrow={handleBorrowClick} onWaitlist={handleWaitlistClick} />;
  };

  if (authPage === 'login') return <Login onSuccess={() => { setAuthPage(null); setPage('home'); }} switchToSignup={() => setAuthPage('signup')} />;
  if (authPage === 'signup') return <Signup onSuccess={() => { setAuthPage(null); setPage('home'); }} switchToLogin={() => setAuthPage('login')} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header setPage={setPage} logout={logout} isLoggedIn={!!user} setAuthPage={setAuthPage} />
      <main className="pb-16">{renderPage()}</main>

      {notification && (
        <div className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded-md shadow-md">
          {notification}
        </div>
      )}

      {modal.type === 'borrow' && (
        <MessageBox
          title={modal.item.isDonation ? "Claim Item?" : "Borrow Item?"}
          message={modal.item.isDonation ? "This item is free to take." : "You must return this item in 14 days."}
          onConfirm={confirmBorrow}
          onCancel={() => setModal({ type: null, item: null })}
          confirmText={modal.item.isDonation ? "Claim" : "Borrow"}
        />
      )}

      {modal.type === 'waitlist' && (
        <MessageBox
          title="Join Waitlist?"
          message={`Be notified when "${modal.item.name}" is available.`}
          onConfirm={confirmWaitlist}
          onCancel={() => setModal({ type: null, item: null })}
          confirmText="Join"
        />
      )}

      {modal.type === 'return' && (
        <MessageBox
          title="Return Item?"
          message={`Are you returning "${modal.item.name}"?`}
          onConfirm={confirmReturn}
          onCancel={() => setModal({ type: null, item: null })}
          confirmText="Return"
        />
      )}

      {modal.type === 'rating' && (
        <RatingModal
          item={modal.item}
          onConfirm={(rating) => finalizeReturn(modal.item, rating)}
          onCancel={() => finalizeReturn(modal.item, 0)}
        />
      )}
    </div>
  );
}
