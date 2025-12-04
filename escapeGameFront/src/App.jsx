import Navbar from './Components/NavBar'
import FooterEscapeGame from './Components/Footer'
import PageAccueil from './Pages/PageAccueil'
import PageCGU from './Pages/PageCgu'
import PageRGPD from './Pages/PageRGPD'
import PageAdmin from './Pages/PageAdmin'
import PageInscription from './Pages/PageInscription.jsx'
import PageConnexion from './Pages/PageConnexion.jsx'
import PageCatalogue from './Pages/PageCatalogue.jsx';
import { Route, Routes } from "react-router-dom";
import PageEscapeDetail from './Pages/PageEscapeDetail';
import PageSupport from './Pages/PageSupport.jsx';
import PageForgetMdp from './Pages/PageForgetMdp.jsx'


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
          <Route path="/forgotPassword" element={<PageForgetMdp />} />
          <Route path="/connexion" element={<PageConnexion />} />
          <Route path="/catalogue/:id" element={<PageEscapeDetail />} />
          <Route path='/support' element={<PageSupport/>} />
        </Routes>
      </main>

      <FooterEscapeGame />
    </div>
  </>

}

export default App;

