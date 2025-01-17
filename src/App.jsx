import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Formulario from './components/Formulario';
import Checkout from './components/Checkout';
import Result from './components/Result';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<Formulario />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App
