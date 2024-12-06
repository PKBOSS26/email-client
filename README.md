# Email Client App

This is an email client application built using **React**, **TypeScript**, **Redux**, and **TailwindCSS**. The app allows users to view a list of emails, view email details, mark emails as favorites, and filter emails based on their status (read, unread, or favorite). The app is styled to look similar to popular email clients like Outlook.

## Features
- **Email List View**: Shows all the emails with their subject, from, a short description, and date.
- **Email Detail View**: Clicking on an email shows its body, including subject, body, and timestamp.
- **Mark as Favorite**: Users can mark emails as favorites.
- **Filtering**: Emails can be filtered by favorite status, read status, or unread status.
- **Theme Toggle**: Users can toggle between light and dark themes.
- **Pagination**: Emails are paginated to ensure faster loading for large datasets.

## Tech Stack
- **Frontend**: React, TypeScript, Redux, TailwindCSS
- **Backend (Mocked API)**: API for fetching emails and their details.
- **Docker**: For development and production environments using Docker.

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js (version 16 or higher recommended)
- npm or yarn
- Docker (if you want to use Docker)

### Setup the Project Locally
1. Clone the repository:
2. Install Dependencies:
    ```bash
    npm install
    #or using yarn
    yarn install
3. Run the development server:
    ```bash
    npm start 
-This will run the app at http://localhost:3000.

## Docker Usage
1. To run the development environment using Docker Compose, use the following command:
    ```bash
    docker-compose -f docker-compose.dev.yml up --build
2. Production Setup
    ```bash
    docker-compose -f docker-compose.prod.yml up --build
## Dockerfile Details
  **Dockerfile.dev**
    - Used for local development with live-reloading. It installs all dependencies, including development dependencies, and starts the app in development mode.

  **Dockerfile.prod**
    - Used for building and serving the app in production mode. It installs only production dependencies, builds the app, and serves it via Nginx.

  **docker-compose.dev.yml**
    - Sets up the development environment with live-reloading and mounts local files.

  **docker-compose.prod.yml**
    - Sets up the production environment and serves the app using Nginx.