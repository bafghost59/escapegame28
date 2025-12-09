import Navbar from "./Components/NavBar";
import FooterEscapeGame from "./Components/Footer";
import PageAccueil from "./Pages/PageAccueil";
import PageCGU from "./Pages/PageCgu";
import PageRGPD from "./Pages/PageRGPD";
import PageAdmin from "./Pages/PageAdmin";
import PageInscription from "./Pages/PageInscription.jsx";
import PageConnexion from "./Pages/PageConnexion.jsx";
import PageCatalogue from "./Pages/PageCatalogue.jsx";
import { Route, Routes } from "react-router-dom";
import PageEscapeDetail from './Pages/PageEscapeDetail';
import PageSupport from './Pages/PageSupport.jsx';
import PageForgetMdp from './Pages/PageForgetMdp.jsx';
import PageProfilUser from './Pages/PageProfilUser.jsx';
import { useState } from 'react';
import PageReservationTwo from './Pages/PageReservationTwo.jsx';
import PageReservationThree from "./Pages/PageReservationThree.jsx";
import PageReservationOne from './Pages/PageReservationOne.jsx';
import PageApropos from "./Pages/PageApropos.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("user_id");
  });
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  console.log(isLoggedIn);
  return (
    <>
      <div className="min-h-screen flex flex-col bg-[#1E1E2F]">
        <Navbar
          isLoggedIn={isLoggedIn}
          user={user}
          setIsLoggedIn={setIsLoggedIn}
          setUser={setUser}
        />

        <main className="flex-1 flex">
          <Routes>
            <Route path="/" element={<PageAccueil />} />
            <Route path="/catalogue" element={<PageCatalogue />} />
            <Route path="/cgu" element={<PageCGU />} />
            <Route path="/rgpd" element={<PageRGPD />} />
            <Route path="/admin" element={<PageAdmin />} />
            <Route path="/inscription" element={<PageInscription />} />
            <Route path="/forgotPassword" element={<PageForgetMdp />} />
            <Route path="/reservation/:id" element={<PageReservationOne />} />
            <Route path="/reservation/:id/paiement" element={<PageReservationTwo />} />
            <Route path="/reservation/:id/confirmation" element={<PageReservationThree />} />
            <Route path="/apropos" element={<PageApropos />} />
            <Route
              path="/connexion"
              element={
                <PageConnexion
                  setIsLoggedIn={setIsLoggedIn}
                  setUser={setUser}
                />
              }
            />
            <Route
              path="/Profil"
              element={
                isLoggedIn ? (
                  <PageProfilUser
                    user={user}
                    setIsLoggedIn={setIsLoggedIn}
                    setUser={setUser}
                  />
                ) : (
                  <PageConnexion
                    setIsLoggedIn={setIsLoggedIn}
                    setUser={setUser}
                  />
                )
              }
            />
            <Route path="/catalogue/:id" element={<PageEscapeDetail />} />
            <Route path="/support" element={<PageSupport />} />
          </Routes>
        </main>

        <FooterEscapeGame />
      </div>
    </>
  );
}

export default App;
