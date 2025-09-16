import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import HomePage from './pages/HomePage/HomePage'
import MenuPage from './pages/MenuPage/MenuPage';

function App() {
  return (
 <BrowserRouter> 
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/MenuPage' element={<MenuPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App