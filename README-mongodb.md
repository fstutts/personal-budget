# Personal Budget API - MongoDB Version

This Express.js server manages personal budget data using MongoDB instead of a static JSON file.

## Prerequisites

1. **MongoDB**: Make sure MongoDB is installed and running on your machine
   - Install MongoDB Community Edition from: https://www.mongodb.com/try/download/community
   - Start MongoDB service:
     ```bash
     # On macOS with Homebrew
     brew services start mongodb/brew/mongodb-community
     
     # Or start manually
     mongod --config /usr/local/etc/mongod.conf
     ```

2. **Node.js**: Make sure Node.js is installed

## Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Seed the database** with your existing budget data:
   ```bash
   node seed-database.js
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

## API Endpoints

### GET /budget
Retrieves all budget items from MongoDB.

**Response format**:
```json
{
  "myBudget": [
    {
      "_id": "...",
      "title": "Eat out",
      "budget": 25
    },
    {
      "_id": "...",
      "title": "Rent", 
      "budget": 375
    }
  ]
}
```

### POST /budget
Creates a new budget item.

**Request body**:
```json
{
  "title": "New Expense",
  "budget": 100
}
```

### PUT /budget/:id
Updates an existing budget item by ID.

**Request body**:
```json
{
  "title": "Updated Expense",
  "budget": 150
}
```

### DELETE /budget/:id
Deletes a budget item by ID.

## Database Configuration

- **Database Name**: `personal-budget`
- **Collection**: `budgets`
- **Connection URL**: `mongodb://localhost:27017/personal-budget`

To change the database configuration, modify the `mongoUrl` variable in `server.js`.

## Data Migration

Your original budget data from `budget.json` can be imported into MongoDB using the provided `seed-database.js` script. This script:

1. Connects to MongoDB
2. Clears any existing budget data
3. Imports all items from `budget.json`
4. Closes the connection

## Troubleshooting

- **MongoDB Connection Error**: Ensure MongoDB service is running
- **Port 3000 in use**: Change the `port` variable in `server.js`
- **Database access**: Make sure MongoDB is accessible at `localhost:27017`
