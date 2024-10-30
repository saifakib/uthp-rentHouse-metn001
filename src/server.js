// external imports
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

// internal imports
const app = require('./index');

// Retry connection function
async function connectWithRetry() {
    const maxRetries = 5; // Maximum number of retries
    const retryDelay = 5000; // Delay between retries in milliseconds (5 seconds)

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            await mongoose.connect(process.env.MongoURI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('Database Connected');

            // Start the server only after a successful database connection
            app.listen(process.env.PORT || 8000, () => {
                console.log(`Server Listening on port ${process.env.PORT || 8000}`);
            });
            break; // Exit the loop if connection is successful
        } catch (err) {
            console.log(`MongoDB connection attempt ${attempt} failed: ${err.message}`);
            if (attempt < maxRetries) {
                console.log(`Retrying in ${retryDelay / 1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, retryDelay)); // Wait before retrying
            } else {
                console.error("Could not connect to MongoDB. Exiting.");
                process.exit(1); // Exit the process if all retries fail
            }
        }
    }
}

// Start the retry connection process
connectWithRetry();
