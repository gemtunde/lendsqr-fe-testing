Lendsqr Frontend Engineering Assessment
A frontend engineering assessment project built with Next.js, TypeScript, SCSS Modules, and shadcn UI. The app demonstrates user authentication, dashboard layout, user management, and detailed user views.

🔗 Live Demo - https://gemtunde-elesho-lendsqr-fe-testing.vercel.app

🚀 Tech Stack
Next.js (App Router)

TypeScript

SCSS Modules (modular styling)

shadcn UI (for accessible, reusable UI components)

Axios (for HTTP requests)

Context API (for state management)

LocalStorage (for persisting user data)

Modular Component Structure (scalable and maintainable)

📁 Folder Structure Highlights

/app

/login

/dashboard

/users

/user-details

/components

/ui (reusable components using shadcn)

/shared

/context

/hooks

/styles

/utils


🧭 App Navigation Guide
The app consists of 4 main pages:

1. 🔐 Login Page
   Route: /login

Enter any credentials to simulate login (authentication is mocked).

On successful login, you're redirected to the dashboard.

Login response is stored using Context API.

2. 🧭 Dashboard Page
   Route: /dashboard

Displays layout with sidebar navigation.

Acts as the landing page post-login.

3. 👥 Users Page
   Route: /users

Fetches a list of 500 users from a mock API using Axios.

User data is stored in localStorage for persistence.

Features include search and filter options using reusable components.

4. 📄 User Details Page
   Route: /user-details/:userId

Fetches user data from localStorage using the ID.

Displays detailed information in a well-structured layout with tabs (General Details, Documents, Bank Details, etc.).

🧪 Features
✅ Mocked login flow with state management via Context API

✅ Responsive layout with modular SCSS styling

✅ Reusable UI components using shadcn

✅ Efficient data fetching and caching with Axios, Tanstack/Query and localStorage

✅ Structured and scalable folder architecture

🛠️ Running Locally

git clone https://github.com/your-username/lendsqr-fe-assessment.git
cd lendsqr-fe-assessment

# Install dependencies

npm install

# Run the development server

npm run dev

# Open in browser

http://localhost:3000
📌 Notes
This is a demo project for an interview task and uses mocked authentication.

All users are fetched once and persisted to localStorage to simulate backend querying.

Built with scalability and modularity in mind using modern frontend best practices.
