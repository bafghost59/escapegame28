import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/NavBar';
import FooterEscapeGame from './Components/Footer';
import PageAccueil from './Pages/PageAccueil';
import PageCatalogue from './Pages/PageCatalogue';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<PageAccueil />} />
          <Route path="/catalogue" element={<PageCatalogue />} />
        </Routes>
      </main>

      <FooterEscapeGame />
    </div>
  );
}

export default App;

