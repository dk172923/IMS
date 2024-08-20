// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import './App.css';
// @ts-ignore
import LandingPage from './Pages/Landingpage';
// @ts-ignore
import ProductForm from './Pages/ProductForm';
// @ts-ignore
import Header from './Components/Header';
// @ts-ignore
import ProductList from './Pages/ProductList';
// @ts-ignore
import Visualizations from './Pages/Visualizations';
// @ts-ignore
import AiIntegration from './Pages/AiIntegration'

const App: React.FC = () => {
  return (
    <Router>
      <header>
        <SignedOut>
          <LandingPage />
        </SignedOut>
        <SignedIn>
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/product-form" />} />
            <Route path="/product-form" element={<ProductForm />} />
            <Route path="/product-list" element={<ProductList />} />
            <Route path="/visualizations" element={<Visualizations />} />
            <Route path="/ai-integration" element={<AiIntegration />} />
          </Routes>
        </SignedIn>
      </header>
    </Router>
  );
};

export default App;