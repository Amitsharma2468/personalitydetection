import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorDisplayProps {
  error: string;
  onRetry: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onRetry }) => {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Oops! Something went wrong
        </h2>
        
        <p className="text-gray-600 mb-6">
          {error}
        </p>
        
        <div className="space-y-3">
          <button
            onClick={onRetry}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Try Again</span>
          </button>
          
          <div className="text-sm text-gray-500">
            <p>Make sure your backend server is running on port 5000</p>
          </div>
        </div>
      </div>
    </div>
  );
};