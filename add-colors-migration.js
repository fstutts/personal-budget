// Script to add colors to existing budget data

const mongoose = require('mongoose');

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
    },
    color: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(v) {
                // Validate hex color format (#RRGGBB)
                return /^#[0-9A-F]{6}$/i.test(v);
            },
            message: 'Color must be a valid hex color (e.g., #FF5733)'
        }
    }
});

const Budget = mongoose.model('Budget', budgetSchema);

// Default colors for chart items
const defaultColors = [
    '#FF6384', // Pink/Red
    '#36A2EB', // Blue  
    '#FFCE56', // Yellow
    '#4BC0C0', // Teal
    '#9966FF', // Purple
    '#FF9F40', // Orange
    '#FF6B6B', // Light Red
    '#4ECDC4', // Light Teal
    '#45B7D1', // Sky Blue
    '#96CEB4'  // Light Green
];

async function addColorsToExistingData() {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoUrl);
        console.log('Connected to MongoDB');

        // Get all existing budget items
        const existingItems = await Budget.find({});
        console.log(`Found ${existingItems.length} existing items`);

        // Update each item with a color if it doesn't have one
        for (let i = 0; i < existingItems.length; i++) {
            const item = existingItems[i];
            
            if (!item.color) {
                const colorIndex = i % defaultColors.length;
                const assignedColor = defaultColors[colorIndex];
                
                await Budget.findByIdAndUpdate(item._id, { color: assignedColor });
                console.log(`Updated "${item.title}" with color ${assignedColor}`);
            } else {
                console.log(`"${item.title}" already has color: ${item.color}`);
            }
        }

        console.log('Color migration completed!');
    } catch (error) {
        console.error('Error migrating colors:', error);
    } finally {
        // Close the connection
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
}

// Run the migration
addColorsToExistingData();
