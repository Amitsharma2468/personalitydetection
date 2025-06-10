import React from 'react';
import { Brain } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
        <div className="relative mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full animate-pulse">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-purple-200 rounded-full animate-spin border-t-purple-500 mx-auto"></div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Analyzing Your Personality
        </h2>
        
        <p className="text-gray-600 mb-6">
          Our AI is processing your responses to determine your personality type...
        </p>
        
        <div className="flex justify-center space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};