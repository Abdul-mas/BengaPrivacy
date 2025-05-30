// --- backend/src/index.ts ---

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import requesterRouter from './routes/requester';
import providerRouter from './routes/provider';
import providerServiceRouter from './routes/providerService'; // New route
import matchingRouter from './routes/matching';

import providerInboxRouter from './routes/providerInbox';
import respondRouter from './routes/respond';

import brokerRouter from './routes/broker';

import inboxRoutes from './routes/inboxRoutes'; // adjust path if needed
import requesterRoutes from './routes/requester';


const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/matching', matchingRouter);

app.use('/api/provider/inbox', providerInboxRouter);
app.use('/api/provider/respond', respondRouter);
app.use('/api/requester', requesterRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/privacy-broker')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/requester', requesterRouter);
app.use('/api/provider', providerRouter);
app.use('/api/provider/service', providerServiceRouter); // Route for service metadata
app.use('/api/broker', brokerRouter);
app.use('/inbox', inboxRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
