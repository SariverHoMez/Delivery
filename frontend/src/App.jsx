import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage'
import MenuPage from './pages/MenuPage/MenuPage';
import Header from './components/Header/Header.jsx'

function App() {
  return (
    <BrowserRouter>
    <Header></Header>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/MenuPage' element={<MenuPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App