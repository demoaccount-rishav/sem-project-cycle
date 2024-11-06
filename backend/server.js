import dotenv from 'dotenv';
import express from 'express'
import { connectDB } from './configs/database.js';
import userRouter from './routes/user.route.js';
import zoneRouter from './routes/zone.route.js';
import cycleRouter from './routes/cycle.route.js';

dotenv.config();

const app = express()
const port = process.env.PORT || 3000;

// const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/zone', zoneRouter);
app.use('/api/cycle', cycleRouter);

// app.use('/api/admin', adminRouter);


app.listen(port, () => {
    connectDB();
    console.log(`Example app listening on port http://localhost:${port}`);
})


// fmyZF8rkyKMqHPbp
// rishavbhowmick2002va