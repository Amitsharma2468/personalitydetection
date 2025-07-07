# Personality Detection Using Machine Learning

## 1. Team Information

**Name:** Gour Gupal Talukder Shawon  
**Registration No.:** 2020831037

**Name:** Amit Kumar Sharma  
**Registration No.:** 2020831009

**Course Title:** Machine Learning Lab  
**Course Code:** SWE 344  
**Project Repository:** [GitHub Link](#)

---

## 2. Project Overview

This project aims to develop a machine learning model that predicts an individual's personality type based on behavioral and social indicators. The solution encompasses model training, evaluation, and deployment within a user-friendly web application. Applications include mental health support, user profiling, and personalization technologies.

---

## 3. Problem Definition

Predicting personality traits such as introversion or extroversion from behavioral data is a challenging task. This project addresses the challenge by collecting structured behavioral inputs and training a classifier to identify patterns that correlate with personality types.

---

## 4. Dataset Description

- **Source:** Kaggle (`personality_dataset.csv`)
- **Target Variable:** Personality
- **Features:**
  - Time_spent_Alone
  - Stage_fear
  - Social_event_attendance
  - Going_outside
  - Drained_after_socializing
  - Friends_circle_size
  - Post_frequency

The dataset contains both numerical and categorical features related to behavioral habits and social interactions.

---

## 5. Methodology

### 5.1 Data Preprocessing

- **Missing Value Imputation:**
  - Numerical columns: filled with mean values
  - Categorical columns: filled with the most frequent value
- **Encoding:**
  - Label encoding for the target class
  - One-hot encoding for categorical features (avoiding dummy variable trap)

### 5.2 Train-Test Split

- 80% training, 20% testing using `train_test_split()`

### 5.3 Model Selection and Training

- **Model:** Random Forest Classifier
- **Parameters:**
  - `n_estimators=100`
  - `random_state=42`
  - `n_jobs=-1` (parallel computation)

---

## 6. Evaluation

- **Metrics Used:**
  - Accuracy Score: ~92%
  - Precision, Recall, F1-Score (via classification report)
- **Result:**  
  The model achieved high accuracy on the test set (approx. 91%, depending on the data split).

---

## 7. Model Deployment and Integration

- **Backend:** Python (Flask API)
- **Frontend:** Next.js (React-based UI)
- **Deployment:**  
  The trained model is integrated into a web application, allowing users to input behavioral data and receive real-time personality predictions.

---

## 8. Artifacts and Assets

- Trained Random Forest model (`.joblib`)
- Label encoder and preprocessing tools
- Feature list used during training
- Accuracy scores for validation
- Complete project available at: [GitHub Repository](#)

---

## 9. Conclusion

This project demonstrates the practical application of machine learning in behavioral analysis and personality prediction. By leveraging structured behavioral data and a Random Forest classifier, and deploying the solution via a modern web stack, we have built a reliable and user-friendly system. The model shows promising results and can be extended to more complex personality profiling tasks in future research.

---