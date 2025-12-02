import logo from "../assets/Logo.png";

export default function FooterEscapeGame() {
    return (
        <footer className="w-full bg-[#1E1E2F] p-4 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Logo */}
                <img src={logo} alt="Escape Game Logo" className="w-12" />


                {/* Liens */}
                <ul className="flex flex-wrap items-center gap-6">
                    <li>
                        <a
                            href="#"
                            className="transition-colors hover:text-[#F5A623]"
                        >
                            À propos
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="transition-colors hover:text-[#F5A623]"
                        >
                            Conditions d'utilisation
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="transition-colors hover:text-[#F5A623]"
                        >
                            Politique de confidentialité
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="transition-colors hover:text-[#F5A623]"
                        >
                            Contact
                        </a>
                    </li>
                </ul>
            </div>

            {/* Séparateur */}
            <hr className="my-6 border-gray-600" />

            {/* Copyright */}
            <p className="text-center text-sm">
                &copy; 2025 Projet Escape Game - Bafo, Cyprien & Marion 
            </p>
        </footer>
    );
}
