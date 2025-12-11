import { useState } from "react";
import InscriptionService from "../Services/InscriptionService";
import { useNavigate } from "react-router-dom";

export default function FormulaireInscription() { // Composant de formulaire d'inscription
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState(""); // État pour la confirmation du mot de passe
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [adress, setAdress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate(); // Hook pour la navigation

  const handleSubmit = async (e) => { // Gestion de la soumission du formulaire
    e.preventDefault(); // Empêche le rechargement de la page

    if (password !== passwordConfirm) { // Vérification de la correspondance des mots de passe
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    try {
      const response = await InscriptionService.RegisterUser( // Appel au service d'inscription
        pseudo,
        password,
        lastname,
        firstname,
        email,
        adress,
        postalCode,
        city
      );
      console.log(response.data);
      alert("Votre compte a été crée ! Bienvenue dans Escape Game !");
    } catch (error) {
      console.error("Erreur lors de la création du compte", error);
      alert("Erreur lors de la création de votre compte, réessayez", error);
    }
  };

  return (
    <>
      <main className="flex-1 bg-[#1E1E2F]/100"> {/* Fond sombre avec opacité */}
        <div className="min-h-screen flex flex-col"> {/* Conteneur principal */}
          <div className="mt-32 max-w-xl mx-auto rounded-3xl bg-white/100 border-2 border-[#4A90E2] backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,0.8)] px-7 py-9"> 
            <h1 className="mb-8 text-center text-2xl font-bold text-[#1E1E2F]">
              Création de votre compte
            </h1>

            <form className="max-w-md mx-auto bg-white rounded-2xl px-6 py-6 shadow-lg space-y-6" onSubmit={handleSubmit}> {/* Formulaire avec gestion de la soumission */} 
              <div className="space-y-6"> {/* Espacement entre les champs */} 
                <div className="relative z-0 w-full group"> {/* Champ Pseudo */}
                  <input 
                    type="text"
                    name="login"
                    id="login" 
                    className="block py-2.5 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-[#F5A623] peer" 
                    placeholder=" " 
                    value={pseudo} 
                    onChange={(e) => setPseudo(e.target.value)} 
                    required
                  />
                  <label
                    htmlFor="login"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-[#F5A623]"
                  >
                    Pseudo
                  </label>
                </div>

                <div className="relative z-0 w-full group">
                  <input
                    type="password"
                    name="floating_password"
                    id="floating_password"
                    className="block py-2.5 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-[#F5A623] peer"
                    placeholder=" "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="floating_password"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-[#F5A623]"
                  >
                    Mot de passe
                  </label>
                </div>

                <div className="relative z-0 w-full group">
                  <input
                    type="password"
                    name="repeat_password"
                    id="floating_repeat_password"
                    className="block py-2.5 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-[#F5A623] peer"
                    placeholder=" "
                                        value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="floating_repeat_password" 
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-[#F5A623]"
                  >
                    Confirmez votre mot de passe
                  </label>
                </div>

                <div className="relative z-0 w-full group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="block py-2.5 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-[#F5A623] peer"
                    placeholder=" "
                                        value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="email"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-[#F5A623]"
                  >
                    Adresse e-mail
                  </label>
                </div>

                <div className="relative z-0 w-full group">
                  <input
                    type="text"
                    name="adress"
                    id="adress"
                    className="block py-2.5 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-[#F5A623] peer"
                    placeholder=" "
                                        value={adress}
                    onChange={(e) => setAdress(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="adress"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-[#F5A623]"
                  >
                    Adresse
                  </label>
                </div>
              </div>

              <div className="grid md:grid-cols-2 md:gap-6 gap-6">
<div className="relative z-0 w-full group">
  <input
    type="text"
    name="postal_code"
    id="postal_code"
    className="block py-2.5 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-[#F5A623] peer"
    placeholder=" "
    value={postalCode}
    onChange={(e) => {
      const value = e.target.value.replace(/\D/g, ""); 
      if (value.length <= 5) {
        setPostalCode(value);
      }
    }}
    maxLength={5}
    required
  />
  <label
    htmlFor="postal_code"
    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-[#F5A623]"
  >
    Code postal
  </label>
</div>

                <div className="relative z-0 w-full group">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    className="block py-2.5 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-[#F5A623] peer"
                    placeholder=" "
                                        value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="city"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-[#F5A623]"
                  >
                    Ville
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl border border-black p-2 bg-[#F5A623] hover:bg-[#D98C1F] text-white font-semibold mt-2 transition-colors duration-300"
              >
                Entrez dans l'aventure !
              </button>
                            <p
                onClick={() => { navigate('/connexion'); }}
                className="underline cursor-pointer mt-6 text-blue-700 text-center"
              >
                Déjà un compte ? Se connecter
              </p>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
