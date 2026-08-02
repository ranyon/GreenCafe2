# Use the official Python image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy requirements and install them
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port Uvicorn runs on
EXPOSE 8080

# Command to run the application (Fly.io passes PORT=8080)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
