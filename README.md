# 🚀 SmartHire AI Recruitment Platform

An AI-powered full-stack recruitment management platform designed to simplify hiring workflows, candidate management, interview scheduling, and recruitment analytics.

Built using **React.js**, **Spring Boot**, **MySQL**, and **JWT Authentication**.

---

# 🌐 Live Demo

Frontend Deployment (Vercel)

https://smarthire-frontend-henna.vercel.app

Backend Deployment (Railway)

https://smarthire-ai-recruitment-platform-production.up.railway.app

---

# 📌 Project Overview

SmartHire AI Recruitment Platform helps HR teams and recruiters manage the complete recruitment process in one place.

The platform includes:

* Secure authentication system
* Candidate management
* Job posting system
* AI-based resume analyzer
* Interview scheduling
* Recruitment analytics dashboard
* Candidate tracking & filtering

---

# ✨ Key Features

## 🔐 Authentication System

* JWT-based secure login/register
* Role-based authentication
* Protected dashboard routes

## 👥 Candidate Management

* Add candidates
* Update candidate status
* Delete candidates
* Search and filter candidates
* Candidate profile modal

## 📌 Job Management

* Create new job postings
* View active jobs
* Delete jobs
* Department & location management

## 🤖 AI Resume Analyzer

* Resume text analysis
* AI-generated role suggestions
* Match score prediction
* Resume improvement suggestions

## 🎤 Interview Scheduler

* Schedule interviews
* Online/Offline interview modes
* Track scheduled interviews

## 📊 Recruitment Analytics

* Candidate status pie chart
* Hiring analytics dashboard
* Job vs candidate visualization

---

# 🛠️ Tech Stack

## Frontend

* React.js
* React Router DOM
* Axios
* Recharts
* React Icons
* CSS3

## Backend

* Spring Boot
* Spring Security
* JWT Authentication
* REST APIs
* Maven

## Database

* MySQL

## Deployment

* Vercel (Frontend)
* Railway (Backend + MySQL)

---

# 📂 Project Structure

```bash
SmartHire-AI-Recruitment-Platform/
│
├── smarthire-frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── package-lock.json
│
├── smarthire-backend/
│   ├── src/main/java/
│   │   ├── controller/
│   │   ├── entity/
│   │   ├── repository/
│   │   ├── security/
│   │   ├── dto/
│   │   └── service/
│   │
│   ├── src/main/resources/
│   │   └── application.properties
│   │
│   └── pom.xml
│
├── screenshots/
│
└── README.md
```

---

# ⚙️ Backend Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/aryankumar2657-hub/SmartHire-AI-Recruitment-Platform.git
```

---

## 2️⃣ Backend Setup

```bash
cd smarthire-backend
```

### Configure application.properties

```properties
spring.datasource.url=YOUR_DATABASE_URL
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
jwt.secret=YOUR_SECRET
```

---

## 3️⃣ Run Backend

```bash
mvn spring-boot:run
```

Backend runs on:

```bash
http://localhost:8080
```

---

# 💻 Frontend Setup

```bash
cd smarthire-frontend
npm install
npm start
```

Frontend runs on:

```bash
http://localhost:3000
```

---

# 🚀 Deployment Details

## Frontend Deployment — Vercel

### Environment Variable

```env
REACT_APP_API_URL=https://smarthire-ai-recruitment-platform-production.up.railway.app/api
```

### Deployment Steps

```bash
git add .
git commit -m "Frontend deployment"
git push
```

Vercel automatically redeploys after every push.

---

## Backend Deployment — Railway

### Environment Variables

```env
SPRING_DATASOURCE_URL=
SPRING_DATASOURCE_USERNAME=
SPRING_DATASOURCE_PASSWORD=
JWT_SECRET=
```

### Deployment Process

* Backend deployed using Railway
* MySQL database hosted on Railway
* Auto deployment connected with GitHub

---

# 📸 Screenshots

Project screenshots available inside:

```bash
/screenshots
```

---

# 🔮 Future Improvements

* AI resume parsing using NLP
* Email notifications
* Real-time chat system
* Applicant Tracking System (ATS)
* Advanced analytics
* Resume upload parser
* Admin panel
* Dark mode

---

# 👨‍💻 Developer

## Aryan Kumar

Java Full Stack Developer passionate about building scalable AI-powered web applications.

### 🔗 LinkedIn

https://www.linkedin.com/in/aryan-kumar-a760843a0

### 🔗 GitHub

https://github.com/aryankumar2657-hub

---

# ⭐ Feedback

If you like this project, please give it a ⭐ on GitHub and share your feedback.
s