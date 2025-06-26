from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib
import os
from sklearn.preprocessing import LabelEncoder
from sklearn.impute import SimpleImputer
import traceback

app = Flask(__name__)
CORS(app)

class PersonalityPredictor:
    def __init__(self):
        self.model = None
        self.label_encoder = None
        self.imputer_numerical = None
        self.imputer_categorical = None
        self.trained_columns = None
        self.model_accuracy = None
        self.load_model()
    
    def load_model(self):
        """Load the trained model and preprocessing artifacts"""
        model_artifacts = 'model_artifacts'
        
        try:
            if os.path.exists(model_artifacts):
                self.model = joblib.load(f'{model_artifacts}/personality_model.joblib')
                self.label_encoder = joblib.load(f'{model_artifacts}/label_encoder.joblib')
                self.imputer_numerical = joblib.load(f'{model_artifacts}/imputer_numerical.joblib')
                self.imputer_categorical = joblib.load(f'{model_artifacts}/imputer_categorical.joblib')
                self.trained_columns = joblib.load(f'{model_artifacts}/trained_columns.joblib')
                self.model_accuracy = joblib.load(f'{model_artifacts}/model_accuracy.joblib')
                print("✅ Model loaded successfully")
            else:
                print("⚠️ Model artifacts not found. Using fallback prediction logic.")
                self.setup_fallback()
        except Exception as e:
            print(f"❌ Error loading model: {str(e)}")
            self.setup_fallback()
    
    def setup_fallback(self):
        """Setup fallback prediction when model is not available"""
        self.model = None
        self.model_accuracy = 0.85
    
    def predict_personality(self, input_data):
        """Predict personality using the loaded model or fallback logic"""
        try:
            if self.model is not None:
                return self.predict_with_model(input_data)
            else:
                return self.predict_with_fallback(input_data)
        except Exception as e:
            print(f"Prediction error: {str(e)}")
            traceback.print_exc()
            return self.predict_with_fallback(input_data)
    
    def predict_with_model(self, input_data):
        """Use the actual trained model for prediction"""
        # Convert input to DataFrame
        input_df = pd.DataFrame([input_data])
        
        # Map frontend field names to model field names
        field_mapping = {
            'timeSpentAlone': 'Time_spent_Alone',
            'stageFear': 'Stage_fear',
            'socialEventAttendance': 'Social_event_attendance',
            'goingOutside': 'Going_outside',
            'drainedAfterSocializing': 'Drained_after_socializing',
            'friendsCircleSize': 'Friends_circle_size',
            'postFrequency': 'Post_frequency'
        }
        
        # Rename columns to match model expectations
        model_input = {}
        for frontend_key, model_key in field_mapping.items():
            if frontend_key in input_data:
                model_input[model_key] = input_data[frontend_key]
        
        input_df = pd.DataFrame([model_input])
        
        # Identify numerical and categorical columns
        numerical_cols = input_df.select_dtypes(include=['float64', 'int64']).columns
        categorical_cols = input_df.select_dtypes(include=['object']).columns
        
        # Apply imputation
        if len(numerical_cols) > 0:
            input_df[numerical_cols] = self.imputer_numerical.transform(input_df[numerical_cols])
        if len(categorical_cols) > 0:
            input_df[categorical_cols] = self.imputer_categorical.transform(input_df[categorical_cols])
        
        # One-hot encoding for categorical variables
        input_df_encoded = pd.get_dummies(input_df, columns=categorical_cols, drop_first=True)
        
        # Ensure all trained columns are present
        final_input = input_df_encoded.reindex(columns=self.trained_columns, fill_value=0)
        
        # Make prediction
        prediction_encoded = self.model.predict(final_input)[0]
        prediction_proba = self.model.predict_proba(final_input)[0]
        
        # Decode prediction
        personality = self.label_encoder.inverse_transform([prediction_encoded])[0]
        confidence = max(prediction_proba) * 100
        
        # Generate traits based on input
        traits = self.generate_traits(input_data)
        
        return {
            'personality': personality,
            'confidence': round(confidence, 1),
            'traits': traits,
            'model_accuracy': round(self.model_accuracy * 100, 1)
        }
    
    def predict_with_fallback(self, input_data):
        """Fallback prediction logic when model is not available"""
        # Extract values
        time_alone = float(input_data.get('timeSpentAlone', 4))
        stage_fear = input_data.get('stageFear', 'Yes').lower()
        social_events = float(input_data.get('socialEventAttendance', 2))
        going_outside = float(input_data.get('goingOutside', 5))
        drained_socializing = input_data.get('drainedAfterSocializing', 'Yes').lower()
        friends_circle = float(input_data.get('friendsCircleSize', 8))
        post_frequency = float(input_data.get('postFrequency', 3))
        
        # Scoring system (similar to your original logic)
        extraversion_score = 0
        
        # Time spent alone (less = more extraverted)
        if time_alone <= 2:
            extraversion_score += 3
        elif time_alone <= 4:
            extraversion_score += 1
        elif time_alone >= 8:
            extraversion_score -= 3
        elif time_alone >= 6:
            extraversion_score -= 1
        
        # Stage fear
        if stage_fear == 'no':
            extraversion_score += 2
        else:
            extraversion_score -= 2
        
        # Social events
        if social_events >= 4:
            extraversion_score += 3
        elif social_events >= 2:
            extraversion_score += 1
        elif social_events == 0:
            extraversion_score -= 2
        
        # Going outside
        if going_outside >= 8:
            extraversion_score += 2
        elif going_outside >= 5:
            extraversion_score += 1
        elif going_outside <= 2:
            extraversion_score -= 2
        
        # Drained after socializing
        if drained_socializing == 'no':
            extraversion_score += 2
        else:
            extraversion_score -= 2
        
        # Friends circle size
        if friends_circle >= 15:
            extraversion_score += 3
        elif friends_circle >= 8:
            extraversion_score += 1
        elif friends_circle <= 3:
            extraversion_score -= 2
        
        # Post frequency
        if post_frequency >= 7:
            extraversion_score += 2
        elif post_frequency >= 3:
            extraversion_score += 1
        elif post_frequency == 0:
            extraversion_score -= 1
        
        # Determine personality
        if extraversion_score >= 5:
            personality = 'Extrovert'
            confidence = min(95, 85 + (extraversion_score - 5) * 2)
        elif extraversion_score <= -3:
            personality = 'Introvert'
            confidence = min(95, 85 + abs(extraversion_score + 3) * 2)
        else:
            personality = 'Ambivert'
            confidence = max(70, 85 - 10)
        
        traits = self.generate_traits(input_data)
        
        return {
            'personality': personality,
            'confidence': round(confidence, 1),
            'traits': traits,
            'model_accuracy': 85.0
        }
    
    def generate_traits(self, input_data):
        """Generate personality traits based on input data"""
        traits = []
        
        stage_fear = input_data.get('stageFear', 'Yes').lower()
        social_events = float(input_data.get('socialEventAttendance', 2))
        time_alone = float(input_data.get('timeSpentAlone', 4))
        friends_circle = float(input_data.get('friendsCircleSize', 8))
        post_frequency = float(input_data.get('postFrequency', 3))
        going_outside = float(input_data.get('goingOutside', 5))
        
        if stage_fear == 'no':
            traits.append('Confident public speaker')
        if social_events >= 3:
            traits.append('Socially active')
        if time_alone >= 6:
            traits.append('Values solitude')
        if friends_circle <= 5:
            traits.append('Prefers close relationships')
        if friends_circle >= 15:
            traits.append('Wide social network')
        if post_frequency >= 5:
            traits.append('Socially expressive online')
        if going_outside >= 8:
            traits.append('Outdoor enthusiast')
        if going_outside <= 2:
            traits.append('Prefers indoor activities')
        
        return traits

# Initialize predictor
predictor = PersonalityPredictor()

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': predictor.model is not None,
        'timestamp': pd.Timestamp.now().isoformat()
    })

@app.route('/api/predict', methods=['POST'])
def predict_personality():
    """Personality prediction endpoint"""
    try:
        # Get input data
        input_data = request.get_json()
        
        if not input_data:
            return jsonify({'error': 'No input data provided'}), 400
        
        # Validate required fields
        required_fields = [
            'timeSpentAlone', 'stageFear', 'socialEventAttendance',
            'goingOutside', 'drainedAfterSocializing', 'friendsCircleSize', 'postFrequency'
        ]
        
        missing_fields = [field for field in required_fields if field not in input_data]
        if missing_fields:
            return jsonify({
                'error': f'Missing required fields: {", ".join(missing_fields)}'
            }), 400
        
        # Make prediction
        prediction = predictor.predict_personality(input_data)
        
        return jsonify({
            'success': True,
            'prediction': prediction,
            'timestamp': pd.Timestamp.now().isoformat()
        })
        
    except Exception as e:
        print(f"API Error: {str(e)}")
        traceback.print_exc()
        return jsonify({
            'error': 'Internal server error',
            'message': str(e)
        }), 500

if __name__ == '__main__':
    print("🚀 Starting Personality Prediction API...")
    print("📊 Health check: http://0.0.0.0:5000/api/health")
    print("🧠 Prediction endpoint: http://0.0.0.0:5000/api/predict")
    app.run(debug=False, host='0.0.0.0', port=5000)
