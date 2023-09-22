import express from 'express';
import authRoutes from './routes/authRoutes';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/auth', authRoutes)

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/', (req, res) => {
    res.send('Hello, TypeScript server!');
});

app.listen(port, () => {
    console.log(` Authentication Server is Running on ${port} ⚡`);
});
