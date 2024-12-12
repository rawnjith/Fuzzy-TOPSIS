import React from 'react';
import { DonateButton } from './DonateButton';

export const Header = () => (
  <div className="text-center mb-8">
    <div className="flex items-center justify-center mb-4">
      <img 
        src="/developer.jpg" 
        alt="Ranjith Raj A"
        className="w-12 h-12 rounded-full mr-3 object-cover border-2 border-blue-500"
      />
      <div>
        <h1 className="text-2xl font-bold">
          Fuzzy TOPSIS Decision Support System
        </h1>
        <p className="text-gray-600">Developed by Ranjith Raj A</p>
      </div>
    </div>
    
    <div className="flex items-center justify-center gap-4 mb-4">
      <a 
        href="mailto:rawnjith@gmail.com"
        className="text-blue-600 hover:text-blue-800 transition-colors"
      >
        rawnjith@gmail.com
      </a>
      
      <DonateButton 
        upiId="rawnjith@okhdfcbank"
        amount={100}
        name="Ranjith Raj A"
      />
    </div>
  </div>
);