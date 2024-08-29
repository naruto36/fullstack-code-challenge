import express from 'express';

import resultRoutes from "./routes/apiResultRoutes";
import dataSource from "./database";

const app = express();
app.use(express.json());
app.use('/api/results', resultRoutes);

dataSource.initialize()
    .then(() => {
        console.log('Connected to the database!');
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });
