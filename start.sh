#!/bin/bash
echo "Starting Job Application Tracker..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
else
    echo "Virtual environment already exists, skipping creation..."
fi

# Activate virtual environment
source venv/bin/activate

# Install requirements
echo "Installing Python requirements..."
pip install -r requirements.txt

# Initialize database
echo "Setting up database..."
cd backend
if [ ! -d "migrations" ]; then
    flask db init
fi
flask db migrate -m "Initial migration"
flask db upgrade

# Start the Flask server
echo "Starting Flask server..."
python app.py &

# Return to root directory
cd ..

# If frontend exists and uses Angular
# cd frontend
# echo "Installing frontend dependencies..."
# npm install
# echo "Starting Angular server..."
# ng serve &

echo "Setup complete! Server running at http://localhost:5000" 