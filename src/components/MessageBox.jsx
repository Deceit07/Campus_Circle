import React from 'react';

const MessageBox = ({ title, message, onConfirm, onCancel, confirmText = 'Confirm' }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content text-center">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-center space-x-4">
          <button onClick={onCancel} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-semibold">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-semibold">
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
export default MessageBox;
