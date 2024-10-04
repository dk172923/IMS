// src/Components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';

const Header = () => {
  return (
    <header className="header d-flex justify-content-between align-items-center p-3">
      <nav>
        <ul className="d-flex list-unstyled mb-0">
          <li className="mx-2">
            <Link to="/product-form" className="text-white text-decoration-none">Add Items</Link>
          </li>
          <li className="mx-2">
            <Link to="/product-list" className="text-white text-decoration-none">View Items</Link>
          </li>
          <li className="mx-2">
            <Link to="/visualizations" className="text-white text-decoration-none">Visualizations</Link>
          </li>
          <li className="mx-2">
            <Link to="/ai-integration" className="text-white text-decoration-none">AI Integration</Link>
          </li>
        </ul>
      </nav>
      <UserButton />
    </header>
  );
};

export default Header;
