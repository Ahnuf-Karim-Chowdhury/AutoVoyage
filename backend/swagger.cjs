// backend/swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'AutoVoyage API',
    description: 'Auto-generated Swagger documentation',
  },
  host: 'localhost:6969',
  schemes: ['http'],
};

const outputFile = './docs/swagger-output.json';
const endpointsFiles = ['./routes/auth.js', './routes/cars.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
