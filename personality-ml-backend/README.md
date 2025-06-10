# Personality Prediction Backend

## Setup Instructions

1. **Create a virtual environment:**
   ```bash
   cd backend
   python -m venv venv
   ```

2. **Activate the virtual environment:**
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Place your model artifacts:**
   - Create a `model_artifacts` folder in the backend directory
   - Copy your trained model files:
     - `personality_model.joblib`
     - `label_encoder.joblib`
     - `imputer_numerical.joblib`
     - `imputer_categorical.joblib`
     - `trained_columns.joblib`
     - `model_accuracy.joblib`

5. **Run the server:**
   ```bash
   python app.py
   ```

The API will be available at `http://localhost:5000`

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/predict` - Personality prediction

## Model Integration

The backend automatically loads your trained scikit-learn model from the `model_artifacts` directory. If the model files are not found, it falls back to a rule-based prediction system.