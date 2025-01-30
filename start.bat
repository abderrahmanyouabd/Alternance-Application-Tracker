@echo off
echo Starting Job Application Tracker...

:: Check if virtual environment exists
IF NOT EXIST venv (
    echo Creating Python virtual environment...
    python -m venv venv
) ELSE (
    echo Virtual environment already exists, skipping creation...
)

:: Activate virtual environment
call venv\Scripts\activate

:: Install requirements
echo Installing Python requirements...
pip install -r requirements.txt

:: Initialize database
echo Setting up database...
cd backend
IF NOT EXIST migrations (
    flask db init
)
flask db migrate -m "Initial migration"
flask db upgrade

:: Start the Flask server
echo Starting Flask server...
start cmd /k python app.py

:: Return to root directory
cd ..

:: If frontend exists and uses Angular
:: cd frontend
:: echo Installing frontend dependencies...
:: npm install
:: echo Starting Angular server...
:: start cmd /k ng serve

echo Setup complete! Server running at http://localhost:5000 