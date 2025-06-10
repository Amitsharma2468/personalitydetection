"use client";

import React, { useState } from 'react';
import { PersonalityFormData } from '../types/personality';
import { Brain, Users, Camera, Home, Battery, MessageCircle, Clock } from 'lucide-react';

interface PersonalityFormProps {
  onSubmit: (data: PersonalityFormData) => void;
  loading: boolean;
}

export const PersonalityForm: React.FC<PersonalityFormProps> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState<PersonalityFormData>({
    timeSpentAlone: 4,
    stageFear: 'Yes',
    socialEventAttendance: 2,
    goingOutside: 5,
    drainedAfterSocializing: 'Yes',
    friendsCircleSize: 8,
    postFrequency: 3,
  });

  const [currentStep, setCurrentStep] = useState(0);

  const questions = [
    {
      key: 'timeSpentAlone' as keyof PersonalityFormData,
      title: 'Time Spent Alone',
      subtitle: 'Hours per day you prefer to spend alone',
      icon: Clock,
      type: 'range',
      min: 0,
      max: 12,
      step: 1,
      unit: 'hours',
    },
    {
      key: 'stageFear' as keyof PersonalityFormData,
      title: 'Stage Fear',
      subtitle: 'Do you experience fear when speaking in public?',
      icon: Brain,
      type: 'choice',
      options: ['Yes', 'No'],
    },
    {
      key: 'socialEventAttendance' as keyof PersonalityFormData,
      title: 'Social Event Attendance',
      subtitle: 'How many social events do you attend per week?',
      icon: Users,
      type: 'range',
      min: 0,
      max: 7,
      step: 1,
      unit: 'events',
    },
    {
      key: 'goingOutside' as keyof PersonalityFormData,
      title: 'Going Outside',
      subtitle: 'How often do you go outside per week? (1-10 scale)',
      icon: Home,
      type: 'range',
      min: 1,
      max: 10,
      step: 1,
      unit: 'frequency',
    },
    {
      key: 'drainedAfterSocializing' as keyof PersonalityFormData,
      title: 'Energy After Socializing',
      subtitle: 'Do you feel drained after social interactions?',
      icon: Battery,
      type: 'choice',
      options: ['Yes', 'No'],
    },
    {
      key: 'friendsCircleSize' as keyof PersonalityFormData,
      title: 'Friends Circle Size',
      subtitle: 'How many close friends do you have?',
      icon: Users,
      type: 'range',
      min: 0,
      max: 30,
      step: 1,
      unit: 'friends',
    },
    {
      key: 'postFrequency' as keyof PersonalityFormData,
      title: 'Social Media Activity',
      subtitle: 'How many posts do you make per week?',
      icon: MessageCircle,
      type: 'range',
      min: 0,
      max: 14,
      step: 1,
      unit: 'posts',
    },
  ];

  const currentQuestion = questions[currentStep];

  const handleInputChange = (key: keyof PersonalityFormData, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(formData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const Icon = currentQuestion.icon;

  return (
    <div className="max-w-md mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentStep + 1} of {questions.length}</span>
          <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mb-4">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentQuestion.title}</h2>
          <p className="text-gray-600">{currentQuestion.subtitle}</p>
        </div>

        {/* Input Section */}
        <div className="mb-8">
          {currentQuestion.type === 'range' && (
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-3xl font-bold text-purple-600">
                  {formData[currentQuestion.key]}
                </span>
                <span className="text-gray-500 ml-2">{currentQuestion.unit}</span>
              </div>
              <input
                type="range"
                min={currentQuestion.min}
                max={currentQuestion.max}
                step={currentQuestion.step}
                value={formData[currentQuestion.key] as number}
                onChange={(e) => handleInputChange(currentQuestion.key, parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{currentQuestion.min}</span>
                <span>{currentQuestion.max}</span>
              </div>
            </div>
          )}

          {currentQuestion.type === 'choice' && (
            <div className="space-y-3">
              {currentQuestion.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => handleInputChange(currentQuestion.key, option)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                    formData[currentQuestion.key] === option
                      ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-lg'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      formData[currentQuestion.key] === option
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-gray-300'
                    }`}>
                      {formData[currentQuestion.key] === option && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                      )}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between space-x-4">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="px-6 py-3 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={loading}
            className="px-6 py-3 rounded-xl font-medium transition-all duration-200 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Analyzing...</span>
              </div>
            ) : currentStep === questions.length - 1 ? (
              'Get Results'
            ) : (
              'Next'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};