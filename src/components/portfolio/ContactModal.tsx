import React from 'react';
import { X } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, isDarkMode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className={`relative w-full max-w-md p-6 rounded-lg ${
        isDarkMode ? 'bg-dark-card border border-dark-border' : 'bg-light-card border border-light-border'
      }`}>
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-1 rounded-lg transition-colors ${
            isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-200'
          }`}
        >
          <X size={20} />
        </button>

        <h2 className={`text-2xl font-heading font-semibold mb-4 ${
          isDarkMode ? 'text-dark-text' : 'text-light-text'
        }`}>
          Get in Touch
        </h2>

        <p className={`text-sm mb-6 ${
          isDarkMode ? 'text-slate-400' : 'text-slate-700'
        }`}>
          Feel free to reach out via email or connect with me on social media.
        </p>

        <div className="space-y-4">
          <a
            href="mailto:contact@seaumsiddiqui.com"
            className={`block w-full px-4 py-3 text-center rounded-lg font-medium transition-colors ${
              isDarkMode
                ? 'bg-primary-600 hover:bg-primary-700 text-white'
                : 'bg-primary-600 hover:bg-primary-700 text-white'
            }`}
          >
            Send Email
          </a>
        </div>
      </div>
    </div>
  );
};
