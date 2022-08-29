const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const router = require('./routes');
const sequelize = require('./dataBase/dbConfig');
const cors = require('cors');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));

app.use('/api/v1', router);

const port = process.env.PORT || 3001;
//{force:true}
sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
  });