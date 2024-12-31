# My API Project

This project demonstrates how to create a simple API using Express and an Excel spreadsheet as a database.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. **Clone the repository:**

```sh
git clone https://github.com/yb278/myapi.git
cd myapi
```

2. **Install libraries** 

```sh 
    npm install
```

3. **Run project** 

```sh 
    npm run dev
```

## API Endpoints

- GET /api/merchants: Retrieve all merchants
- GET /api/merchants/:id: Retrieve a specific merchant by ID
- POST /api/merchants: Create a new merchant
- PUT /api/merchants/:id: Update an existing merchant by ID
- DELETE /api/merchants/:id: Delete a merchant by ID

## Postman
Import Basic Commands file as a collection
In environment create a variable 'URL' with initial value as localhost:whateveryouuse