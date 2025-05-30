# weather-app

A modern weather application built with **Next.js**, using **OpenWeather API** for data, **SWR** for caching, and **Auth0** for secure authentication. Includes Multi-Factor Authentication (MFA).

## 🛠️ Setup Instructions

1. **Clone the Repository**  
   `git clone https://github.com/Sahan-Dil/weather-app.git && cd weather-app`

2. **Install Dependencies**  
   `npm install`

3. **Run the App Locally**  
   `npm run dev`  
   Then open [http://localhost:3000](http://localhost:3000)

4. **Auth0 Login**  
   Use the pre-configured test credentials:  
   test@gmail.com
   test#test1234

## 🛠️ Features

- 🔐 Auth0 Authentication with login & logout
- 🔐 MFA Enabled (via Authenticator App)
- 📧 Restricted access (no public signups)
- 📦 Weather data fetched from OpenWeather API
- 🕒 Cached for 5 minutes using SWR
- 🔄 Auto-refetches while user remains on page
- ⚡ Built with modern tools: Next.js, TailwindCSS, MUI, SWR, and more
