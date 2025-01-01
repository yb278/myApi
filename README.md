# A Basic REST API

This project is just to make a simple REST API using Express and an Excel spreadsheet as a database. This will be used to learn for projects in the future.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Status Page showing if database is connected
![Status Page Image](https://github.com/yb278/myApi/blob/main/Images/Status%20Page.png)

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