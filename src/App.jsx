import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Paginas
import Dashboard from './pages/Dashboard/Dashboard'
import Map from './pages/Map/Map'


function App() {

  return (
    <Router>
      <Routes>
        <Route index element={<Dashboard/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mapa" element={<Map />} />
      </Routes>
    </Router>
  )
}

export default App
