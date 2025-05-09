# 📬 NotifyLog

> A microservice-based Notification Logger built with NestJS and Next.js to send, track, and analyze Email, SMS, and Webhook messages.

![CI](https://img.shields.io/github/actions/workflow/status/yourusername/notifylog/ci.yml?branch=main)
![License](https://img.shields.io/github/license/yourusername/notifylog)
![Node.js](https://img.shields.io/badge/node-%3E=18.x-green)
![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)

---

## 🌟 Highlights

- 🚀 Microservice architecture using **NestJS**
- 🌐 Clean and powerful **GraphQL API**
- ✉️ Supports Email, SMS, and Webhook notifications
- 📦 Centralized logging using **Winston** + **MongoDB**
- 🎯 Extensible via plug-and-play notification providers
- 🧪 Tested with **Jest** and designed for scalability
- 💻 Lightweight **Next.js** frontend dashboard

---

## 📖 Overview

**NotifyLog** is a robust, plug-and-play Node.js-based notification microservice designed to handle multi-channel communication like Email, SMS, and Webhooks, all with centralized logging and GraphQL API support. Built using **NestJS** and **Next.js**, it follows clean architecture principles and is deployable in a distributed, containerized environment.

Use NotifyLog as:
- A backend service for sending and tracking messages
- A standalone logger for notification events
- An integration-ready module in any SaaS or enterprise app

---
Sure! Here's a clean and properly formatted `README.md` file that includes all the content you provided:

---

```markdown
# NotifyLog 🚨

A notification management system with logging, monitoring, and multi-channel delivery support.

---

## ⚙️ Setup & Installation

### 🔧 Prerequisites

- **Node.js** ≥ 18.x
- **Yarn** or **npm**
- **MongoDB** or **MongoDB Atlas**
- **Docker** (optional)

---

## 🚀 Run Locally

```bash
# Clone repo
git clone https://github.com/yourusername/notifylog.git && cd notifylog

# Install dependencies
yarn install

# Setup environment variables
cp .env.example .env
# Fill in your email/SMS API keys, Mongo URI, etc.

# Start backend
yarn start:dev:api

# Start frontend
yarn start:dev:ui
```

---

## 🐳 Run with Docker

```bash
docker-compose up --build
```

---

### Projects Test
- **[NotifyLog](https://github.com/sourcecode71/NotifyLog)**: Notification service built with NestJS. View my [Jest Test Report](https://sourcecode71.github.io/NotifyLog) for automated test results!

## 📌 Features

✅ GraphQL API to manage notifications, logs, and subscriptions  
📧 Email Module (send emails using SendGrid/Mailgun)  
📲 SMS Module (Twilio integration)  
🔔 Webhook Support (event-based triggers to external services)  
📝 MongoDB Logging with Winston (request/response/errors)  
🧩 Extensible Providers (add your own integrations easily)  
💻 Next.js UI for monitoring and manual message dispatch  

---

## 🔬 Example GraphQL Query

```graphql
mutation SendEmail {
  sendNotification(input: {
    type: "EMAIL",
    to: "example@domain.com",
    subject: "Welcome!",
    message: "Hello from NotifyLog!"
  }) {
    success
    messageId
  }
}
```

---

## 🧪 Testing

```bash
# Run all tests
yarn test

# Run coverage
yarn test:cov
```

---

## 📈 Roadmap

- WebSocket-based real-time logs  
- Retry strategy for failed webhook calls  
- Admin dashboard analytics  
- SMTP transport fallback  
- Mobile-friendly UI  

---

## 🤝 Contributing

We welcome contributions of all kinds!

1. Fork the repo
2. Create your feature branch: `git checkout -b feat/amazing-feature`
3. Commit your changes: `git commit -am 'Add amazing feature'`
4. Push to the branch: `git push origin feat/amazing-feature`
5. Open a pull request

For more info, see [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 🐛 Issue Templates

Need to report a bug or request a feature? Use the templates in `.github/ISSUE_TEMPLATE`:

- 🐞 Bug Report  
- ✨ Feature Request  
- 📚 Documentation Update  
- 🆕 Good First Issue  

---

## 🛡 License

This project is licensed under the MIT License.

---

## 📣 Contact & Credits

Maintained by **Your Name** – feel free to connect on [LinkedIn] or [Twitter].

Special thanks to all contributors 💖
```

---

Let me know if you'd like this customized with your actual GitHub username, social links, or any branding tweaks!

## 📂 Project Structure

```bash
notifylog/
├── apps/
│   ├── notifylog-api/
│   │   ├── src/
│   │   │   ├── config/
│   │   │   │   └── notification.config.ts  # Shared enums (NotificationType, NotificationChannel)
│   │   │   ├── common/
│   │   │   │   └── validation/
│   │   │   │       └── joi-validation.pipe.ts
│   │   │   ├── logger/
│   │   │   │   ├── domain/
│   │   │   │   ├── infrastructure/
│   │   │   │   ├── presentation/
│   │   │   │   └── application/
│   │   │   ├── notification/
│   │   │   │   ├── application/
│   │   │   │   │   ├── factories/
│   │   │   │   │   │   └── notification.factory.ts
│   │   │   │   │   └── strategies/
│   │   │   │   │       ├── email-notification.strategy.ts
│   │   │   │   │       └── sms-notification.strategy.ts
│   │   │   │   ├── domain/
│   │   │   │   │   ├── entities/
│   │   │   │   │   │   └── notification.entity.ts
│   │   │   │   │   ├── errors/
│   │   │   │   │   │   └── notification.error.ts  # Example error class
│   │   │   │   │   └── interfaces/
│   │   │   │   │       ├── notification-repository.interface.ts
│   │   │   │   │       ├── notification-strategy.interface.ts
│   │   │   │   │       └── webhook-repository.interface.ts
│   │   │   │   ├── infrastructure/
│   │   │   │   │   ├── repositories/
│   │   │   │   │   │   ├── notification.repository.ts
│   │   │   │   │   │   └── webhook.repository.ts
│   │   │   │   │   └── persistence/
│   │   │   │   │       ├── mongodb/
│   │   │   │   │       │   └── notification.schema.ts
│   │   │   │   │       └── postgresql/
│   │   │   │   │           └── webhook.schema.ts  # Example for PostgreSQL
│   │   │   │   ├── presentation/
│   │   │   │   │   ├── controllers/
│   │   │   │   │   │   ├── notification.controller.ts
│   │   │   │   │   │   └── webhook.controller.ts
│   │   │   │   │   └── dto/
│   │   │   │   │       ├── send-notification.dto.ts
│   │   │   │   │       └── create-webhook.dto.ts
│   │   │   ├── app.module.ts
│   │   │   ├── main.ts
│   │   │   └── services/
│   │   │       └── log.service.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── .env.example
