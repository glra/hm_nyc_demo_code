import logo from "./logo.svg"
import "./App.css"
import Home from "./pages/home/Home"
import VenueList from "./pages/venues/VenueList"
import VenueDetails from "./pages/venues/VenueDetails"
import EventList from "./pages/events/EventList"
import ArtistList from "./pages/artists/ArtistList"
import ArtistDetails from "./pages/artists/ArtistDetails"
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <header className="App__header">
        <BrowserRouter>
          <h1>HOUSEMUSIC.NYC</h1>

          <nav className="App__nav">
            <NavLink to="/">Home</NavLink>
            <NavLink className="events" to="/events">
              Events
            </NavLink>
            <NavLink className="venues" to="/venues">
              Venues
            </NavLink>
            <NavLink className="artists" to="/artists">
              Artists
            </NavLink>
          </nav>
          <div className="App__content">
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route path="/venues" element={<VenueList />} />
              <Route path="/events" element={<EventList />} />
              <Route path="/artists" element={<ArtistList />} />
              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/venues/:id" element={<VenueDetails />} />
            </Routes>
          </div>
        </BrowserRouter>
      </header>
    </div>
  )
}

export default App
