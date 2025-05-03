# NotifyLog

![Build Status](https://img.shields.io/github/workflow/status/your-username/NotifyLog/CI/main)
![License](https://img.shields.io/github/license/your-username/NotifyLog)
![GitHub Stars](https://img.shields.io/github/stars/your-username/NotifyLog)

**NotifyLog** is a full-stack Node.js/NestJS microservice built with clean architecture and SOLID principles, designed for sending email/SMS notifications, logging messages/errors, and managing webhooks. It’s portable, modular, and paired with a Next.js/React frontend to visualize notification and error log history. Features an interactive **Swagger UI** for API exploration.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Frontend Setup](#frontend-setup)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features
- Send notifications (email/SMS) with a strategy pattern.
- Dual logging: Winston for info logs, MongoDB for error logs.
- Webhook subscriptions for real-time event notifications.
- Advanced log filtering and retrieval.
- Next.js/React frontend for notification and error log history.
- **Swagger UI** for interactive API documentation.

## Tech Stack
- **Backend**: Node.js, NestJS, MongoDB, Mongoose, Winston, TypeScript
- **Frontend**: Next.js, React, Tailwind CSS, React Query
- **Tools**: Swagger UI, Prettier, ESLint

## Getting Started (Backend)
### Prerequisites
- Node.js (>=18.x)
- MongoDB (local or Atlas)
- Git

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/NotifyLog.git
   cd NotifyLog


Install dependencies:npm install


Create .env:MONGO_URI=mongodb://localhost:27017/notifylog


Start MongoDB:mongod


Run the backend:npm run start



Testing

Access Swagger UI: http://localhost:3000/api
Send notification:curl -X POST http://localhost:3000/api/notifications \
-H 'Content-Type: application/json' \
-d '{"recipient":"test@example.com","subject":"Test","body":"Message ID: MSG123.","mediaType":"EMAIL","notificationType":"message-id"}'


Get logs:curl http://localhost:3000/api/logs?level=error&context=NotificationController



Frontend Setup
Prerequisites

Node.js (>=18.x)
Backend running at http://localhost:3000

Installation

Clone the frontend (or navigate to directory):git clone https://github.com/your-username/notifylog-frontend.git
cd notifylog-frontend


Install dependencies:npm install


Run the frontend:npm run dev


Access at http://localhost:3001.

API Documentation
Explore APIs interactively via Swagger UI at http://localhost:3000/api. Test endpoints like /api/notifications, /api/webhooks, and /api/logs with a user-friendly interface.
Contributing
Contributions are welcome! Check CONTRIBUTING.md for guidelines and issues for tasks (good first issue, hacktoberfest). Join our Discord.
License
MIT License. See LICENSE.```
