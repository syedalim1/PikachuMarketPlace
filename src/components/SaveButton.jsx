import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const SaveButton = ({ itemId, type, onSave }) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem(`saved_${type}`)) || [];
    setIsSaved(savedItems.includes(itemId));
  }, [itemId, type]);

  const handleSave = () => {
    const savedItems = JSON.parse(localStorage.getItem(`saved_${type}`)) || [];
    let updatedItems;

    if (isSaved) {
      updatedItems = savedItems.filter(id => id !== itemId);
    } else {
      updatedItems = [...savedItems, itemId];
    }

    localStorage.setItem(`saved_${type}`, JSON.stringify(updatedItems));
    setIsSaved(!isSaved);

    if (onSave) {
      onSave(!isSaved);
    }

    // Show notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-out';
    notification.textContent = isSaved ? 'Removed from favorites' : 'Added to favorites';
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 2000);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleSave}
      className={`p-2 rounded-full transition-colors ${
        isSaved 
          ? 'text-red-500 hover:text-red-600' 
          : 'text-gray-400 hover:text-red-500'
      }`}
    >
      {isSaved ? <FaHeart className="w-6 h-6" /> : <FaRegHeart className="w-6 h-6" />}
    </motion.button>
  );
};

export default SaveButton;
