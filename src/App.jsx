import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DataProvider from './contexts/DataProvider'

// Paginas
import Dashboard from './pages/Dashboard/Dashboard'
import Map from './pages/Map/Map'


function App() {

  return (
    
    <DataProvider>
      <Router>
        <Routes>
          <Route index element={<Dashboard/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mapa" element={<Map />} />
        </Routes>
      </Router>
    </DataProvider>
    
  )
}

export default App
