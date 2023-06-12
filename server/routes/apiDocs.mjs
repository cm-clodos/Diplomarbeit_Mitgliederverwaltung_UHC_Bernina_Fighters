
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import express from 'express';
import * as dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Memberadministration API',
            version: '1.0.0',
            description: 'This is a REST API application made with Express. It retrieves data from a MariaDB database and returns it as JSON.',
        },
        servers: [
            {
                url: `http://${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}`,
                description: 'Development server',
            },
        ],
    },
    apis: ['./routes/*.mjs'],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerSpec));

export default router;