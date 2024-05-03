import express from 'express';
import { Sequelize } from 'sequelize';

const app = express();
const port = 3000;

const sequelize = new Sequelize('hackathon', 'root', 'qorgksruf123', {
    host: 'localhost',
    dialect: 'mysql',
});

app.get('/', async (req, res) => {
    try {
        await sequelize.authenticate();
        res.send('Connection has been established successfully.');
    } catch (error) {
        res.send(`Unable to connect to the database: ${error}`);
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})