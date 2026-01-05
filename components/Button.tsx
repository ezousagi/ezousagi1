import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 border text-base font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]";
  
  const variants = {
    primary: "border-transparent text-white bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 shadow-md focus:ring-pink-500",
    secondary: "border-transparent text-pink-700 bg-pink-100 hover:bg-pink-200 focus:ring-pink-300",
    outline: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-gray-300 shadow-sm"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};