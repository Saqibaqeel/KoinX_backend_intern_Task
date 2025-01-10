import React from 'react'
import Navbar from './Navbar'
import Home from './componenets/Home'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Stats from './componenets/Stats'
import Deviation from './componenets/Deviation'
import Footer from './Footer'

function App() {
  return (
    <BrowserRouter>
  <Navbar />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/stats" element={<Stats />} />
    <Route path="/deviation" element={<Deviation />} />
  </Routes>
  <Footer/>
</BrowserRouter>

    
  )
}

export default App