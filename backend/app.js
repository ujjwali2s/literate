import express from 'express';
import cors from 'cors';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';
import eventRoutes from './routes/eventRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Route to fetch scorecard
app.get('/api/get_scorecard/:match_id?', async (req, res) => {
  const matchId = req.params.match_id || 55600973; // Default matchId if not provided
  const tokenUrl = "https://raw.githubusercontent.com/ujjwali2s/crictixx/refs/heads/main/toke.json"; // URL to fetch authToken

  try {
    // Fetch the authToken
    const tokenResponse = await axios.get(tokenUrl);

    if (!tokenResponse.data || !tokenResponse.data.authToken) {
      throw new Error('AuthToken not found in response');
    }

    const authToken = tokenResponse.data.authToken; // Extract authToken from the response

    // Construct the scorecard URL
    const url = `https://lmt.fn.sportradar.com/common/en/Etc:UTC/cricket/get_scorecard/${matchId}?T=${authToken}`;

    const headers = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0",
      "Accept": "*/*",
      "Accept-Language": "en-US,en;q=0.5",
      "Origin": "https://scorecard.oddstrad.com",
    };

    // Fetch the scorecard data
    const response = await axios.get(url, { headers });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching scorecard data:", error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// API Routes
app.use('/api', eventRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../../dist');
  app.use(express.static(distPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Health check route
app.get('/health', (req, res) => {
  res.send('sahi kaam kar raha!');
});

export default app;
