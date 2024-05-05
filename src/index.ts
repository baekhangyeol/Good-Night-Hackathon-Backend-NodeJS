import express, {NextFunction} from 'express';
import helmet from "helmet";
import connectDB from "./database/db";

require('dotenv').config();

connectDB();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

// interface ErrorType {
//     message: string;
//     status: number;
// }
//
// app.use(function (
//     err: ErrorType,
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) {
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'production' ? err : {};
//
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
})