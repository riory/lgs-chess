import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Routes
import ChessRouter from './routes/chessRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use(express.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serve Bootstrap's CSS and JS files
app.use(
  '/bootstrap',
  express.static(__dirname + '/node_modules/bootstrap/dist')
);
app.use(express.static('public')); // Assuming a 'public' folder for your static assets

// Routes
app.use('/', ChessRouter);

// Global error handler (should be after routes)
//app.use(errorHandler);

export default app;
