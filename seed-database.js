// Script to seed MongoDB with initial budget data from budget.json

const mongoose = require('mongoose');
const fs = require('fs');

// MongoDB connection
const mongoUrl = 'mongodb://localhost:27017/personal-budget';

// Budget schema (same as in server.js)
const budgetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  budget: {
    type: Number,
    required: true,
    min: 0
  }
});

const Budget = mongoose.model('Budget', budgetSchema);

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoUrl);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Budget.deleteMany({});
    console.log('Cleared existing budget data');

    // Read data from budget.json
    const budgetData = JSON.parse(fs.readFileSync('budget.json', 'utf8'));
    
    // Insert the budget items into MongoDB
    const insertedItems = await Budget.insertMany(budgetData.myBudget);
    console.log(`Inserted ${insertedItems.length} budget items:`, insertedItems);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the seed function
seedDatabase();
