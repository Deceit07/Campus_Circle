import React, { useState } from 'react';

const AddItemForm = ({ onAddItem }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [condition, setCondition] = useState('Good');
  const [isDonation, setIsDonation] = useState(false);
  const [photo, setPhoto] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter an item name.');
      return;
    }
    // In a real app, the photo would be uploaded to a service like S3/Firebase Storage
    // and you'd save the URL. Here, we'll just mock it.
    const imageUrl = photo ? URL.createObjectURL(photo) : `https://placehold.co/600x400/e2e8f0/4a5568?text=${name.replace(/\s/g,'+')}`;

    const newItem = {
      name,
      category,
      condition,
      isDonation,
      imageUrl,
      owner: 'Current User', 
    };
    onAddItem(newItem);
    // Reset form
    setName('');
    setCategory('Electronics');
    setCondition('Good');
    setIsDonation(false);
    setPhoto(null);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-2xl">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">List a New Item</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">Item Name</label>
            <input type="text" id="itemName" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="e.g., TI-84 Plus Calculator" required />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option>Electronics</option>
              <option>Apparel</option>
              <option>Lab Equipment</option>
              <option>Textbooks</option>
              <option>Other</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="condition" className="block text-sm font-medium text-gray-700">Condition</label>
            <select id="condition" value={condition} onChange={(e) => setCondition(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option>Like New</option>
              <option>Good</option>
              <option>Fair</option>
              <option>Used</option>
            </select>
          </div>

          <div>
             <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Item Photo</label>
             <input type="file" id="photo" onChange={(e) => setPhoto(e.target.files[0])} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
          </div>

          <div className="flex items-center">
            <input id="isDonation" type="checkbox" checked={isDonation} onChange={(e) => setIsDonation(e.target.checked)} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"/>
            <label htmlFor="isDonation" className="ml-2 block text-sm text-gray-900">This is a donation (free to take)</label>
          </div>

          <div>
            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Add Item to Closet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddItemForm;
