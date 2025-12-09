# Escape Game 
Plateforme complète permettant de réserver des escape games, gérer les paiements, administrer le contenu et interagir avec un chatbot.  
Développé en React / Node / MySQL, avec authentification sécurisée et paiement Stripe.

---

# Fonctionnalités principales

## Frontend
- React 18 + Vite  
- TailwindCSS + Flowbite + Material Tailwind  
- Catalogue d’escape games  
- Page détail + vidéos + carrousel  
- Réservation en 3 étapes 
- Paiement Stripe + code promo  
- Authentification complète (connexion / inscription / mot de passe oublié)  
- Gestion du profil utilisateur  
- Page Contact + Support  
- Pages À propos, CGU, RGPD  
- Dashboard Administrateur  
- Chatbot Crisp intégré  
- 100% responsive  

## Backend
- Node.js + Express  
- MySQL  
- Sécurité : bcrypt, JWT
- CRUD 
- Gestion utilisateurs + rôles  
- Réservations + transactions Stripe  
- Stripe sécurisé  
- Gestion codes promotionnels  

---

# Technologies & Dépendances (Frontend)

### UI / Design
- TailwindCSS  
- Flowbite + Flowbite-React  
- Material Tailwind  
- Bootstrap  
- React Icons  

### Fonctionnel
- Axios  
- React Router DOM  
- jsPDF  
- dotenv  
- Crisp Chat  

### Sécurité
- bcryptjs 
- Auth JWT  

### Dev
- Vite  
- ESLint  
- Autoprefixer / PostCSS  

---

# Routes Frontend

## Pages publiques
| Route | Composant | Description |
|-------|-----------|-------------|
| `/` | PageAccueil | Accueil |
| `/catalogue` | PageCatalogue | Liste escape games |
| `/catalogue/:id` | PageEscapeDetail | Détail escape game |
| `/inscription` | PageInscription | Création de compte |
| `/connexion` | PageConnexion | Connexion |
| `/forgotPassword` | PageForgetMdp | Mot de passe oublié |
| `/cgu` | PageCGU | Conditions générales |
| `/rgpd` | PageRGPD | Politique de confidentialité |
| `/apropos` | PageApropos | À propos |
| `/support` | PageSupport | Support utilisateur |

## Authentification requise
| Route | Composant | Description |
|-------|-----------|-------------|
| `/Profil` | PageProfilUser | Profil utilisateur |

## Administration
| Route | Composant | Description |
|-------|-----------|-------------|
| `/admin` | PageAdmin | Dashboard Admin |

## Réservation (3 étapes)
| Route | Étape | Description |
|-------|-------|-------------|
| `/reservation/:id` | Étape 1 | Informations & sélection |
| `/reservation/:id/paiement` | Étape 2 | Stripe + code promo |
| `/reservation/:id/confirmation` | Étape 3 | Confirmation |

---

#  Sécurité

### Hashage des mots de passe
- Hash avec bcrypt  
- Jamais stockés en clair  

### Authentification via JWT
- Token signé  
- Expiration automatique  
- Vérification sur routes protégées  

### Paiement Stripe
- Session Checkout  
- Webhook sécurisé  
- Vérification code promo  
- Enregistrement transactions & réservations  

---

# Paiement (Stripe)

Fonctionnalités :
- Création de session Stripe  
- Paiement sécurisé  
- Gestion des codes promotionnels  
- Sauvegarde BDD  

---

#  Chatbot (Crisp)

Intégré dans index.html :
- Chat en direct  
- Support utilisateur  
- Connaissances personnalisées  
- Assistant IA Crisp  

---

#  Installation & Lancement

##  Cloner le projet
git clone https://github.com/bafghost59/escapegame28.git
cd escapegame28

---

# Partie BACK

## Installation des dépendances
cd back
npm install

## Fichier .env
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
STRIPE_SECRET_KEY=
FRONT_URL=

## Lancer le serveur 
npm run dev

---

# Partie FRONT

## Installation des dépendances 
cd front
npm install

## Lancer le serveur 
npm run dev

---

# Tests

Tests API (Postman)
Tests Stripe
Tests JWT (validité / expiration)
Tests navigation React
Tests du système de réservation

---

# Licence 
Projet réalisé dans un cadre pédagogique. Non destiné à un usage commercial.





