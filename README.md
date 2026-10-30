🛡️ FinShield Bharat

FinShield Bharat is a web-based application designed to help users verify suspicious investment tips, stock alerts, and financial advice received on platforms like WhatsApp and Telegram. It scans text and links to detect potential financial fraud, unrealistic guarantees, and unregistered entities, protecting users from scams.

✨ Features

Real-Time Scam Detection: Scans pasted messages for high-risk terms (e.g., "100% daily profit", "zero risk") and suspicious domains.

Multilingual Interface: Easily switch between English, বাংলা (Bengali), and हिन्दी (Hindi) to serve a diverse user base across India.

Visual Risk Scoring: Generates a clear risk score (0-100) and provides a clear verdict (Safe, Caution, or High Risk).

Actionable Advice: Directs users to verify SEBI registrations or report scams to the CyberCrime portal if high risks are detected.

🛠️ Tech Stack

Frontend: HTML5, Tailwind CSS (for styling), Vanilla JavaScript

Backend: Python, FastAPI, Pydantic

Server: Uvicorn

📁 Project Structure

FinShield Bharat/
│
├── backend/
│   ├── main.py         # Main FastAPI application server
│   ├── models.py       # Pydantic data models for request/response
│   └── scanner.py      # Core logic and rules for scanning text/links
│
├── frontend/
│   └── index.html      # Main UI with Tailwind CSS and JS logic integrated
│
└── requirements.txt    # Python dependencies


🚀 How to Run the Project

1. Start the Backend (Python/FastAPI)

Open a terminal and navigate to the project's root folder.

Install the required dependencies:

pip install fastapi uvicorn pydantic


Navigate into the backend folder and start the server:

cd backend
python main.py


You should see a message indicating the server is running on http://0.0.0.0:8000. Leave this terminal open.

2. Start the Frontend

Open your File Explorer.

Navigate to the frontend folder.

Double-click the index.html file to open it in your default web browser.
(Alternatively, if using VS Code, right-click index.html and select "Open with Live Server").

🧪 Testing the App

To test the application, copy and paste the following fake scam message into the text box and click Scan for Risks:

"🚨 VIP STOCK ALERT! 🚨 Join our premium Telegram group now. 100% daily guaranteed profit! Zero risk on your investment. Sebi approved operators. Click here to double your money fast: http://guaranteed-crypto-profit.com/vip"

📝 License

This project was built for educational and hackathon purposes.
