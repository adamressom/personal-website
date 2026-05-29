# Personal Website

🌐 **A modern personal portfolio website built with Next.js, TypeScript, and Convex**

This repository contains my personal website and portfolio. It highlights my background, projects, skills, experience, and contact information through a clean, responsive web interface. The site is built with a modern full-stack setup and is ready for deployment on Vercel.

---

## Tech Stack

- **Next.js**: React framework for building fast, production-ready web applications
- **TypeScript**: Strongly typed JavaScript for safer and more maintainable code
- **Convex**: Backend platform for data storage and server functions
- **React**: Component-based UI development
- **Tailwind CSS**: Utility-first styling for responsive layouts
- **Vercel**: Deployment platform for hosting the website

---

## Features

- **Responsive Portfolio Design**  
  Works across desktop, tablet, and mobile screens.

- **Project Showcase**  
  Highlights selected projects with descriptions, technologies, and links.

- **About Section**  
  Presents background information, interests, and professional goals.

- **Contact Section**  
  Provides a simple way for visitors to connect.

- **Modern Frontend Structure**  
  Uses reusable components, organized app routing, and clean styling.

- **Convex Integration**  
  Includes backend support for dynamic features and server-side functionality.

---

## Getting Started

### Prerequisites

Before running this project, make sure you have:

- Node.js installed
- npm installed
- A Convex account or project setup, if using backend features

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/adamressom/personal-website.git
cd personal-website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root.

You can use `.env.example` as a reference:

```bash
cp .env.example .env.local
```

Then fill in the required environment variables for your local setup.

---

## Run Locally

Start the development server:

```bash
npm run dev
```

Then open the website in your browser:

```plaintext
http://localhost:3000
```

---

## Project Structure

```plaintext
personal-website/
├── app/                 # Next.js app routes and pages
├── components/          # Reusable React components
├── convex/              # Convex backend functions and schema
├── lib/                 # Utility functions and shared logic
├── public/              # Static assets and images
├── .env.example         # Example environment variables
├── .gitignore           # Files ignored by Git
├── next.config.ts       # Next.js configuration
├── package.json         # Project scripts and dependencies
├── package-lock.json    # Dependency lock file
├── postcss.config.mjs   # PostCSS configuration
├── eslint.config.mjs    # ESLint configuration
├── tsconfig.json        # TypeScript configuration
└── README.md            # Project documentation
```

---

## Available Scripts

### Start development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Start production server

```bash
npm start
```

### Run linting

```bash
npm run lint
```

---

## Deployment

This project is ready to be deployed on Vercel.

To deploy:

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. Add the required environment variables.
4. Deploy the project.

---

## Security Note

Do not commit your `.env.local` file or private API keys to GitHub.

Make sure sensitive files are included in `.gitignore`:

```gitignore
.env
.env.local
.env*.local
```

---

## Author

Created by [Adam Ressom](https://github.com/adamressom)
