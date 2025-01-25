import app from './app.js'; 
import connectDatabase from './config/mongooseConfig.js';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.BACKEND_PORT || 5000;

connectDatabase();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


