import { useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import ProtectedRoutes from './components/Protected_Routes'
import Home from './pages/Home'
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
        <Route 
        path='/'
        element = {
            <Home />
        }
        />
    </Routes>
    </BrowserRouter>
  )
}

export default App
