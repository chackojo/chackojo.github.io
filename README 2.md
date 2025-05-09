# Sana Trade Website

A marketplace website for buying and selling items, built with React, Node.js, Express, and MongoDB.

## Features

- User authentication (register/login)
- Browse items with search and filter functionality
- List items for sale
- Manage your listings
- Import items from Excel file

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd sana-trade-website
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
cd ..
```

4. Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=mongodb://localhost:27017/sana-trade
JWT_SECRET=your-secret-key
PORT=5000
```

5. Start the development servers:
```bash
# Start backend server
npm run dev

# In a new terminal, start frontend server
npm run client
```

## Importing Items

1. Place your Excel file named `items.xlsx` in the root directory with the following columns:
   - Collection
   - Name
   - Front Image
   - Back Image
   - Colors
   - Type

2. Run the import script:
```bash
node backend/scripts/importItems.js
```

## Deployment

1. Build the frontend:
```bash
cd frontend
npm run build
cd ..
```

2. Set the environment variables for production:
```
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-secret-key
PORT=5000
```

3. Start the production server:
```bash
npm start
```

## Technologies Used

- Frontend:
  - React
  - Material-UI
  - React Router
  - Axios

- Backend:
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - JWT Authentication

## License

MIT 