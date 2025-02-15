import { configDotenv } from "dotenv";
configDotenv({ path: ".env" });
import express from "express";
import cors from "cors";
import { Router } from "./routers";
import db from "./connections/db";

const { PORT } = process.env;

const app = express()

app.use(cors())
app.use(express.json())

new Router(app);

const server = app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}!`)
})

// Handle termination signals
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

async function shutdown() {
    console.log('Shutting down server...');
    await db.destroy();
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
}