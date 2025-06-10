import { PersonalityFormData, ApiResponse, ApiError } from '../types/personality';

const API_BASE_URL = 'http://localhost:5000';

export class PersonalityAPI {
  static async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`);
      const data = await response.json();
      return data.status === 'healthy';
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }

  static async predictPersonality(formData: PersonalityFormData): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/api/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(errorData.message || errorData.error || 'Prediction failed');
    }

    return response.json();
  }
}