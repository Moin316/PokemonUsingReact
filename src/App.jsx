import React from 'react'
import Pokemon from './components/Pokemon'
import { BrowserRouter, Routes,Route, NavLink } from 'react-router-dom'
import PokemonCard from './components/PokemonCard'
import About from './components/About'
import Contact from './components/Contact'
const App = () => {
  
  return (
    <BrowserRouter> 
      <Routes>
        <Route path='/' element={<Pokemon/>}></Route>
        <Route path='/pokemon' element={<Pokemon/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/pokemon/:name' element={<PokemonCard/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
