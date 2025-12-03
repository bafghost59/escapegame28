
import { useState } from "react";

export default function FormulaireSupport() {

    const [formData, setFormData] = useState({
        sujet: "",
        login: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

     const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await sendSupportMessage(formData);
            console.log(result);
            alert("Message envoyé !");
        } catch (error) {
            alert("Erreur lors de l'envoi.");
        }
    };

    return (
        <>
            <main className="flex-1 bg-[#1E1E2F]">
                <div className="min-h-screen flex flex-col">
                    <div className="mt-32 max-w-xl mx-auto rounded-3xl bg-white border-2 border-[#4A90E2] backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,0.8)] px-7 py-9">

                        <h1 className="mb-8 text-center text-2xl font-bold text-[#1E1E2F]">
                            Support
                        </h1>

                        <p className="mb-8 text-center text-2xl font-bold text-[#1E1E2F]">
                            Envoyez-nous un message et nous vous répondrons dans les plus brefs délais !
                        </p>

                        <form  onSubmit={handleSubmit} className="max-w-md mx-auto bg-white rounded-2xl px-6 py-6 shadow-lg space-y-6">

                            {/* Sujet */}
                            <div className="relative z-0 w-full group">
                                <input
                                    type="text"
                                    name="sujet"
                                    onChange={handleChange}
                                    className="block py-3 px-3 w-full text-sm text-gray-900 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#F5A623] peer transition"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="sujet"
                                    className="absolute text-sm text-gray-500 bg-white px-1 duration-300 transform -translate-y-4 left-3 scale-75 top-2 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-placeholder-shown:left-3 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:left-3 peer-focus:text-[#F5A623]"
                                >
                                    Sujet du message
                                </label>
                            </div>

                            {/* Pseudo */}
                            <div className="relative z-0 w-full group">
                                <input
                                    type="text"
                                    name="login"
                                    onChange={handleChange}
                                    className="block py-3 px-3 w-full text-sm text-gray-900 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#F5A623] peer transition"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="login"
                                    className="absolute text-sm text-gray-500 bg-white px-1 duration-300 transform -translate-y-4 left-3 scale-75 top-2 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-placeholder-shown:left-3 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:left-3 peer-focus:text-[#F5A623]"
                                >
                                    Pseudo
                                </label>
                            </div>

                            {/* Email */}
                            <div className="relative z-0 w-full group">
                                <input
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    className="block py-3 px-3 w-full text-sm text-gray-900 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#F5A623] peer transition"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="email"
                                    className="absolute text-sm text-gray-500 bg-white px-1 duration-300 transform -translate-y-4 left-3 scale-75 top-2 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-placeholder-shown:left-3 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:left-3 peer-focus:text-[#F5A623]"
                                >
                                    Adresse e-mail
                                </label>
                            </div>

                            {/* Message */}
                            <div className="relative z-0 w-full group">
                                <textarea
                                    name="message"
                                    id="message"
                                    rows="6"
                                    onChange={handleChange}
                                    className="block py-3 px-3 w-full text-sm text-gray-900 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#F5A623] peer transition resize-none"
                                    placeholder=" "
                                    required
                                ></textarea>
                                <label
                                    htmlFor="message"
                                    className="absolute text-sm text-gray-500 bg-white px-1 duration-300 transform -translate-y-4 left-3 scale-75 top-2 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-placeholder-shown:left-3 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:left-3 peer-focus:text-[#F5A623]"
                                >
                                    Message
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-xl border border-black p-2 bg-[#F5A623] hover:bg-[#D98C1F] text-white font-semibold mt-2 transition-colors duration-300"
                            >
                                Envoyer
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}
