import Navbar from './Components/NavBar'
import FooterEscapeGame from './Components/Footer'
import PageAccueil from './Pages/PageAccueil'
import PageCGU from './Pages/PageCgu'
import PageRGPD from './Pages/PageRGPD'
import PageAdmin from './Pages/PageAdmin'
import PageInscription from './Pages/PageInscription.jsx'
import PageConnexion from './Pages/PageConnexion.jsx'
import PageCatalogue from './Pages/PageCatalogue';
import { Route, Routes } from "react-router-dom";
import PageEscapeDetail from './Pages/PageEscapeDetail';
import PageReservationOne from './Pages/PageReservationOne.jsx';

function App() {
  return <>
    <div className="min-h-screen flex flex-col bg-[#1E1E2F]">
      <Navbar />

      <main className="flex-1 flex">
        <Routes>
          <Route path="/" element={<PageAccueil />} />
          <Route path="/catalogue" element={<PageCatalogue />} />
          <Route path="/cgu" element={<PageCGU />} />
          <Route path="/rgpd" element={<PageRGPD />} />
          <Route path="/admin" element={<PageAdmin />} />
          <Route path="/inscription" element={<PageInscription />} />
          <Route path="/connexion" element={<PageConnexion />} />
          <Route path="/catalogue/:id" element={<PageEscapeDetail />} />
          <Route path="/reservation/:id" element={<PageReservationOne />} />
        </Routes>
      </main>

      <FooterEscapeGame />
    </div>
  </>

}

export default App;

