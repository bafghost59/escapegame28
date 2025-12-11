import logo from "../assets/Logo.png";
import { Link } from "react-router-dom";


export default function FooterEscapeGame() { 
    return (
        <footer className="w-full bg-[#1E1E2F] p-4 text-white"> {/* Fond sombre avec du texte blanc */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6"> {/* Disposition en colonne sur mobile et en ligne sur desktop */}
                {/* Logo */}
                <img src={logo} alt="Escape Game Logo" className="w-12" />


                {/* Liens */}
                <ul className="flex flex-wrap items-center gap-6"> {/* Espacement entre les liens */}
                    <li> 
                        <Link to="/Apropos" className="text-white no-underline transition-colors hover:text-[#F5A623]"> {/* Lien avec effet au survol */}
                            A propos
                        </Link>
                    </li>
                    <li>
                        <Link to="/cgu" className="text-white no-underline transition-colors hover:text-[#F5A623]">
                            Conditions d'utilisation
                        </Link>
                    </li>
                    <li>
                        <Link to="/rgpd" className="text-white no-underline transition-colors hover:text-[#F5A623]">
                            Politique de confidentialité
                        </Link>
                    </li>
                    <li>
                        <Link to="/support" className="text-white no-underline  transition-colors hover:text-[#F5A623]">
                            Contact
                        </Link>
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
