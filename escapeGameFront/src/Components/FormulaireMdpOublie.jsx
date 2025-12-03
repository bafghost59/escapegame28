import { useState } from "react";
import ForgetMdpService from "../Services/ForgetMdpService.js";
import { useNavigate } from "react-router-dom";






export default function FormulaireMdpOublie() {


    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
   

        const handleSubmit = async (e) => {

    e.preventDefault();
      console.log("handleSubmit called"); 
        try {
          const response = await ForgetMdpService.resetPassword(login, email);
          console.log("response:", response)
      if (response.data) {
        alert('Un e-mail vous a été envoyé pour réinitialiser votre mot de passe.');
      } else {
        alert("Adresse email non trouvée");
      }
    return;
        } catch (error) {
          console.error("Erreur lors de la récupération de votre compte, réessayez", error);
          alert("Erreur lors de la récupération de votre compte, réessayez", error);
        }
      };


    return ( <>
            <main className="flex-1 bg-[#1E1E2F] py-32">
      <div className="mt-32 max-w-xl mx-auto rounded-3xl bg-white/100 border-2 border-[#4A90E2] backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,0.8)] px-7 py-9">
              <h1 className="mb-8 text-center text-2xl font-bold text-[#1E1E2F]">
        Mot de passe oublié
      </h1>

        <form className="max-w-sm mx-auto bg-white rounded-2xl px-6 py-6 shadow-lg" onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="login"
              id="login"
              className="block py-2.5 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:border-[#F5A623] peer"
              placeholder=" "
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
            <label
              htmlFor="login"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-[#F5A623]"
            >
              Login
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="email"
              id="email"
              className="block py-2.5 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:border-[#F5A623] peer"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-[#F5A623]"
            >
              Adresse Mail
            </label>
          </div>

          <button
            type="submit"
            className="mt-4 w-full text-white bg-orange-500 rounded-xl box-border border border-transparent hover:bg-orange-600 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 text-sm px-4 py-2.5 focus:outline-none"
          >
            Réinitialiser votre mot de passe
          </button>
              <p
                onClick={() => { navigate('/inscription/'); }}
                className="underline cursor-pointer mt-2 text-blue-700 text-center"
              >
                Pas encore de compte ? Inscrivez-vous ici!
              </p>
        </form>
      </div>
    </main>

    </>);
}
 
