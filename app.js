const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const animeRoutes = require('./src/routes/animeRoutes'); 
const ratingRoutes = require('./src/routes/ratingRoutes');
// const customRoutes = require('./src/routes/customRoutes');
// const errorHandler = require('./src/utils/errorHandler');
const installRoutes = require('./src/routes/installRoutes');

dotenv.config();
const app = express();

// Configuração do Swagger JSDoc
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AnimeRating',
      version: '1.0.0',
      description: 'Anime Rating System',
    },
  },
  apis: ['./swagger.js'], 
};
const specs = swaggerJsdoc(options);

// Configuração do Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/', authRoutes);
app.use('/user', userRoutes);
app.use('/animes', animeRoutes); 
app.use('/rating', ratingRoutes); 
// app.use('/custom', customRoutes);
app.use('/', installRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    errorHandler.handle(res, err);
});

// Start server
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

app.listen(PORT, async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`Server running on port: ${PORT}`);
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
});
