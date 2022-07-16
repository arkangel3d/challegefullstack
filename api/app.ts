import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.use('/api', router);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});