
```markdown
# 🏋️‍♂️ FitGym – Gym Management Web App

FitGym is a **demo gym management application** built with **Angular 16**, designed to demonstrate a full-featured front-end system integrated with a mock REST API powered by **JSON Server**, and **Firebase Authentication** for secure login and registration.

It allows managing gym members, coaches, classes, football court reservations, and subscriptions — all from an intuitive dashboard.

---

## 🚀 Features

| Module | Description |
|--------|--------------|
| 🧍‍♂️ **Members** | Add, edit, delete, and view members with full profile data (weight, height, goals, preferred workout time, etc.). |
| 🧑‍🏫 **Coaches** | Manage coach profiles, specialties, and experience. Members can also book **coach sessions**. |
| 🧘‍♀️ **Classes** | Create and list gym classes with category, time, price, and assigned coach. |
| 💳 **Subscriptions** | Track active subscriptions, duration, payment method, and price, with a visual summary dashboard. |
| ⚽ **Football Courts** | Reserve football courts by time and date. View member-specific reservations. |
| 🔒 **Authentication** | Login and Register using **Firebase Authentication** (email/password-based). |
| 📊 **Dashboard** | Interactive overview of members, subscriptions, and reservations. |

---

## 🧩 Architecture Overview

FitGym follows a **modular Angular architecture** separating concerns into feature-based modules and services:

```

src/
├── app/
│   ├── components/            # Reusable UI components
│   ├── models/                # TypeScript interfaces for data models
│   ├── services/              # REST API services (MemberService, CoachService, etc.)
│   ├── pages/                 # Core pages (Dashboard, Login, Register, etc.)
│   ├── dialogs/               # Angular Material Dialogs for CRUD and view details
│   ├── app-routing.module.ts  # Route configuration
│   ├── app.module.ts          # Root module
│   └── app.component.*        # Entry component
├── assets/                    # Static assets (images, icons)
└── environments/              # Environment configs (Firebase, API base URLs)

````

### 🔗 Data Flow
- **Frontend** (Angular Material + NgModel + HttpClient)  
  ⬇️  
- **Mock Backend** (`json-server`) reading from `db.json`  
  ⬇️  
- **Firebase** for user authentication and hosting

---

## ⚙️ Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend Framework** | Angular 16 |
| **UI Library** | Angular Material |
| **Authentication** | Firebase Auth |
| **Database / API** | JSON Server (`db.json`) |
| **Language** | TypeScript |
| **Hosting** | Firebase Hosting |

---

## 🧰 Prerequisites

- [Node.js](https://nodejs.org/en/) (v16+)
- npm
- Angular CLI
- Firebase project (for Authentication + Hosting)

---

## 🛠️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/fitgym.git
cd fitgym
````

### 2. Install dependencies

```bash
npm install
```

### 3. Start the mock REST API

```bash
npm run json-server
```

Server runs at: `http://localhost:3000`
(Default endpoints: `/members`, `/subscriptions`, `/football-courts`, `/coaches`, `/gym-classes`)

### 4. Run the Angular app

```bash
npm start
```

Navigate to: `http://localhost:4200`

---

## 🧑‍💻 Development

Generate new components, services, or modules using Angular CLI:

```bash
ng generate component component-name
ng generate service service-name
```

---

## 🧪 Testing

Run unit tests with:

```bash
npm test
```

Run e2e tests with:

```bash
ng e2e
```

---

## 🧱 Build

Create a production build:

```bash
npm run build
```

Artifacts will be stored in the `dist/` folder.

---

## ☁️ Deployment

FitGym is hosted on **Firebase Hosting**.

To deploy:

```bash
npm run build
firebase deploy
```

---

## 🧠 Project Structure (Key Models)

| Model           | Description                                                     |
| --------------- | --------------------------------------------------------------- |
| `Member`        | Represents a gym member with personal and fitness data.         |
| `Subscription`  | Tracks membership plans and payments.                           |
| `Coach`         | Contains coach details and specialties.                         |
| `CoachSession`  | Represents individual sessions between members and coaches.     |
| `GymClass`      | Represents gym classes with category, time, and assigned coach. |
| `FootballCourt` | Defines rentable courts and associated reservations.            |
| `Reservation`   | Stores member reservations for courts.                          |

---

## 🧩 Example Use Case

1. User registers with Firebase.
2. Admin adds gym classes and coaches.
3. Member subscribes to a plan and books a football court.
4. Dashboard updates to reflect new member activity.

---

## 🪄 UI Preview

> Angular Material dialogs and cards are used across the app for a clean and responsive interface.

* Login & Register screens
* Member dashboard
* Subscription & court reservation modals
* Profile edit dialog


