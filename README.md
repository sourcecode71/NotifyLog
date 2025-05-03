# NotifyLog

![Build Status](https://img.shields.io/github/workflow/status/your-username/notifylog/CI/main)
![License](https://img.shields.io/github/license/your-username/notifylog)
![GitHub Stars](https://img.shields.io/github/stars/your-username/notifylog)

**NotifyLog** is a full-stack Node.js/NestJS microservice built with **clean architecture** and **SOLID principles**, designed for sending email/SMS notifications, logging messages/errors, and managing webhooks. It’s portable, modular, and paired with a Next.js/React frontend dashboard for visualizing notification and error log history. Features a **GraphQL API** for flexible querying.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Clean Architecture](#clean-architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Frontend Setup](#frontend-setup)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features
- Send notifications (email/SMS) with a strategy pattern.
- Centralized logging with Winston and MongoDB transport.
- Webhook subscriptions for real-time event notifications.
- Advanced log filtering and retrieval via GraphQL.
- Next.js/React frontend dashboard for notification and error log history.
- **GraphQL API** for flexible, type-safe queries.
- Extensible and portable for integration into any project.

## Tech Stack
- **Backend**: Node.js, NestJS, GraphQL, Prisma, MongoDB, Winston, TypeScript
- **Frontend**: Next.js, React, Tailwind CSS, React Query
- **Tools**: Prisma, GraphQL Playground, Prettier, ESLint, Docker

## Clean Architecture
**NotifyLog** adheres to **clean architecture** and **SOLID principles**, ensuring modularity, testability, and maintainability. Key layers include:

- **Domain** (`apps/notifylog-api/src/domain/`): Defines interfaces (e.g., `INotificationRepository`, `IWebhookRepository`) for business logic, independent of frameworks (Single Responsibility).
- **Application** (`apps/notifylog-api/src/application/`): Implements business rules via factories (`NotificationFactory`) and strategies (`EmailNotificationStrategy`, `SMSNotificationStrategy`) (Dependency Inversion).
- **Infrastructure** (`apps/notifylog-api/src/infrastructure/`): Handles persistence (`prisma/schema.prisma`) and repositories (`NotificationRepository`, `WebhookRepository`) (Open/Closed).
- **Presentation** (`apps/notifylog-api/src/presentation/`): Exposes GraphQL APIs through resolvers (`NotificationResolver`, `WebhookResolver`, `LogResolver`) (Interface Segregation).

Shared utilities and logging are abstracted into `libs/` for reusability across apps.

## Project Structure
