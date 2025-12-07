import { useState } from "react";
import { useParams } from "react-router-dom";
import PageProfilService from "../Services/PageProfilService";

export default function ProfilUser({ profilInfo, setProfilInfo }) {
  const [modeEdition, setModeEdition] = useState(false);
const id = Number(localStorage.getItem("user_id"));

  const [formProfil, setFormProfil] = useState({
    lastname: profilInfo.lastname,
    firstname: profilInfo.firstname,
    email: profilInfo.email,
    adress: profilInfo.adress,
    postal_code: profilInfo.postal_code,
    city: profilInfo.city,
    role: profilInfo.role,

  });

  const handleToggleEdition = () => {
    setModeEdition((prev) => !prev);
  };

const handleSave = async (e) => {
  e.preventDefault();
  try {
    await PageProfilService.updateUser(id, formProfil);
    console.log("Utilisateur modifié avec succès !");
    alert("Vos informations ont été modifiées avec succès !")
    setModeEdition(false);
    setProfilInfo((prev) => ({
        ...prev,
        ...formProfil,
      }));
      
  } catch (error) {
    console.error("Erreur lors de la modification de l'utilisateur :", error);
  }
};


  return (
    <div className="min-h-screen">
      <section className="h-full w-full space-y-6">
        {/* Titre de la section */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-white">
              Mon profil
            </h1>
            <p className="text-sm text-gray-400">
              Gérez vos informations personnelles et l’état de votre compte.
            </p>
          </div>

          {/* Bouton d’action principal */}
          <button
            type="button"
            onClick={handleToggleEdition}
            className="inline-flex items-center justify-center rounded-base bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            {modeEdition ? "Annuler" : "Modifier le profil"}
          </button>
        </header>

        {/* Bloc tableau / liste des infos */}
        <div className="relative overflow-x-auto rounded-lg border border-slate-700 bg-slate-900/70 shadow-lg">
          {/* Barre d’actions + recherche */}
          <div className="flex flex-col gap-4 border-b border-slate-700 p-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <button
                id="dropdownDefaultButton"
                type="button"
                className="inline-flex items-center justify-center rounded-base border border-slate-600 bg-slate-800 px-3 py-2 text-sm font-medium text-slate-100 shadow-sm hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Actions
                <svg
                  className="ms-1.5 -me-0.5 h-4 w-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="m19 9-7 7-7-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Dropdown caché pour plus tard */}
              <div
                id="dropdown"
                className="hidden w-40 rounded-base border border-slate-700 bg-slate-900 text-sm text-slate-100 shadow-lg"
              >
                <ul className="p-2">
                  <li>
                    <button className="inline-flex w-full items-center rounded px-2 py-1.5 text-left hover:bg-slate-800">
                      Réinitialiser le mot de passe
                    </button>
                  </li>
                  <li>
                    <button className="inline-flex w-full items-center rounded px-2 py-1.5 text-left hover:bg-slate-800">
                      Exporter mes données
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Champ de recherche (optionnel) */}
            <div className="relative w-full max-w-xs">
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                <svg
                  className="h-4 w-4 text-slate-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <input
                id="input-group-1"
                type="text"
                className="block w-full rounded-base border border-slate-700 bg-slate-800 ps-9 pe-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 shadow-xs focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Rechercher dans vos infos"
              />
            </div>
          </div>

          {/* Tableau stylisé pour les infos profil */}
          <table className="w-full text-left text-sm text-slate-200">
            <thead className="border-b border-slate-700 bg-slate-800 text-xs uppercase text-slate-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Champ
                </th>
                <th scope="col" className="px-6 py-3">
                  Valeur
                </th>
                <th scope="col" className="px-6 py-3">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody>
              {/* NOM COMPLET */}
              <tr className="border-b border-slate-800 bg-slate-900/60 hover:bg-slate-800/70">
                <td className="px-6 py-4 font-medium text-slate-100">
                  Nom complet
                </td>
                <td className="px-6 py-4">
                  {modeEdition ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formProfil.lastname}
                        onChange={(e) =>
                          setFormProfil({
                            ...formProfil,
                            lastname: e.target.value,
                          })
                        }
                        className="w-1/2 rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm text-slate-100"
                      />
                      <input
                        type="text"
                        value={formProfil.firstname}
                        onChange={(e) =>
                          setFormProfil({
                            ...formProfil,
                            firstname: e.target.value,
                          })
                        }
                        className="w-1/2 rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm text-slate-100"
                      />
                    </div>
                  ) : (
                    <span>
                      {profilInfo.lastname} {profilInfo.firstname}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-semibold text-green-400">
                    Modifier
                  </span>
                </td>
              </tr>

              {/* EMAIL */}
              <tr className="border-b border-slate-800 bg-slate-900/60 hover:bg-slate-800/70">
                <td className="px-6 py-4 font-medium text-slate-100">
                  Adresse e‑mail
                </td>
                <td className="px-6 py-4">
                  {modeEdition ? (
                    <input
                      type="email"
                      value={formProfil.email}
                      onChange={(e) =>
                        setFormProfil({ ...formProfil, email: e.target.value })
                      }
                      className="w-full rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm text-slate-100"
                    />
                  ) : (
                    <span>{profilInfo.email}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-semibold text-green-400">
                    Modifier
                  </span>
                </td>
              </tr>

              {/* ADRESSE */}
              <tr className="border-b border-slate-800 bg-slate-900/60 hover:bg-slate-800/70">
                <td className="px-6 py-4 font-medium text-slate-100">
                  Adresse
                </td>
                <td className="px-6 py-4">
                  {modeEdition ? (
                    <input
                      type="text"
                      value={formProfil.adress}
                      onChange={(e) =>
                        setFormProfil({ ...formProfil, adress: e.target.value })
                      }
                      className="w-full rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm text-slate-100"
                    />
                  ) : (
                    <span>{profilInfo.adress}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-semibold text-green-400">
                    Modifier
                  </span>
                </td>
              </tr>

              {/* VILLE + CODE POSTAL */}
              <tr className="border-b border-slate-800 bg-slate-900/60 hover:bg-slate-800/70">
                <td className="px-6 py-4 font-medium text-slate-100">Ville</td>
                <td className="px-6 py-4">
                  {modeEdition ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formProfil.city}
                        onChange={(e) =>
                          setFormProfil({ ...formProfil, city: e.target.value })
                        }
                        className="w-2/3 rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm text-slate-100"
                      />
                      <input
                        type="number"
                        value={formProfil.postal_code}
                        onChange={(e) =>
                          setFormProfil({
                            ...formProfil,
                            postal_code: e.target.value,
                          })
                        }
                        className="w-1/3 rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm text-slate-100"
                      />
                    </div>
                  ) : (
                    <span>
                      {profilInfo.city} ({profilInfo.postal_code})
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-semibold text-green-400">
                    Modifier
                  </span>
                </td>
              </tr>

              {/* RÔLE */}
              <tr className="bg-slate-900/60 hover:bg-slate-800/70">
                <td className="px-6 py-4 font-medium text-slate-100">Rôle</td>
                <td className="px-6 py-4">
                  {modeEdition ? (
                    <select
                      value={formProfil.role}
                      onChange={(e) =>
                        setFormProfil({ ...formProfil, role: e.target.value })
                      }
                      className="rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm text-slate-100"
                    >
                      <option value="user">Utilisateur</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    <span>{profilInfo.role}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-semibold text-green-400">
                    Modifier
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          {modeEdition && (
            <div className="flex justify-end px-6 py-4">
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center rounded-base bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                Enregistrer les modifications
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
