"use client";

import React, { useState, useEffect } from 'react';
import { PersonalityForm } from './components/PersonalityForm';
import { ResultsDisplay } from './components/ResultDisplay';
import { LoadingSpinner } from './components/LoadingSoinner';
import { ErrorDisplay } from './components/ErrorDisplay';
import { PersonalityAPI } from './services/api';
import { PersonalityFormData, PersonalityPrediction } from './types/personality';
import { Brain, Sparkles } from 'lucide-react';

type AppState = 'form' | 'loading' | 'results' | 'error';

function App() {
  const [state, setState] = useState<AppState>('form');
  const [prediction, setPrediction] = useState<PersonalityPrediction | null>(null);
  const [error, setError] = useState<string>('');
  const [backendHealth, setBackendHealth] = useState<boolean>(false);

  useEffect(() => {
    checkBackendHealth();
  }, []);

  const checkBackendHealth = async () => {
    const isHealthy = await PersonalityAPI.checkHealth();
    setBackendHealth(isHealthy);
  };

  const handleFormSubmit = async (formData: PersonalityFormData) => {
    setState('loading');
    setError('');

    try {
      const response = await PersonalityAPI.predictPersonality(formData);
      setPrediction(response.prediction);
      setState('results');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      setState('error');
    }
  };

  const handleReset = () => {
    setState('form');
    setPrediction(null);
    setError('');
  };

  const handleRetry = () => {
    setState('form');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="text-center py-12 px-4">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="relative">
              <Brain className="w-12 h-12 text-purple-600" />
              <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Personality AI
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Discover your personality type with our advanced AI-powered assessment. 
            Answer a few questions and get personalized insights about your psychological profile.
          </p>
          
          {/* Backend Status Indicator */}
          <div className="mt-6 inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white shadow-lg">
            <div className={`w-2 h-2 rounded-full ${backendHealth ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm font-medium text-gray-600">
              {backendHealth ? 'AI Model Ready' : 'Connecting to AI...'}
            </span>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-4 pb-12">
          {state === 'form' && (
            <PersonalityForm 
              onSubmit={handleFormSubmit} 
              loading={false}
            />
          )}
          
          {state === 'loading' && <LoadingSpinner />}
          
          {state === 'results' && prediction && (
            <ResultsDisplay 
              prediction={prediction} 
              onReset={handleReset}
            />
          )}
          
          {state === 'error' && (
            <ErrorDisplay 
              error={error} 
              onRetry={handleRetry}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="text-center py-8 px-4">
          <div className="text-sm text-gray-500 space-y-2">
            <p>Powered by advanced machine learning algorithms</p>
            <p className="text-xs">
              Results are for entertainment and self-reflection purposes. 
              Consult professionals for clinical assessments.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;