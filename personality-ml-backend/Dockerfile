# Use a slim Python image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all source code
COPY . .

# Expose the port your Flask app will run on
EXPOSE 7860

# Set environment variables for Flask
ENV FLASK_APP=api/app.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=7860

# Start the Flask app
CMD ["flask", "run"]
