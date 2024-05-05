import express, {NextFunction} from 'express';
import helmet from "helmet";
import movieRouter from './routers/movieRoutes';
import { DataSource } from 'typeorm';

require('dotenv').config();

export const dataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'qorgksruf123',
    database: 'hackathon',
    synchronize: true,
    logging: false,
    entities: [
        __dirname + '/entity/*.ts'
    ],
    migrations: [
        __dirname + '/migration/*.ts'
    ],
    subscribers: [
        __dirname + '/subscriber/*.ts'
    ]
});

dataSource.initialize()
    .then(() => {
        console.log('Database connected');
    })
    .catch((err) => {
        console.error(err);
    });

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

app.use('/api/v1/movies', movieRouter);


app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
})