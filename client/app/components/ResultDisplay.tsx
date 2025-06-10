import React from 'react';
import { PersonalityPrediction } from '../types/personality';
import { Brain, Target, TrendingUp, RotateCcw } from 'lucide-react';

interface ResultsDisplayProps {
  prediction: PersonalityPrediction;
  onReset: () => void;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ prediction, onReset }) => {
  const getPersonalityColor = (personality: string) => {
    switch (personality) {
      case 'Extrovert':
        return 'from-red-500 to-orange-500';
      case 'Introvert':
        return 'from-blue-500 to-purple-500';
      case 'Ambivert':
        return 'from-green-500 to-teal-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getPersonalityDescription = (personality: string) => {
    switch (personality) {
      case 'Extrovert':
        return 'You gain energy from social interactions and tend to be outgoing, talkative, and comfortable in group settings.';
      case 'Introvert':
        return 'You gain energy from solitude and tend to be reflective, prefer smaller groups, and think before speaking.';
      case 'Ambivert':
        return 'You have a balanced personality, showing both extroverted and introverted traits depending on the situation.';
      default:
        return 'Your personality analysis is complete.';
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Main Result Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center transform transition-all duration-500 hover:shadow-2xl">
        <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${getPersonalityColor(prediction.personality)} rounded-full mb-6`}>
          <Brain className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          {prediction.personality}
        </h1>
        
        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
          {getPersonalityDescription(prediction.personality)}
        </p>

        {/* Confidence Score */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Target className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-medium text-gray-600">Confidence Score</span>
          </div>
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {prediction.confidence}%
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${prediction.confidence}%` }}
            ></div>
          </div>
        </div>

        {/* Model Accuracy */}
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <TrendingUp className="w-4 h-4" />
          <span>Model Accuracy: {prediction.model_accuracy}%</span>
        </div>
      </div>

      {/* Traits Card */}
      {prediction.traits.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Your Personality Traits
          </h2>
          <div className="grid gap-3">
            {prediction.traits.map((trait, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border-l-4 border-purple-500 transform transition-all duration-300 hover:scale-105"
              >
                <span className="text-gray-700 font-medium">{trait}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="text-center space-y-4">
        <button
          onClick={onReset}
          className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Take Test Again</span>
        </button>
        
        <div className="text-sm text-gray-500">
          <p>Want to share your results? Take a screenshot!</p>
        </div>
      </div>
    </div>
  );
};