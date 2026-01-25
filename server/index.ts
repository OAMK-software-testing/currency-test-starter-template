// Import required dependencies
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import currencyRoutes from './routes/currencyRoutes'

// Load environment variables from .env file
dotenv.config()

// Initialize Express application
const app = express()
const PORT = process.env.PORT || 3000

// Enable CORS and JSON parsing middleware
app.use(cors());
app.use(express.json())

// Register currency conversion routes under /api prefix
app.use('/api',currencyRoutes)

export { app }

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});