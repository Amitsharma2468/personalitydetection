# Personality Detection ML Backend

This project is a backend service for a personality detection machine learning application. It utilizes a trained model to predict personality traits based on input data.

## Project Structure

```
personality-ml-backend
├── src
│   ├── app.py                # Entry point of the application
│   ├── model
│   │   └── predictor.py      # Model loading and prediction logic
│   ├── api
│   │   └── routes.py         # API route definitions
│   └── utils
│       └── helpers.py        # Utility functions for data processing
├── requirements.txt          # Project dependencies
├── README.md                 # Project documentation
└── .gitignore                # Files to ignore in version control
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd personality-ml-backend
   ```

2. **Create a virtual environment:**
   ```
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     source venv/bin/activate
     ```

4. **Install the required dependencies:**
   ```
   pip install -r requirements.txt
   ```

## Usage

1. **Run the application:**
   ```
   python src/app.py
   ```

2. **Access the API:**
   The API will be available at `http://localhost:5000`. You can use tools like Postman or curl to interact with the endpoints.

## Example

To make a prediction, send a POST request to the `/predict` endpoint with the necessary input data in JSON format.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.