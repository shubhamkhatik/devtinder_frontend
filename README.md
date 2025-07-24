
# DevTinder Frontend

DevTinder is a social matching platform that helps developers discover, connect, and collaborate—think **Tinder-style swiping** for code buddies.  
This repository contains the **Vite + React 18** single-page application (SPA) that consumes the DevTinder REST API.

---

## 🚀  Feature Highlights
| # | Feature | Description |
| - | ------- | ----------- |
| 1 | Swipe Cards | Tinder-like interface powered by Framer Motion |
| 2 | Auth Flows | JWT-based login & signup with secure HTTP-only cookies |
| 3 | Global State | Redux Toolkit slices for user, feed, and connection state |
| 4 | Tailwind UI  | Fully responsive design using Tailwind CSS  |
| 5 | Protected Routes | React Router v6 guards redirect unauth users → `/login` |
| 6 | Error Boundaries | Graceful fallback UI on uncaught errors |

---

Table of Contents
Features

Tech Stack

Getting Started

Project Structure

Environment Variables

Deployment

Contributing

License

Features
User authentication (signup, login, logout)

Developer profile creation & update

Browse and match with other developers

Send and receive connection requests

View notifications for requests and matches

Responsive UI across all devices

Tech Stack
Frontend: React.js, Redux Toolkit, Axios, Tailwind CSS, DaisyUI

Deployment: Vercel

API Integration: REST API (connected to DevTinder backend)

Getting Started
Prerequisites
Node.js (v18+)

npm or yarn

Installation
bash
git clone https://github.com/shubhamkhatik/devtinder_frontend.git
cd devtinder_frontend
npm install
Run Development Server
text
npm start
App will be available at http://localhost:5173.




This app is optimized for deployment on Vercel.

Vercel Routing for SPA
To handle 404 errors in Single Page Apps, add a vercel.json:

json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
For not found page error in deployment

vercel : https://vercel.com/docs/rewrites

Nginx :
https://nginx.org/en/docs/http/ngx_http_core_module.html#try_files
https://www.digitalocean.com/community/tutorials/deploy-react-application-with-nginx-on-ubuntu


# detailed overview

azorpay-payment-gateway - Ref - https://razorpay.com/docs/webhooks/validate-test/ - Ref - https://razorpay.com/docs/webhooks/payloads/payments/ # Real Time Chat using Websocket(Socket.io) - Build the UI for a chat window on /chat/:targetUserId - Setup socket.io in backend - npm i socket.io - Setup frontend socket.io-client - Initialise the chat - createSocketConnection - Listen to events give me this in readme format dont add extra
DevTinder
A developer social platform for connecting, matching, and collaborating.

🛠️ Project Setup
Create a Vite + React application.

Remove unnecessary code, initialize a "Hello World" app.

Install Tailwind CSS.

Install Daisy UI.

Add NavBar component to App.jsx.

Create a separate NavBar.jsx component file.

Install react-router-dom.

Create BrowserRouter > Routes > Route=/ Body > RouteChildren.

Create an Outlet in your Body component.

Create a Footer.

Create a Login Page.

Install axios.

🌐 Backend & API Calls
Install and configure cors in backend (middleware with options: origin, credentials: true).

On API requests with axios, use: { withCredentials: true }.

⚛️ State Management
Install react-redux and @reduxjs/toolkit (Redux Quick Start).

Set up configureStore, wrap with Provider, createSlice, and add reducer to store.

Add Redux DevTools in Chrome.

🔐 Auth & Routing
On login, ensure data appears correctly in the Redux store.

NavBar updates live based on login status.

Refactor code to extract constants into a file and group components in a folder.

Restrict route access: cannot access other routes when not logged in.

If JWT/token not present, redirect to login page.

Implement logout feature.

🌟 Core Features
Fetch the feed and add the feed to the Redux store.

Build user cards for the feed.

Profile edit feature.

Show toast message on profile save.

Connections page: view all connections.

Connection Requests page.

Accept/Reject connection requests.

Send/Ignore user card from feed.

Signup new user.

E2E testing.

🏛️ App Structure (example)
text
Body
  |-- NavBar
  |-- Routes
        |-- "/"          => Feed
        |-- "/login"     => Login
        |-- "/connections" => Connections
        |-- "/profile"   => Profile
  |-- Footer
🚀 Deployment
1. Infrastructure
Signup on AWS.

Launch instance.

chmod 400 <secret>.pem

SSH: ssh -i "devTinder-secret.pem" ubuntu@ec2-43-204-96-49.ap-south-1.compute.amazonaws.com

Install Node.js v16.17.0.

Clone repo.

2. Frontend
npm install to install dependencies.

npm run build

Update and install nginx:

sudo apt update

sudo apt install nginx

sudo systemctl start nginx

sudo systemctl enable nginx

Copy built files to nginx root:

sudo scp -r dist/* /var/www/html/

Enable port 80 on instance.

3. Backend
Update DB password.

Whitelist EC2 instance's public IP in MongoDB.

Install pm2 globally: npm install pm2 -g

Start backend with pm2: pm2 start npm --name "devTinder-backend" -- start

Use pm2 commands: logs, list, flush <name>, stop <name>, delete <name>

Configure nginx: /etc/nginx/sites-available/default

Restart nginx: sudo systemctl restart nginx

Update frontend BASEURL to /api.

🖥️ Nginx Configuration
text
Frontend = http://43.204.96.49/
Backend  = http://43.204.96.49:7777/
Domain   = devtinder.com -> 43.204.96.49

Frontend = devtinder.com
Backend  = devtinder.com:7777 -> devtinder.com/api

server_name 43.204.96.49;

location /api/ {
    proxy_pass http://localhost:7777/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
🌎 Custom Domain Setup
Purchase domain from GoDaddy.

Signup on Cloudflare & add new domain.

Change nameservers on GoDaddy to Cloudflare's.

Wait (~15min) for DNS to propagate.

Add DNS record: A devtinder.in 43.204.96.49.

Enable SSL for website.

📧 Sending Emails via SES
Create IAM user with AmazonSESFullAccess.

In SES, create and verify identity (domain & email).

Install AWS SDK v3.

Reference code: AWS SES Examples

Setup SesClient.

Add credentials to .env.

Write code for dynamic SES email sending.

⏰ Scheduling cron jobs in NodeJS
Install node-cron.

Learn cron expressions (crontab.guru).

Schedule a job using node-cron and date-fns.

Find unique email IDs for connection requests in the previous day.

Send email (single & bulk, SES).

Use queue mechanism (bee-queue, bull npm packages) for bulk emails.

💳 Razorpay Payment Gateway Integration
Signup on Razorpay & complete KYC.

Create UI for premium page.

Implement backend API for order creation.

Add keys/secrets in backend .env.

Initialize Razorpay in utils.

Create order, schema, and payments model.

Make API dynamic.

Setup Razorpay webhooks on live API.

References:

Razorpay Node Documents

Integration Steps

Webhook Validate Test

Webhook Payloads

💬 Real Time Chat using WebSocket (Socket.io)
Build chat window UI on /chat/:targetUserId.

Setup socket.io in backend (npm i socket.io).

On frontend, install and setup socket.io-client.

Initialize chat, create socket connection, and listen to events.

## 🙏  Acknowledgments

Inspired by Akshay Saini’s DevTinder tutorial series
