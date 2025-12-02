export default function FormulaireInscription () {
    return ( <>
          <main className="flex-1 bg-[#1E1E2F]/100">
  <div className="min-h-screen flex flex-col">
    <div className="mt-32 max-w-xl mx-auto rounded-3xl bg-white/100 border-2 border-[#4A90E2] backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,0.8)] px-7 py-9">
      <h1 className="mb-8 text-center text-2xl font-bold text-[#1E1E2F]">
        Création de votre compte
      </h1>

      <form className="max-w-md mx-auto bg-white rounded-2xl px-6 py-6 shadow-lg space-y-6">
        <div className="space-y-6">
          <div className="relative z-0 w-full group">
            <input
              type="text"
              name="login"
              id="login"
              className="block py-2.5 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-[#F5A623] peer"
              placeholder=" "
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
      </form>
    </div>
  </div>
</main>
        </>
     );
}
 
