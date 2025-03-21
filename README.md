# Authentication System with Next.js & Node.js

A secure authentication flow using Auth0 for frontend authentication and Node.js backend for token validation and email services.

## Features

- Auth0 authentication in Next.js frontend
- Token validation in Node.js backend
- Email notification with Nodemailer
- Secure JWT handling

## Prerequisites

- Node.js v18+
- npm v9+
- Auth0 account
- Email service (Gmail/Mailtrap/SendGrid)

## Setup Instructions

### 1. Auth0 Configuration

1. Create new application in Auth0 Dashboard
   - **Application Type**: Single Page Application
2. Configure settings:
   - **Allowed Callback URLs**: `http://localhost:3000/*`
   - **Allowed Web Origins**: `http://localhost:3000`
   - **Allowed Logout URLs**: `http://localhost:3000`

### 2. Frontend Setup (Next.js)

```bash
cd auth0-frontend
npm install
```
