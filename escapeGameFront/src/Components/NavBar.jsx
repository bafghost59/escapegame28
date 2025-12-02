import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const links = [
        { name: "Accueil", to: "/" },
        { name: "Catalogue", to: "/catalogue" },
        { name: "Réservations", to: "#" },
        { name: "À propos", to: "#" },
        { name: "Contact", to: "#" },
    ];

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => (document.body.style.overflow = "auto");
    }, [open]);

    return (
        <header className="sticky top-0 z-50 w-full bg-[#1E1E2F] shadow-lg">
            <nav
                className="mx-auto max-w-[90vw] px-4 md:px-6 py-4 flex items-center justify-between"
                aria-label="Navigation principale"
            >
                {/* LOGO */}
                <div className="flex items-center gap-3">
                    <Link to="/" onClick={() => setOpen(false)}>
                        <img
                            src={Logo}
                            alt="Logo du site"
                            className="h-20 w-auto object-contain cursor-pointer"
                        />
                        <span className="sr-only">Accueil</span>
                    </Link>
                </div>

                {/* MENU DESKTOP */}
                <ul className="hidden md:flex items-center gap-10 text-[16px] font-['Open_Sans']">
                    {links.map((link) => (
                        <li key={link.name}>
                            <Link
                                to={link.to}
                                className="text-[#CCCCCC] transition-colors duration-200 hover:text-[#F5A623]"
                                aria-label={link.name}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* BOUTON CONNEXION DESKTOP */}
                <div className="hidden md:flex items-center gap-4">
                    <a
                        href="#"
                        className="rounded-2xl bg-[#4A90E2] px-6 py-2 text-[18px] font-bold font-['Roboto'] text-white transition-all duration-300 hover:bg-[#357ABD]"
                        aria-label="Connexion"
                    >
                        Connexion
                    </a>
                </div>

                {/* HAMBURGER MOBILE */}
                <button
                    className="md:hidden text-white z-50"
                    onClick={() => setOpen(!open)}
                    aria-label="Ouvrir le menu"
                    aria-expanded={open}
                >
                    {open ? <X size={28} /> : <Menu size={28} />}
                </button>
            </nav>

            {/* OVERLAY MOBILE */}
            <div
                className={`md:hidden fixed inset-0 bg-black/50 transition-opacity duration-300 ${
                    open ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                onClick={() => setOpen(false)}
            />

            {/* MENU MOBILE */}
            <div
                className={`md:hidden fixed top-0 right-0 h-full w-72 bg-[#2C2C3A] border-l border-[#F5A623]/30 transform transition-transform duration-300 ${
                    open ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <ul className="flex flex-col gap-6 px-6 py-24 text-center font-['Open_Sans']">
                    {links.map((link) => (
                        <li key={link.name}>
                            <Link
                                to={link.to}
                                onClick={() => setOpen(false)}
                                className="block text-[#EAEAEA] text-lg transition-colors duration-200 hover:text-[#F5A623]"
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}

                    <li className="pt-6">
                        <a
                            href="#"
                            onClick={() => setOpen(false)}
                            className="inline-block w-full rounded-2xl bg-[#4A90E2] px-6 py-3 text-[18px] font-bold font-['Roboto'] text-white transition-all duration-300 hover:bg-[#357ABD]"
                        >
                            Connexion
                        </a>
                    </li>
                </ul>
            </div>
        </header>
    );
}


