import { useState } from "react";
import PageProfilService from "../Services/PageProfilService";

export default function ProfilUser({ profilInfo, setProfilInfo }) {                                                            // Récupérés depuis le parent - ProfilList
  const [modeEdition, setModeEdition] = useState(false);                                                                       // false car infos non modifiables par défaut - si vrai, user peut modifier ses infos 
  const id = Number(localStorage.getItem("user_id"));                                                                                // id en mémoire locale

  const [formProfil, setFormProfil] = useState({
    lastname: profilInfo.lastname,
    firstname: profilInfo.firstname,
    email: profilInfo.email,
    adress: profilInfo.adress,                                                                                                         // état avec toutes les infos de la bdd lié au props et à l'user concerné
    postal_code: profilInfo.postal_code,
    city: profilInfo.city,
    role: profilInfo.role,
    login: profilInfo.login || "",
    password: "",
  });

  const handleToggleEdition = () => {
    setModeEdition((prev) => !prev);                                                                                                     // fonction qui permet de Modifier le profil
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await PageProfilService.updateUser(id, formProfil);
      alert("Vos informations ont été modifiées avec succès !");                                                                         // si interrogation bdd OK - alert
      setModeEdition(false);
      setProfilInfo((prev) => ({
        ...prev,
        ...formProfil,
      }));
    } catch (error) {
      console.error(
        "Erreur lors de la modification de l'utilisateur :",
        error
      );
    }
  };

  return (
    <div className="min-h-screen w-full px-4 py-6 md:px-8 lg:px-12">
      <section className="mx-auto max-w-4xl space-y-6">
        {/* Titre de la section */}
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-center text-xl font-semibold text-white md:text-left md:text-2xl">
              Mon profil
            </h1>
            <p className="mt-1 text-center text-sm text-gray-400 md:text-left">
              Gérez vos informations personnelles et l’état de votre compte.
            </p>
          </div>

          {/* Bouton Modifier */}
          <button
            type="button"
            onClick={handleToggleEdition}
            className="inline-flex w-full items-center justify-center rounded-base bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 md:w-auto"
          >
            {modeEdition ? "Annuler" : "Modifier le profil"}
          </button>
        </header>

        {/* Bloc tableau / liste des infos */}
        <div className="relative overflow-x-auto rounded-lg border border-slate-700 bg-slate-900/80 shadow-lg">
          {/* Tableau stylisé */}
          <table className="min-w-full table-auto text-left text-sm text-slate-200">
            <thead className="border-b border-slate-700 bg-slate-800/90 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <tr>
                <th scope="col" className="px-4 py-3 md:px-6">
                  Champ
                </th>
                <th scope="col" className="px-4 py-3 md:px-6">
                  Valeur
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {/* NOM COMPLET */}
              <tr className="bg-slate-900/60 hover:bg-slate-800/70">
                <td className="px-4 py-4 font-medium text-slate-100 md:px-6">
                  Nom complet
                </td>
                <td className="px-4 py-4 md:px-6">
                  {modeEdition ? (
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <input
                        type="text"
                        value={formProfil.lastname}
                        onChange={(e) =>
                          setFormProfil({
                            ...formProfil,
                            lastname: e.target.value,
                          })
                        }
                        className="w-full rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm text-slate-100 sm:w-1/2"
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
                        className="w-full rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm text-slate-100 sm:w-1/2"
                      />
                    </div>
                  ) : (
                    <span>
                      {profilInfo.lastname} {profilInfo.firstname}
                    </span>
                  )}
                </td>
              </tr>

              {/* EMAIL */}
              <tr className="bg-slate-900/60 hover:bg-slate-800/70">
                <td className="px-4 py-4 font-medium text-slate-100 md:px-6">
                  Adresse e‑mail
                </td>
                <td className="px-4 py-4 md:px-6">
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
              </tr>

              {/* ADRESSE */}
              <tr className="bg-slate-900/60 hover:bg-slate-800/70">
                <td className="px-4 py-4 font-medium text-slate-100 md:px-6">
                  Adresse
                </td>
                <td className="px-4 py-4 md:px-6">
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
              </tr>

              {/* VILLE + CODE POSTAL */}
              <tr className="bg-slate-900/60 hover:bg-slate-800/70">
                <td className="px-4 py-4 font-medium text-slate-100 md:px-6">
                  Ville
                </td>
                <td className="px-4 py-4 md:px-6">
                  {modeEdition ? (
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <input
                        type="text"
                        value={formProfil.city}
                        onChange={(e) =>
                          setFormProfil({ ...formProfil, city: e.target.value })
                        }
                        className="w-full rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm text-slate-100 sm:w-2/3"
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
                        className="w-full rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm text-slate-100 sm:w-1/3"
                      />
                    </div>
                  ) : (
                    <span>
                      {profilInfo.city} ({profilInfo.postal_code})
                    </span>
                  )}
                </td>
              </tr>

              {/* LOGIN */}
              <tr className="bg-slate-900/60 hover:bg-slate-800/70">
                <td className="px-4 py-4 font-medium text-slate-100 md:px-6">
                  Login
                </td>
                <td className="px-4 py-4 md:px-6">
                  {modeEdition ? (
                    <input
                      type="text"
                      value={formProfil.login}
                      onChange={(e) =>
                        setFormProfil({ ...formProfil, login: e.target.value })
                      }
                      className="w-full rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm text-slate-100"
                    />
                  ) : (
                    <span>{profilInfo.login}</span>
                  )}
                </td>
              </tr>

              {/* MOT DE PASSE */}
              <tr className="bg-slate-900/60 hover:bg-slate-800/70">
                <td className="px-4 py-4 font-medium text-slate-100 md:px-6">
                  Mot de passe
                </td>
                <td className="px-4 py-4 md:px-6">
                  {modeEdition ? (
                    <input
                      type="password"
                      value={formProfil.password}
                      onChange={(e) =>
                        setFormProfil({
                          ...formProfil,
                          password: e.target.value,
                        })
                      }
                      className="w-full rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm text-slate-100"
                      placeholder="Nouveau mot de passe"
                    />
                  ) : (
                    <span className="text-slate-500">
                      ••••••••
                    </span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          {modeEdition && (
            <div className="flex justify-end px-4 py-4 sm:px-6">
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex w-full items-center justify-center rounded-base bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 sm:w-auto"
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


