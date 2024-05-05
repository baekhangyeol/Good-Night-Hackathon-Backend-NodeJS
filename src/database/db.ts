import mysql from 'mysql2/promise';

const connectDB = async () => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'qorgksruf123',
            database: 'hackathon'
        });
        console.log('MySQL Connected..');
        return connection;
    } catch(err) {
        console.error(err);
        process.exit(1);
    }
};

export default connectDB;