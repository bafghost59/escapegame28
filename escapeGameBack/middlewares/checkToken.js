import jwt from 'jsonwebtoken'; 

const JWT_SECRET = process.env.JWT_SECRET;                                                          // token dans le .env

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    

if (!authHeader) {
    return res.status(401).json({error: "Token manquant"});                                           // si authHeader KO -> Renvoi erreur
}

const token = authHeader.split(' ')[1];                                                                   


try {
    const decoded = jwt.verify(token, JWT_SECRET);                                                  // contrôle pour vérifier le token avant de passer à la route suivante
    req.user = decoded; 
    next ();
} catch (error) {
    console.log('JWT error', error)
    return res.status(401).json({error: "Token invalide ou expiré"});
}
}

export default verifyToken; 