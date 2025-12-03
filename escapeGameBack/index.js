import express from 'express';
import './config/bdd.js';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRoutes from './routes/usersRoutes.js';
import accountRoutes from './routes/accountRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import escapeGameRoutes from './routes/escapeGameRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import feedbackRoutes from './routes/feedbackRoutes.js'
import session from 'express-session';


dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

app.use(session({
    secret: 'tonSecret',
   resave: false,
   saveUninitialized: true,
   cookie: { secure: false }
}))

app.use('/api', 
usersRoutes,
accountRoutes, 
bookingRoutes,
escapeGameRoutes, 
paymentRoutes,
feedbackRoutes, 

);



app.get ('/AllUsers', async (req, res) => {
    try {
        const [users] = await bdd.query("SELECT * from users");
        res.status(200).json({message: "Utilisateurs récupérés avec succès", users}) 
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
    }
}
)


app.get("/test", (req, res) => {
    res.json({message : "Bienvenue dans l'API d'escape Game !"});
});


app.listen(process.env.SERVER_PORT, () => {
    console.log(`L'API est lancé sur http://localhost:${process.env.SERVER_PORT}`);  
})

