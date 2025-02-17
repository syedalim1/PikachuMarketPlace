import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShare, FaFacebook, FaTwitter, FaWhatsapp, FaLink } from 'react-icons/fa';

const ShareButton = ({ title, description, url }) => {
  const [showShare, setShowShare] = useState(false);

  const shareData = {
    title,
    text: description,
    url: url || window.location.href
  };

  const handleShare = async (platform) => {
    try {
      switch (platform) {
        case 'native':
          if (navigator.share) {
            await navigator.share(shareData);
          }
          break;
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`);
          break;
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.title)}&url=${encodeURIComponent(shareData.url)}`);
          break;
        case 'whatsapp':
          window.open(`https://wa.me/?text=${encodeURIComponent(`${shareData.title} ${shareData.url}`)}`);
          break;
        case 'copy':
          await navigator.clipboard.writeText(shareData.url);
          alert('Link copied to clipboard!');
          break;
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowShare(!showShare)}
        className="bg-primary text-white p-2 rounded-full hover:bg-primary-dark transition-colors"
      >
        <FaShare />
      </motion.button>

      {showShare && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute right-0 mt-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex gap-2"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleShare('facebook')}
            className="text-blue-600 p-2 hover:bg-blue-50 rounded-full"
          >
            <FaFacebook />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleShare('twitter')}
            className="text-blue-400 p-2 hover:bg-blue-50 rounded-full"
          >
            <FaTwitter />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleShare('whatsapp')}
            className="text-green-500 p-2 hover:bg-green-50 rounded-full"
          >
            <FaWhatsapp />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleShare('copy')}
            className="text-gray-600 p-2 hover:bg-gray-50 rounded-full"
          >
            <FaLink />
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default ShareButton;
