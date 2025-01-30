# Job Application Tracker

A modern web application built with Angular and Flask to help job seekers track their job applications efficiently.

## Features

- 🌐 Bilingual Support (English/French)
- 📝 Create and manage job applications
- 📊 Track application status
- 📎 Attach CV and cover letters
- 🔍 Filter applications by status and company
- 📤 Export applications to Excel
- 🎨 Modern, responsive UI with Tailwind CSS
- 🌓 Smooth animations and transitions

## Application Status Types

- 📌 To Apply
- ⏳ Pending
- 📨 Applied
- 🤝 Interview
- ✅ Accepted
- ❌ Rejected

## Tech Stack

### Frontend
- Angular 17
- Tailwind CSS
- TypeScript
- RxJS

### Backend
- Flask
- SQLAlchemy
- Python 3.x

## Prerequisites

- Node.js (v18 or higher)
- Python 3.x
- pip (Python package manager)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/abderrahmanyouabd/job-tracker.git
cd job-tracker
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
pip install -r requirements.txt
```

## Running the Application

1. Start the backend server:
```bash
# Windows
start-backend.bat

# Linux/Mac
./start-backend.sh
```

2. Start the frontend development server:
```bash
# Windows
start-frontend.bat

# Linux/Mac
./start-frontend.sh
```

3. Open your browser and navigate to `http://localhost:4200`

## Development

### Frontend Structure
```
src/
├── app/
│   ├── components/
│   │   ├── job-tracker/
│   │   ├── nav-bar/
│   │   ├── footer/
│   │   └── language-switcher/
│   ├── services/
│   │   ├── job.service.ts
│   │   └── language.service.ts
│   └── models/
│       └── job-application.ts
└── styles.scss
```

### Backend Structure
```
backend/
├── app.py
├── models.py
├── config.py
└── requirements.txt
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Author

**Abderrahman Youabd (A1ST)**
- GitHub: [@abderrahmanyouabd](https://github.com/abderrahmanyouabd)
- LinkedIn: [Abderrahman Youabd](https://www.linkedin.com/in/abderrahman-youabd)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
