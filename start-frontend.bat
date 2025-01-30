@echo off
echo Starting Angular Frontend...

:: Check if Node.js is installed
where node >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Error: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    exit /b 1
)

:: Check if Angular CLI is installed
where ng >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Installing Angular CLI globally...
    npm install -g @angular/cli
)

:: Install dependencies if node_modules doesn't exist
IF NOT EXIST node_modules (
    echo Installing dependencies...
    npm install
)

:: Start Angular server
echo Starting Angular development server...
ng serve 