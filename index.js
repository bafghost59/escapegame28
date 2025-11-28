import express from 'express';

import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());





app.get("/", (req, res) => {
    res.json({message : "Bienvenue dans l'API d'escape Game !"});
});


app.listen(process.env.SERVER_PORT, () => {
    console.log(`L'API est lancé sur http://localhost:${process.env.SERVER_PORT}`);  
})