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

## 📂 Project Structure

```bash
notifylog/
├── apps/
│   ├── notifylog-api/
│   │   ├── src/
│   │   │   ├── application/
│   │   │   │   ├── factories/
│   │   │   │   │   └── notification.factory.ts
│   │   │   │   └── strategies/
│   │   │   │       ├── email-notification.strategy.ts
│   │   │   │       └── sms-notification.strategy.ts
│   │   │   ├── domain/
│   │   │   │   └── interfaces/
│   │   │   │       ├── notification-repository.interface.ts
│   │   │   │       └── webhook-repository.interface.ts
│   │   │   ├── infrastructure/
│   │   │   │   └── repositories/
│   │   │   │       ├── notification.repository.ts
│   │   │   │       └── webhook.repository.ts
│   │   │   ├── presentation/
│   │   │   │   └── resolvers/
│   │   │   │       ├── notification.resolver.ts
│   │   │   │       ├── webhook.resolver.ts
│   │   │   │       └── log.resolver.ts
│   │   │   ├── dto/
│   │   │   │   └── notification.dto.ts
│   │   │   ├── services/
│   │   │   │   └── log.service.ts
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── .env.example
│   └── notifylog-ui/
│       ├── src/
│       │   ├── app/
│       │   │   ├── page.tsx
│       │   │   ├── notifications/
│       │   │   │   └── page.tsx
│       │   │   ├── errors/
│       │   │   │   └── page.tsx
│       │   │   ├── layout.tsx
│       │   │   └── globals.css
│       │   ├── components/
│       │   │   ├── Header.tsx
│       │   │   ├── NotificationTable.tsx
│       │   │   └── ErrorTable.tsx
│       │   └── lib/
│       │       ├── api.ts
│       │       └── types.ts
│       ├── public/
│       ├── package.json
│       └── next.config.js
├── libs/
│   ├── logger/
│   │   ├── src/
│   │   │   ├── interfaces/
│   │   │   │   └── log-repository.interface.ts
│   │   │   ├── persistence/
│   │   │   │   └── logger.schema.ts
│   │   │   ├── repositories/
│   │   │   │   └── log.repository.ts
│   │   │   └── services/
│   │   │       ├── logger.service.file.ts
│   │   │       └── logger.service.db.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── utils/
│       ├── src/
│       │   ├── helpers/
│       │   │   ├── string.utils.ts
│       │   │   └── validation.utils.ts
│       │   ├── interceptors/
│       │   │   └── logging.interceptor.ts
│       │   └── constants/
│       │       └── app.constants.ts
│       ├── package.json
│       └── tsconfig.json
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── docker/
│   ├── Dockerfile.api
│   ├── Dockerfile.ui
│   └── docker-compose.yml
├── .github/
│   ├── ISSUE\_TEMPLATE/
│   └── workflows/
│       └── ci.yml
├── README.md
├── CONTRIBUTING.md
├── CODE\_OF\_CONDUCT.md
├── LICENSE
