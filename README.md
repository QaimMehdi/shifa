# Shifa – AI-Powered Smart Healthcare Platform

**S.H.I.F.A** – Smart Healthcare, Intelligent Forecasting & Assistance

A web-based AI healthcare platform designed to assist users with symptom checking, drug safety, emergency guidance, and smart hospital recommendations. Shifa aims to improve healthcare accessibility, safety, and preventive care, especially in regions with doctor shortages and fragmented healthcare systems.

---

## Overview

Shifa’s long-term vision is to become a **B2B AI SaaS** used by healthcare apps (e.g. Oladoc, Marham). Initially it is **B2C**, allowing direct user interaction. The platform is **assistive AI only**—it does not replace doctors; it focuses on prevention, emergency alerts, and guidance.

---

## Core Features

| Feature | Description |
|--------|-------------|
| **AI Symptom Intelligence Engine** | Users enter symptoms via chat or form; AI suggests possible diseases with risk levels and preventive guidance. |
| **Predictive Health Risk Forecaster** | ML-based analysis of user data to predict future disease risks (e.g. diabetes, heart conditions). |
| **Smart Emergency Response Advisor** | Detects critical symptoms, sends emergency alerts, and recommends nearest suitable hospitals and ambulances. |
| **Medical Drug Conflict Detector** | Users enter medicines; AI detects unsafe interactions, optimal timings, and dosages. |
| **Location-Based Healthcare Priority Finder** | Recommends best hospital by distance, specialization, availability, and emergency capability; provides nearest ambulance contact. |

---

## Secondary Features / Future Enhancements

- Multilingual AI support (English, Urdu, Pashto)
- AI chatbot interface for all core modules
- Integration with wearables for vitals tracking
- Video consultation in emergencies
- Nurse/hospital urgent requests (B2B expansion)

---

## Target Users

- **Primary:** Urban families, tech-savvy individuals, elderly caregivers  
- **Secondary:** Rural users (via multilingual support)  
- **Long-term:** Hospitals, clinics, telemedicine platforms (B2B SaaS)

---

## Vision & Mission

**Vision:** To become a trusted digital healthcare platform providing AI-assisted health guidance, preventive care insights, and emergency decision support, bridging gaps in the healthcare ecosystem.

**Mission:**

- Deliver secure, verified health information and services  
- Empower users with AI-assisted decision-making  
- Ensure data safety and compliance with local regulations  
- Build a scalable B2B AI SaaS platform for hospitals and healthcare apps  

---

## Problem Statement

- Lack of centralized, verified home healthcare services  
- Difficulty in choosing hospitals or responding to emergencies  
- Unawareness of drug interactions and preventive healthcare  
- Users relying on unreliable internet searches or self-medication  

---

## Expected Outcomes

- Functional AI-powered health assistant  
- Verified nurse and hospital guidance  
- Preventive healthcare and emergency decision support  
- Scalable system for B2B SaaS expansion  

---

## Technology Stack

### Current (Web)

| Layer | Technology |
|-------|------------|
| **Frontend** | React, TypeScript, Vite |
| **UI** | Tailwind CSS, shadcn/ui, Framer Motion |
| **Routing** | React Router |
| **State / Data** | TanStack Query, React Hook Form, Zod |

### Planned / Future

| Layer | Technology |
|-------|------------|
| **Frontend (mobile)** | Flutter / React Native |
| **Backend** | Node.js + Express or Python (Flask/Django/FastAPI) |
| **Database** | MongoDB / PostgreSQL |
| **AI/ML** | Scikit-Learn, TensorFlow, or Hugging Face models |
| **APIs** | Maps & location, AI symptom models, medicine database |
| **Security** | JWT authentication, HTTPS, encrypted health data |

---

## Getting Started

### Prerequisites

- Node.js (LTS recommended) – [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- npm or bun

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/QaimMehdi/shifa.git
cd shifa

# Install dependencies
npm install

# Start development server
npm run dev
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |

---

## Project Structure (High Level)

```
shifafyp/
├── src/
│   ├── components/     # UI components, sections, nearby-care
│   ├── pages/          # Index, Chat, NearbyCare, SignIn, SignUp, etc.
│   ├── hooks/          # Custom hooks
│   ├── lib/            # Utilities
│   └── assets/         # Images and static assets
├── public/
├── index.html
├── package.json
└── README.md
```

---

## Disclaimer

Shifa is an **assistive AI health platform**. It does not replace professional medical advice, diagnosis, or treatment. Always consult qualified healthcare providers for medical decisions.

---

## License

Private – Final Year Project (FYP).
