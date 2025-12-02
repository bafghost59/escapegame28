import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/NavBar'
import FooterEscapeGame from './Components/Footer'
import PageAccueil from './Pages/PageAccueil'


function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">

        <Navbar />

        {/* Contenu principal */}
        <main className="flex-1">
          <Routes>
            {/* Page d'accueil */}
            <Route path="/" element={<PageAccueil />} />

          </Routes>
        </main>

        <FooterEscapeGame />
      </div>
    </Router>
  )
}

export default App
