const xlsx = require('xlsx');
const mongoose = require('mongoose');
const Item = require('../models/Item');
const User = require('../models/User');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sana-trade', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Connection Error:', err));

const importItems = async () => {
  try {
    // Read the Excel file
    const workbook = xlsx.readFile('items.xlsx');
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet);

    // Get or create a default user for the items
    let defaultUser = await User.findOne({ username: 'admin' });
    if (!defaultUser) {
      defaultUser = await User.create({
        username: 'admin',
        password: 'admin123' // You should change this in production
      });
    }

    // Process each row
    for (const row of data) {
      const item = new Item({
        collection: row['Collection'],
        name: row['Name'],
        frontImage: row['Front Image'],
        backImage: row['Back Image'],
        colors: row['Colors'].split(',').map(color => color.trim()),
        type: row['Type'],
        size: 'M', // Default size
        seller: defaultUser._id
      });

      await item.save();
      console.log(`Imported item: ${item.name}`);
    }

    console.log('Import completed successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error importing items:', err);
    process.exit(1);
  }
};

importItems(); 