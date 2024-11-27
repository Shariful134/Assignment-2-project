import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

async function startServer() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Connected to the database');

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

// Start the server
startServer();
export default app;

// async function main() {
//   try {
//     await mongoose.connect(config.database_url as string);

//     app.listen(config.port, () => {
//       console.log(`Example app listening on port ${config.port}`);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }
// main();
