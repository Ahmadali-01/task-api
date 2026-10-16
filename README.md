# Task API

A RESTful Task Manager API built with **Node.js**, **Express**, and **SQLite**.

## Features

- **6 CRUD endpoints** — full create, read, update, delete
- **Input validation** on every write with detailed field errors
- **Centralized error handling** with consistent JSON error responses
- **Filtering, searching, and sorting** out of the box
- **SQLite persistence** — no external database to install
- **Security headers** via Helmet
- **CORS enabled** for cross-origin requests
- **Request logging** via Morgan

## Requirements

- Node.js 18+
- npm

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env

# 3. Start the dev server (auto-reload on file changes)
npm run dev