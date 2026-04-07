# 🎫 Event Booking System

A full-stack event booking web application built with the MERN stack (MongoDB, Express.js, React, Node.js). Users can browse and book events like concerts, conferences, and sports. Admins can manage events and view all bookings.

![EventBook](https://img.shields.io/badge/MERN-Stack-blue) ![License](https://img.shields.io/badge/license-ISC-green)

---

## 🚀 Features

- 🔐 **Authentication** — Register/Login with JWT tokens
- 🎭 **Browse Events** — View concerts, conferences, sports and more
- 🎫 **Book Tickets** — Book seats with mock payment processing
- 👤 **My Bookings** — View and cancel your bookings
- ⚙️ **Admin Dashboard** — Create, manage and delete events
- 📧 **Email Notifications** — Booking confirmation emails via Nodemailer
- 📱 **Responsive Design** — Works on all screen sizes

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcryptjs
- Nodemailer

---

## ⚙️ Local Setup

### Prerequisites
Make sure you have the following installed:

| Tool | Version |
|------|---------|
| Node.js | v20.x or higher |
| MongoDB | v6.x or higher |
| npm | v9.x or higher |

---

### 1. Clone the Repository
```bash
git clone https://github.com/Raviteja-082005/event-booking-system.git
cd event-booking-system
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/eventbooking
JWT_SECRET=your_super_secret_key_here
STRIPE_SECRET_KEY=sk_test_your_stripe_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

Start the backend server:
```bash
npm run dev
```

Backend runs on: `http://localhost:8000`

---

### 3. Frontend Setup

Open a new terminal:
```bash
cd frontend
npm install
npm start
```

Frontend runs on: `http://localhost:3000`

---

## 📁 Project Structure
---

## 🔑 Default Test Accounts

After setting up, register these accounts:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@test.com | 123456 |
| User | user@test.com | 123456 |

---

## 📧 Email Notifications

Email notifications are implemented using **Nodemailer** with Gmail.

To enable:
1. Enable 2-Step Verification on your Gmail
2. Generate an App Password at https://myaccount.google.com/apppasswords
3. Add credentials to your `.env` file

> ⚠️ Note: Stripe payment gateway is restricted in India. A mock payment system is implemented instead.

---

## 📸 Screenshots

*(Add screenshots of your pages here)*

---

## 👨‍💻 Author

**Anugolu Ravi Teja**  
GitHub: [@Raviteja-082005](https://github.com/Raviteja-082005)

