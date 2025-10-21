# Personal Budget API - Two Essential Endpoints

Your Personal Budget API now has exactly two endpoints to manage budget data stored in MongoDB:

## 1. GET /budget - Fetch Budget Data

**Purpose**: Retrieves all budget entries from the database for display in charts

**Method**: GET  
**URL**: `http://localhost:3000/budget`  
**Headers**: None required

**Response Format**:
```json
{
  "myBudget": [
    {
      "_id": "68f6dcb2f679b62391dcf0aa",
      "title": "Eat out",
      "budget": 25,
      "__v": 0
    },
    {
      "_id": "68f6dcb2f679b62391dcf0ab",
      "title": "Rent",
      "budget": 375,
      "__v": 0
    }
  ]
}
```

**Usage**: This endpoint is automatically called by your Chart.js and D3.js charts to display budget data.

## 2. POST /budget - Add New Budget Entry

**Purpose**: Adds a new budget item to the database

**Method**: POST  
**URL**: `http://localhost:3000/budget`  
**Headers**: `Content-Type: application/json`

**Request Body**:
```json
{
  "title": "Entertainment",
  "budget": 75
}
```

**Success Response** (Status: 201):
```json
{
  "_id": "68f6def6cce7f77fcf2c43d3",
  "title": "Entertainment",
  "budget": 75,
  "__v": 0
}
```

**Error Responses**:
- **400 Bad Request**: Missing required fields
```json
{
  "error": "Title and budget are required"
}
```

- **400 Bad Request**: Invalid budget amount
```json
{
  "error": "Budget must be a positive number"
}
```

## Testing the Endpoints

### Test GET endpoint:
```bash
curl http://localhost:3000/budget
```

### Test POST endpoint:
```bash
curl -X POST http://localhost:3000/budget \
  -H "Content-Type: application/json" \
  -d '{"title": "New Expense", "budget": 100}'
```

## Integration with Charts

Both charts in your website automatically use these endpoints:
- **Chart.js pie chart**: Calls GET /budget to populate chart data
- **D3.js donut chart**: Calls GET /budget to populate chart data

When you add new budget items via the POST endpoint, refresh your website to see the updated charts with the new data.

## Data Flow

1. **Initial Load**: Charts call GET /budget → Display existing data
2. **Add New Item**: POST /budget → Item saved to MongoDB
3. **Refresh/Reload**: Charts call GET /budget → Display updated data including new items

Your budget data is now persistent and dynamically managed through these two essential endpoints!
