import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCompressAlt, FaTimes } from 'react-icons/fa';

const CompareFeature = ({ type, item, onClose }) => {
  const [compareItems, setCompareItems] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem(`compare_${type}`)) || [];
    setCompareItems(savedItems);
  }, [type]);

  const addToCompare = () => {
    const updatedItems = [...compareItems, item].slice(0, 3); // Limit to 3 items
    setCompareItems(updatedItems);
    localStorage.setItem(`compare_${type}`, JSON.stringify(updatedItems));
  };

  const removeFromCompare = (itemId) => {
    const updatedItems = compareItems.filter(item => item.id !== itemId);
    setCompareItems(updatedItems);
    localStorage.setItem(`compare_${type}`, JSON.stringify(updatedItems));
  };

  const isItemInCompare = compareItems.some(compareItem => compareItem.id === item.id);

  const compareProperties = {
    car: ['brand', 'model', 'year', 'price', 'mileage', 'fuelType'],
    mobile: ['brand', 'model', 'storage', 'ram', 'price', 'screenSize'],
    bike: ['brand', 'model', 'year', 'price', 'engineSize', 'mileage'],
    job: ['title', 'company', 'salary', 'location', 'type', 'experience']
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowComparison(!showComparison)}
        className="bg-primary text-white p-3 rounded-full shadow-lg"
      >
        <FaCompressAlt />
      </motion.button>

      {showComparison && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Compare {type.charAt(0).toUpperCase() + type.slice(1)}s</h2>
              <button
                onClick={() => setShowComparison(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Item slots */}
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 flex flex-col"
                >
                  {compareItems[index] ? (
                    <>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">{compareItems[index].title || compareItems[index].brand}</h3>
                        <button
                          onClick={() => removeFromCompare(compareItems[index].id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTimes />
                        </button>
                      </div>
                      {compareProperties[type].map(prop => (
                        <div key={prop} className="mb-2">
                          <span className="text-gray-600 text-sm">{prop}: </span>
                          <span className="font-medium">{compareItems[index][prop]}</span>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400">
                      {index === 0 && !isItemInCompare ? (
                        <button
                          onClick={addToCompare}
                          className="text-primary hover:text-primary-dark"
                        >
                          Add Current Item
                        </button>
                      ) : (
                        "Empty Slot"
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CompareFeature;
