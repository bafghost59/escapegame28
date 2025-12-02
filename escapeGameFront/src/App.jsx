import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/NavBar'
import FooterEscapeGame from './Components/Footer'
import PageAccueil from './Pages/PageAccueil'
import PageCGU from './Pages/PageCgu'
import PageRGPD from './Pages/PageRGPD'
import PageAdmin from './Pages/PageAdmin'
import PageInscription from './Pages/PageInscription.jsx'
import PageConnexion from './Pages/PageConnexion.jsx'
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return  <>
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#1E1E2F]">
        <Navbar />

        <main className="flex-1 flex">
          <Routes>
            {/* Page d'accueil */}
            <Route path="/" element={<PageAccueil />} />
            <Route path="/cgu" element={<PageCGU />} />
            <Route path="/rgpd" element={<PageRGPD />} />
            <Route path="/admin" element={<PageAdmin />} />
            <Route path="/inscription" element={<PageInscription />} />
            <Route path="/connexion" element={<PageConnexion />} />
          </Routes>
        </main>

        <FooterEscapeGame />
      </div>
    </BrowserRouter>
    </>
  
}

export default App
