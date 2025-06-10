export interface PersonalityFormData {
  timeSpentAlone: number;
  stageFear: 'Yes' | 'No';
  socialEventAttendance: number;
  goingOutside: number;
  drainedAfterSocializing: 'Yes' | 'No';
  friendsCircleSize: number;
  postFrequency: number;
}

export interface PersonalityPrediction {
  personality: 'Extrovert' | 'Introvert' | 'Ambivert';
  confidence: number;
  traits: string[];
  model_accuracy: number;
}

export interface ApiResponse {
  success: boolean;
  prediction: PersonalityPrediction;
  timestamp: string;
}

export interface ApiError {
  error: string;
  message?: string;
}