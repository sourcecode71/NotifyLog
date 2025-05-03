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

notifylog/ ├── apps/ │ ├── notifylog-api/ # NestJS microservice (GraphQL + Notification logic) │ │ ├── src/ │ │ │ ├── application/ │ │ │ │ ├── factories/ │ │ │ │ │ ├── notification.factory.ts │ │ │ │ ├── strategies/ │ │ │ │ │ ├── email-notification.strategy.ts │ │ │ │ │ ├── sms-notification.strategy.ts │ │ │ ├── domain/ │ │ │ │ ├── interfaces/ │ │ │ │ │ ├── notification-repository.interface.ts │ │ │ │ │ ├── webhook-repository.interface.ts │ │ │ ├── infrastructure/ │ │ │ │ ├── repositories/ │ │ │ │ │ ├── notification.repository.ts │ │ │ │ │ ├── webhook.repository.ts │ │ │ ├── presentation/ │ │ │ │ ├── resolvers/ │ │ │ │ │ ├── notification.resolver.ts │ │ │ │ │ ├── webhook.resolver.ts │ │ │ │ │ ├── log.resolver.ts │ │ │ ├── dto/ │ │ │ │ ├── notification.dto.ts │ │ │ ├── services/ │ │ │ │ ├── log.service.ts │ │ │ ├── app.module.ts │ │ │ ├── main.ts │ │ ├── package.json │ │ ├── tsconfig.json │ │ ├── .env.example │ └── notifylog-ui/ # Next.js frontend dashboard │ ├── src/ │ │ ├── app/ │ │ │ ├── page.tsx │ │ │ ├── notifications/ │ │ │ │ ├── page.tsx │ │ │ ├── errors/ │ │ │ │ ├── page.tsx │ │ │ ├── layout.tsx │ │ │ ├── globals.css │ │ ├── components/ │ │ │ ├── Header.tsx │ │ │ ├── NotificationTable.tsx │ │ │ ├── ErrorTable.tsx │ │ ├── lib/ │ │ │ ├── api.ts │ │ │ ├── types.ts │ ├── public/ │ ├── package.json │ ├── tsconfig.json │ ├── next.config.js ├── libs/ │ ├── logger/ # Winston logger (MongoDB transport) │ │ ├── src/ │ │ │ ├── interfaces/ │ │ │ │ ├── log-repository.interface.ts │ │ │ ├── persistence/ │ │ │ │ ├── logger.schema.ts │ │ │ ├── repositories/ │ │ │ │ ├── log.repository.ts │ │ │ ├── services/ │ │ │ │ ├── logger.service.file.ts │ │ │ │ ├── logger.service.db.ts │ │ ├── package.json │ │ ├── tsconfig.json │ └── utils/ # Shared helpers, interceptors, constants │ ├── src/ │ │ ├── helpers/ │ │ │ ├── string.utils.ts │ │ │ ├── validation.utils.ts │ │ ├── interceptors/ │ │ │ ├── logging.interceptor.ts │ │ ├── constants/ │ │ │ ├── app.constants.ts │ ├── package.json │ ├── tsconfig.json ├── prisma/ # Prisma ORM config & schema │ ├── schema.prisma │ ├── migrations/ ├── docker/ # Docker & Docker Compose files │ ├── Dockerfile.api │ ├── Dockerfile.ui │ ├── docker-compose.yml ├── .github/ # Issue templates & GitHub Actions │ ├── ISSUE_TEMPLATE/ │ │ ├── bug_report.md │ │ ├── feature_request.md │ ├── workflows/ │ │ ├── ci.yml ├── README.md ├── CONTRIBUTING.md ├── CODE_OF_CONDUCT.md ├── LICENSE
