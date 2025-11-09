
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AuthPage from "./Auth/AuthPage"



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
      </Routes>
    </Router>
  )
}

export default App
