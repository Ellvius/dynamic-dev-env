import app from './app.js'; 
import connectDatabase from './config/mongooseConfig.js';
import usersRoute from './routes/userRoutes.js'
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 5000;

connectDatabase();

app.use("/users", usersRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


