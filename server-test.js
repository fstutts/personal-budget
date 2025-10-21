//Budget API - Test Version

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/', express.static('public'));

//MongoDB connection
const mongoUrl = 'mongodb://localhost:27017/personal-budget';

console.log('Attempting to connect to MongoDB...');

mongoose.connect(mongoUrl)
    .then(() => {
        console.log('✅ Connected to MongoDB successfully');
    })
    .catch((error) => {
        console.error('❌ Error connecting to MongoDB:', error);
    });

// Simplified Budget schema without strict validation
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
    },
    color: {
        type: String,
        required: false, // Made optional for testing
        trim: true
    }
});

const Budget = mongoose.model('Budget', budgetSchema);

app.get('/hello', (req, res) => {
    console.log('Hello endpoint hit');
    res.send('Hello World!');
});

app.get('/budget', async (req, res) => {
    console.log('Budget GET endpoint hit');
    try {
        const budgetData = await Budget.find({});
        console.log(`Found ${budgetData.length} budget items`);
        res.json({myBudget: budgetData});
    } catch (error) {
        console.error('Error fetching budget data:', error);
        res.status(500).json({error: 'Failed to fetch budget data'});
    }
});

// Add a new budget item
app.post('/budget', async (req, res) => {
    console.log('Budget POST endpoint hit with data:', req.body);
    try {
        const {title, budget, color} = req.body;
        
        // Basic validation
        if (!title || budget === undefined) {
            return res.status(400).json({error: 'Title and budget are required'});
        }
        
        if (budget < 0) {
            return res.status(400).json({error: 'Budget must be a positive number'});
        }
        
        const newBudgetItem = new Budget({title, budget, color: color || '#FF6384'});
        const savedItem = await newBudgetItem.save();
        console.log('Successfully saved item:', savedItem);
        res.status(201).json(savedItem);
    } catch (error) {
        console.error('Error creating budget item:', error);
        res.status(400).json({error: 'Failed to create budget item'});
    }
});

app.listen(port, () => {
    console.log(`🚀 API served at http://localhost:${port}`);
    console.log('Server is ready to accept requests');
});

console.log('Starting server...');
