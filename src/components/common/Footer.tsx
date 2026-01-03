import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="container mx-auto px-6 text-center flex flex-col items-center">
        <div className="mb-8 w-64 md:w-96">
          <img 
            src="/images/logo.png" 
            alt="Royal Flight Support Logo" 
            className="w-full h-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
        </div>
        <p className="text-gray-400 text-sm mb-8">Excellence in Aviation Services</p>
        <div className="flex justify-center space-x-6 text-xs text-gray-500 uppercase tracking-wider">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
        <p className="text-gray-600 text-xs mt-8">&copy; {new Date().getFullYear()} Royal Flight Support. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;