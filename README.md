# 🧬 BioWaste AI

> AI-powered Biomedical Waste Classification and Compliance System

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://biowaste-ai.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-Render-blue)](https://biowaste-ai-backend.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-biowaste--ai-black)](https://github.com/Vaitheeshwaran-ID/biowaste-ai)

---

## 🔴 Problem Statement

India generates approximately **700 tonnes of biomedical waste daily**
from over 270,000 healthcare facilities. Less than half of this waste
is processed correctly due to untrained staff and poor segregation
practices. Wrong disposal causes disease spread, environmental
contamination, and violates CPCB regulations.

**BioWaste AI** solves this by providing instant AI-powered waste
classification and CPCB-compliant disposal guidance to hospital staff.

---

## ✅ Solution

A smart web application where:
- Hospital staff **describes the waste** in simple words
- Our **AI agent classifies it** instantly using Google Gemini
- Staff gets **exact disposal instructions** based on CPCB India rules
- All waste logs are **stored in MongoDB database**
- **Dashboard** shows all waste logs with category and date
- Monthly **compliance reports** auto-generated for government submission

---

## 🌐 Live Demo

| Service | URL |
|---|---|
| Frontend | https://biowaste-ai.vercel.app |
| Backend API | https://biowaste-ai-backend.onrender.com |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js + Vite |
| Backend | Python Flask |
| AI Agent | Google Gemini API |
| Database | MongoDB Atlas |
| Frontend Deployment | Vercel |
| Backend Deployment | Render |
| Version Control | Git + GitHub |

---

## 📁 Project Structure
```
biowaste-ai/
├── frontend/                  # React.js application
│   └── src/
│       ├── components/
│       │   └── ChatBox.jsx    # AI chat interface
│       ├── pages/
│       │   ├── Home.jsx       # Landing page
│       │   └── Dashboard.jsx  # Waste log dashboard
│       └── App.jsx            # Route configuration
│
└── backend/                   # Python Flask API
    ├── app.py                 # Main entry point
    ├── routes/
    │   ├── ai_routes.py       # AI classification APIs
    │   ├── waste_routes.py    # Waste log APIs
    │   └── report_routes.py   # Report generation APIs
    ├── models/
    │   └── waste_model.py     # MongoDB connection
    ├── services/
    │   └── gemini_service.py  # Google Gemini AI service
    └── requirements.txt       # Python dependencies
```

---

## 🚀 Features

- ✅ AI-powered waste classification using Google Gemini
- ✅ CPCB India compliant disposal guidance
- ✅ Biomedical Waste Management Rules 2016 compliance
- ✅ Department-wise waste logging
- ✅ Color-coded waste category display
- ✅ Real-time waste log dashboard
- ✅ Monthly compliance report generation
- ✅ Chemical safety advisor for lab workers

---

## 📋 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/ai/classify | Classify biomedical waste using AI |
| POST | /api/ai/safety | Get chemical safety advice |
| POST | /api/waste/log | Log a waste entry |
| GET | /api/waste/logs | Get all waste logs |
| GET | /api/waste/stats | Get category statistics |
| GET | /api/report/monthly | Generate monthly report |

---

## 🏃 How to Run Locally

### Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open: http://localhost:5173

---

## 🔑 Environment Variables

Create `backend/.env` file:
```
GEMINI_API_KEY=your_gemini_api_key
MONGO_URI=your_mongodb_connection_string
```

---

## 👥 Team

| Member | Role | Branch |
|---|---|---|

| Dhilip | Frontend Developer | frontend |
| Madhushree | AI Agent Developer | ai |
| Sudharsan | Backend Developer | backend |
| Deepak Anand | Database Developer | database |
| HariShankar | Testing + Integration | integration |
| Vaitheeshwaran | Deployment | Main |

---

## 🎯 Problem Impact

| Statistic | Value |
|---|---|
| Daily biomedical waste in India | 700 tonnes |
| Healthcare facilities | 270,000+ |
| Waste processed correctly | Less than 50% |
| Our solution | Instant AI classification |

---

## 📸 Screenshots

### Home Page — AI Classifier
Hospital staff describes waste and gets instant CPCB guidance

### Dashboard — Waste Log
All waste entries with department, category, quantity and date

---

## 🏆 Project Highlights

- Built by **Biotech students** with deep domain knowledge
- Solves a **real documented problem** in India
- Uses **cutting-edge AI** (Google Gemini)
- **Fully deployed** and accessible online
- Follows **industry standard** tech stack
- Complete **Git workflow** with branch management

---

## 📚 References

- CPCB Biomedical Waste Management Rules 2016
- Central Pollution Control Board India
- Google Gemini AI API Documentation
- MongoDB Atlas Documentation

---

## 📄 License

This project is built for educational and placement purposes.

---

*Built with ❤️ by Biotech Students — 2023-2027 Batch*
