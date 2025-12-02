import Navbar from '../Components/NavBar'
import CarouselEscapeGame from '../Components/Caroussel'
import FooterEscapeGame from '../Components/Footer'
import Example from '../Components/Example'

function App() {
  return (
    <div className="min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-1">
        <CarouselEscapeGame />
        <Example />
      </main>

      <FooterEscapeGame />
    </div>
  )
}

export default App
