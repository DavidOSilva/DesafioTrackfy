import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppProvider from './contexts/AppProvider'

// Paginas
import Dashboard from './pages/Dashboard/Dashboard'
import Map from './pages/Map/Map'


function App() {

  return (
    
    <AppProvider>
      <Router>
        <Routes>
          <Route index element={<Dashboard/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mapa" element={<Map />} />
        </Routes>
      </Router>
    </AppProvider>
    
  )
}

export default App
