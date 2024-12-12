import React from 'react';
import { Coffee, IndianRupee } from 'lucide-react';

type Props = {
  upiId: string;
  amount: number;
  name: string;
};

export const DonateButton: React.FC<Props> = ({ upiId, amount, name }) => (
  <button
    onClick={() => {
      window.open(`upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=Coffee and Samosa`);
    }}
    className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
  >
    <Coffee className="w-4 h-4" />
    <IndianRupee className="w-4 h-4" />
    <span>{amount}</span>
  </button>
);