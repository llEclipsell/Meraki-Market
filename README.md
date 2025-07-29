Meraki Market 🛒
Welcome to Meraki Market, a modern and responsive e-commerce platform built with React, designed to showcase a seamless and intuitive online shopping experience. This project demonstrates a robust front-end architecture, efficient state management, and a clean, reusable user interface.

Live At: 

✨ Key Features :
1) Responsive E-commerce Platform: A fully functional storefront that looks and works great on any device, from desktops to mobile phones.

2) Modular Front-End Architecture: Engineered with the Mantine UI component library to create a consistent, scalable, and reusable user interface.

3) Efficient State Management: Utilizes Redux Toolkit to handle complex application state and ensure predictable data flow.

4) Seamless SPA Experience: Integrated React Router for smooth, client-side navigation without page reloads.

5) Google Authentication: Secure and easy login and registration using Google OAuth.

6) Dummy API Integration: Fetches and displays product data from external APIs to simulate a real-world application.

🛠️ Technology Stack
🚀 Getting Started
Prerequisites
Node.js (v16 or higher)

npm (included with Node.js)

Installation
Clone the repository:

git clone https://github.com/<your-username>/Meraki-Market.git
cd Meraki-Market

Install dependencies:

npm install

Set up Environment Variables:
Create a .env file in the project root and add your API keys. You can use the .env.example file as a template.

# Example for Google OAuth Client ID
VITE_GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com"

Start the development server:

npm run dev

Open your browser:
Navigate to http://localhost:5173 (or the port specified in your terminal).

📂 Project Structure
Meraki-Market/
├── public/                # Static assets (favicon, images)
├── src/
│   ├── assets/            # Image assets
│   ├── components/        # Reusable UI components (ProductCard, Navbar)
│   ├── hooks/             # Custom React hooks (useFetchProducts)
│   ├── pages/             # Page components (HomePage, LoginPage, CartPage)
│   ├── services/          # API call logic
│   ├── store/             # Redux Toolkit setup (store, slices)
│   ├── App.jsx            # Main application component with routing
│   └── main.jsx           # Entry point of the application
├── .env.example           # Example environment variables
├── .gitignore             # Files ignored by Git
├── package.json           # Project dependencies and scripts
└── README.md              # You are here!

📜 License
This project is licensed under the MIT License.
