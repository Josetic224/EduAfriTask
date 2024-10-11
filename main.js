const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: ".env" });

const app = express();
require('./src/routers/indexroutes')(app);

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger setup
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'EduAfriTask API',
            version: '1.0.0',
            description: 'EduAfriTask API documentation',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', // Optional, just to indicate the token format
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routers/**/*.js'], // Path to your route files where the Swagger documentation is written
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const cookieSession = require('cookie-session');

const PORT = process.env.PORT || 3000
console.log(PORT)
app.get('/', (req, res) => {
    res.status(200).send("hello world");
});

const { connectToDatabase, prisma } = require('./src/config/config');

async function startApp() {
    await connectToDatabase();
    const users = await prisma.user.count();
    console.log(`No of Users currently:`, users);
}

startApp();

// Middleware for session management
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'], // Replace with your own keys
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
