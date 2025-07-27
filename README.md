# Zero-Fraud Payment UI

A modern, secure payment application UI built with React (Vite). This project provides separate dashboards for students and administrators, featuring secure payment flows with QR code generation, transaction history, event management, and fraud detection tools.

## Features

*   **User Authentication**: Separate login/signup flows for Students and Admins.
*   **Student Dashboard**:
    *   Make secure payments for events using time-sensitive QR codes.
    *   View personal payment history.
    *   Generate and view verification QR codes for past transactions.
*   **Admin Dashboard**:
    *   Monitor key metrics (Revenue, Users, Transactions, Flagged Items).
    *   View and manage payment transactions, including flagging suspicious activity.
    *   Manage and organize events (Create, Read, Update, Delete).
*   **Secure Payment Flow**:
    *   Dynamic QR codes that regenerate every 30 seconds during payment.
    *   Post-payment verification QR codes containing transaction hashes, also regenerating every 30 seconds.
*   **Responsive Design**: Professional, mobile-friendly UI for all components.

## Getting Started

1.  **Clone the repository:**
    `git clone <your-repository-url>`
2.  **Navigate to the project directory:**
    `cd transaction-app` (or your project folder name)
3.  **Install dependencies:**
    `npm install`
4.  **Start the development server:**
    `npm run dev`
5.  The application should now be running on `http://localhost:5173` (or similar, check your terminal output).

## Technologies Used

*   **React** (with Vite)
*   **React Router** (for navigation)
*   **qrcode.react** (for generating QR codes)
*   **Font Awesome** (for icons)
*   **CSS3** (Custom styling with modern layouts)
