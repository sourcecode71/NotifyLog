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
│   ├── notifylog-api/     # NestJS microservice (GraphQL + Notification logic)
│   └── notifylog-ui/      # Next.js frontend dashboard
├── libs/
│   ├── logger/            # Winston logger (MongoDB transport)
│   └── utils/             # Shared helpers, interceptors, constants
├── prisma/                # Prisma ORM config & schema
├── docker/                # Docker & Docker Compose files
├── .github/               # Issue templates & GitHub Actions
└── README.md
