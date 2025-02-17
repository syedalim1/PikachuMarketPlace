import { motion } from 'framer-motion';

function LoadingSpinner() {
  return (
    <motion.div
      className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
}

export default LoadingSpinner; 