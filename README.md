Here’s an updated `README.md` with a clean **Docker section** and a **concise project structure**. I’ve also updated `yourusername` to `mostafiz51`.

---

### ✅ Suggested Changes Summary:

* **Added:** Docker section with clear usage instructions.
* **Updated:** Project structure (trimmed to show only major folders/files).
* **Fixed:** Badges and links to reflect your username (`mostafiz51`).

---

### ✅ Updated README Snippet

````markdown
# 📬 NotifyLog

> A microservice-based Notification Logger built with NestJS and Next.js to send, track, and analyze Email, SMS, and Webhook messages.

![CI](https://img.shields.io/github/actions/workflow/status/mostafiz51/notifylog/ci.yml?branch=main)
![License](https://img.shields.io/github/license/mostafiz51/notifylog)
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

## ⚙️ Setup & Installation

### 🔧 Prerequisites

- Node.js ≥ 18.x
- Yarn or npm
- MongoDB
- Docker (optional)

```bash
# Clone repo
git clone https://github.com/mostafiz51/notifylog.git && cd notifylog

# Install dependencies
yarn install

# Setup environment
cp .env.example .env
# Fill required variables (Mongo URI, API keys, etc.)

# Start backend
yarn start:dev:api

# Start frontend
yarn start:dev:ui
````

---

## 🐳 Run with Docker

```bash
# Build and run containers
docker-compose up --build
```

> Ensure you’ve configured `.env` file correctly before running.

To push the image to Docker Hub (replace `mostafiz51/notifylog` with your repo):

```bash
# Tag image
docker tag notifylog:dev mostafiz51/notifylog:latest

# Login and push
docker login
docker push mostafiz51/notifylog:latest
```

---

## 📂 Project Structure (Simplified)

```bash
notifylog/
├── src/
│   ├── config/               # Shared enums/config
│   ├── logger/               # Notification core logic
│   ├── common/               # Common utilities & pipes
│   ├── app.module.ts
│   ├── main.ts
├── ui/                       # Next.js frontend dashboard
├── docker-compose.yml
├── .env.example
├── package.json
```

---

## 🔬 GraphQL Example

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
yarn test
yarn test:cov
```

🧪 [View Jest Test Report](https://sourcecode71.github.io/NotifyLog)

---

## 📈 Roadmap

* WebSocket real-time log stream
* Retry failed webhooks
* Admin dashboard analytics
* SMTP fallback support
* Mobile-friendly UI

---

## 🤝 Contributing

1. Fork the repo
2. Create branch: `git checkout -b feat/feature-name`
3. Commit: `git commit -am "add: new feature"`
4. Push: `git push origin feat/feature-name`
5. Open PR

---

## 🐛 Issue Templates

Available in `.github/ISSUE_TEMPLATE`:

* 🐞 Bug Report
* ✨ Feature Request
* 📚 Documentation Update
* 🆕 Good First Issue

---

## 🛡 License

MIT License

---

## 🙌 Credits

Thanks to all contributors! 💖

```

---

Let me know if you'd like to add Docker Hub badges, auto-publish GitHub Actions, or CI/CD steps!
```
