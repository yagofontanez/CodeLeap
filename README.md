# CodeLeap Network

> A modern social network for developers — built with React, TypeScript & Tailwind CSS.

![CodeLeap Network](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss)
![Zustand](https://img.shields.io/badge/Zustand-5-orange?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite)

---

## About

CodeLeap Network is a full-featured social posting platform where developers can share ideas and connect with others. This project was developed as part of the **CodeLeap frontend technical assessment**, with the goal of going beyond the core requirements — delivering a polished, production-grade interface with attention to UX details, component architecture, and code quality.

---

## Live Demo

🔗 **[codeleap-network.netlify.app](https://codeleap-network.netlify.app)**

---

## Features

### Core

| Feature         | Description                                                               |
| --------------- | ------------------------------------------------------------------------- |
| 🔐 Signup       | Username-based authentication with persistent session via localStorage    |
| 📝 Create Post  | Create posts with title and content, submitted to the shared API          |
| 📖 Read Posts   | Fetch and display all posts from the CodeLeap API in real time            |
| ✏️ Edit Post    | Edit your own posts via a modal — only visible on posts you own           |
| 🗑️ Delete Post  | Delete your own posts with a confirmation modal                           |
| 🔄 Auto Refresh | Post list updates automatically after every create, edit or delete action |

### Bonus

| Feature                | Description                                                                    |
| ---------------------- | ------------------------------------------------------------------------------ |
| ♾️ Infinite Scroll     | Posts load automatically as you scroll down using the IntersectionObserver API |
| 🔍 Search & Filter     | Filter posts by title, content or username in real time                        |
| 🔃 Sort Posts          | Sort posts from newest to oldest or oldest to newest                           |
| 🦴 Skeleton Loading    | Animated skeleton cards while posts are loading                                |
| 🍞 Toast Notifications | Success and error feedback toasts on every action                              |
| 📱 Responsive Design   | Fully responsive — works on mobile, tablet and desktop                         |
| 🖱️ Scroll to Top       | Floating button to scroll back to the top when scrolling down                  |
| 🔦 Search Highlight    | Searched terms are highlighted in yellow across post titles and content        |
| 👤 Copy Username       | Click any username to copy it to clipboard with visual feedback                |
| 🚪 Logout              | Clear session and return to the signup screen                                  |
| 🎨 Animations          | Smooth page load animations with staggered reveals on post cards               |
| 🌐 Open Graph          | Meta tags for rich link previews when sharing the URL                          |

---

## Tech Stack

| Layer            | Technology                                                      |
| ---------------- | --------------------------------------------------------------- |
| Framework        | [React 18](https://react.dev/)                                  |
| Language         | [TypeScript 5](https://www.typescriptlang.org/)                 |
| Styling          | [Tailwind CSS 3](https://tailwindcss.com/)                      |
| State Management | [Zustand](https://zustand-demo.pmnd.rs/)                        |
| HTTP Client      | [Axios](https://axios-http.com/)                                |
| Build Tool       | [Vite](https://vitejs.dev/)                                     |
| Fonts            | [DM Sans + DM Mono](https://fonts.google.com/) via Google Fonts |
| Deployment       | [Netlify](https://app.netlify.com/)                             |

---

## Project Structure

```
src/
├── components/
│   ├── SignupModal.tsx        # Initial username signup screen
│   ├── Header.tsx             # Sticky top header with username, logout and post count
│   ├── CreateForm.tsx         # Form to create new posts
│   ├── PostCard.tsx           # Individual post card with edit/delete actions
│   ├── DeleteModal.tsx        # Confirmation modal for post deletion
│   ├── EditModal.tsx          # Modal form to edit existing posts
│   ├── FilterBar.tsx          # Search input and sort toggle
│   ├── InfiniteScrollTrigger.tsx  # IntersectionObserver-based scroll trigger
│   ├── HighlightText.tsx      # Highlights matched search terms in text
│   ├── Toast.tsx              # Animated toast notification component
│   ├── ScrollToTop.tsx        # Floating scroll-to-top button
│   ├── LoadingSpinner.tsx     # Skeleton loading state
│   ├── SkeletonCard.tsx       # Individual skeleton card
│   ├── EmptyState.tsx         # Empty state when no posts exist
│   └── ErrorState.tsx         # Error state with retry button
│
├── pages/
│   └── MainPage.tsx           # Main feed page — composes all components
│
├── services/
│   ├── api.ts                 # Axios instance with base URL from env
│   └── usePosts.ts            # Custom hook for all post CRUD + pagination
│
├── store/
│   ├── useAuthStore.ts        # Zustand store for username (persisted)
│   └── useToastStore.ts       # Zustand store for toast notifications
│
├── types/
│   └── post.ts                # TypeScript interfaces for Post and PostsResponse
│
├── App.tsx                    # Root component — handles auth gate
├── main.tsx                   # Entry point
└── index.css                  # Tailwind directives + global styles
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yagofontanez/CodeLeap.git

# Navigate to project folder
cd codeleap-network

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## Environment Variables

Create a `.env` file in the root of the project:

```env
VITE_API_URL=https://dev.codeleap.co.uk/careers/
```

> ⚠️ In Vite, all environment variables exposed to the client must be prefixed with `VITE_`.

A `.env.example` file is included in the repository for reference.

---

## API Reference

Base URL: `https://dev.codeleap.co.uk/careers/`

| Method   | Endpoint | Description                                        |
| -------- | -------- | -------------------------------------------------- |
| `GET`    | `/`      | List all posts (supports `?limit=` and `?offset=`) |
| `POST`   | `/`      | Create a new post                                  |
| `PATCH`  | `/{id}/` | Update a post by ID                                |
| `DELETE` | `/{id}/` | Delete a post by ID                                |

### Post Object

```json
{
  "id": 1,
  "username": "johndoe",
  "created_datetime": "2024-01-01T00:00:00.000000Z",
  "title": "My first post",
  "content": "Hello CodeLeap network!"
}
```

### Create / Edit Payload

```json
{
  "username": "johndoe",
  "title": "My first post",
  "content": "Hello CodeLeap network!"
}
```

> ⚠️ **Note:** All posts are publicly visible to other users of the API. This is a shared test environment.

---

## Architecture Decisions

- **Zustand over Context API** — simpler, less boilerplate, and supports middleware like `persist` out of the box.
- **Custom `usePosts` hook** — encapsulates all API logic and state, keeping components clean and focused on presentation.
- **Component decomposition** — each UI state (loading, error, empty) is its own component, making the main page easy to read and maintain.
- **IntersectionObserver for infinite scroll** — no third-party library needed, native browser API with great performance.
- **`useMemo` for filtering/sorting** — avoids recomputing the filtered list on every render, only recalculates when posts, search or sort changes.

---

## License

This project was built as part of the [CodeLeap](https://www.codeleap.co.uk/) frontend technical assessment.
The requirements asked for a simple CRUD application — I used that as a foundation to demonstrate clean architecture, thoughtful component decomposition, and a refined UI that goes beyond the spec.
