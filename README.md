# Zero-Fraud Payment UI

A modern, secure payment application UI built with React (Vite). This project provides separate dashboards for students and administrators, featuring secure payment flows with QR code generation, transaction history, event management, and fraud detection tools.

    DEPLOYED LINK
    https://zero-fraud-payment-ui-final.vercel.app/

    REPOSITORY LINK
    https://github.com/Supriyo-Giri/ZERO-FRAUD-PAYMENT-UI-FINAL
    
    DEMO VIDEO EXPLAINATION
    https://drive.google.com/file/d/1jln-dBt0FFoVUG4xMF_HjkX6HsPz0BZL/view?usp=drive_link
## Features

*   **User Authentication**: Separate login/signup flows for Students and Admins.
*   **Student Dashboard**:
    *   Make secure payments for events using time-sensitive QR codes.
    *   View personal payment history.
    *   Generate and view verification QR codes for past transactions.
*   **Admin Dashboard**:
    *   Monitor key metrics (Revenue, Users, Transactions, Flagged Items).
    *   View and manage payment transactions, including flagging suspicious activity.
    *   Manage and organize events (Create, Read, Update, Delete).(not yet added in this demo)
*   **Secure Payment Flow**:
    *   Dynamic QR codes that regenerate every 30 seconds during payment.
    *   Post-payment verification QR codes containing transaction hashes, also regenerating every 30 seconds.
*   **Responsive Design**: Professional, mobile-friendly UI for all components.

## Getting Started

1.  **Clone the repository:**
    `git clone <your-repository-url>`
2.  **Navigate to the project directory:**
    (or your project folder name)
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

## Future Scope

* *Credit-Based System*
  A feature is planned to introduce a credit-based model for rewarding user engagement and participation, particularly for students.

* *Admin Community Forum*
  A community space for admins will be developed to support event collaboration, feature discussions, and platform feedback.

  
* *Reverse Proxy with NGINX*
  NGINX will be used as a reverse proxy to route requests, enhance performance, manage load balancing, serve static files, and improve overall system security.


  * *Anti-Spam Alerts*: The system can also include basic moderation tools where admins are alerted if a user exhibits potential spam behavior, enabling timely action to maintain a healthy forum environment.

* *Authentication System Expansion*
  Currently, only the demo Signup and Login UI is available. Future versions will feature full authentication using a secure backend server and database for user management.

* *Backend Integration*
  A production-ready backend will handle data validation, submission, and persistent storage using databases like MongoDB or PostgreSQL.


*Note: Currently, only the frontend UI has been built due to time constraints. The above features are part of the planned roadmap to ensure robustness, scalability, and user trust.*
