import { useEffect } from "react";
import PageProfilService from "../Services/PageProfilService";
import BookingCard from "./BookingCard";
import Profil from "./Profil";
import { useState } from "react";
import ProfilUser from "./Profil";

export default function ProfilList() {
  const id = localStorage.getItem("user_id");
  const [profilInfo, setProfilInfo] = useState(null);

  useEffect(() => {
    const fetchInfoUser = async () => {
      try {
        const response = await PageProfilService.getAllInfoByUser(id);
        console.log("API profil :", response.data);
        setProfilInfo(response.data.user[0]);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations utilisateur",
          error
        );
      }
    };
    if (id) fetchInfoUser();
  }, [id]);

  return (
    <>
      <h1 className="text-gray-700 dark:text-gray-300 text-center">
        Profil Utilisateur
      </h1>

      <div className="mt-5 flex justify-center md:justify-start">
        {profilInfo && (
          <ProfilUser
            profilInfo={profilInfo}
            setProfilInfo={setProfilInfo}
          />
        )}
      </div>
    </>
  );
}