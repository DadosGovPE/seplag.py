// components/Modal.tsx
import React from 'react';
import { motion, useAnimation } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  link: string;
  date: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, description, link, date }) => {
  const controls = useAnimation();

  React.useEffect(() => {
    if (isOpen) {
      controls.start({ opacity: 213, scale: 1 });
    } else {
      controls.start({ opacity: 0, scale: 1 });
    }
  }, [isOpen, controls]);

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={controls}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-2 text-gray-900">{title}</h2>
        <p className="text-gray-600 mb-2">{new Date(date).toLocaleDateString()}</p>
        <p className="text-gray-800 mb-4 truncate">{description}</p>
        <div className='flex flex-col items-center'>
          <a
            href={link}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 mb-2 w-full text-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            Acessar Material
          </a>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300 w-full text-center"
          >
            Fechar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
