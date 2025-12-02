import Navbar from './Components/NavBar.jsx'

import FooterEscapeGame from './Components/Footer'
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
