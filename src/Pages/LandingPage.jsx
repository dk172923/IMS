import React from 'react';
import { SignIn } from '@clerk/clerk-react';

export default function LandingPage() {
  return (
    <div className="container-fluid min-vh-100 d-flex p-0">
      {/* Left Section (Image) */}
      <div className="row w-100 m-0">
        <div className="col-lg-6 position-relative text-white d-flex flex-column justify-content-end align-items-center p-4 vh-100">
          <img
            src="https://img.freepik.com/free-photo/computer-monitor-with-graph-it_1340-35876.jpg?t=st=1713637770~exp=1713641370~hmac=3ca8ac7a49cb9bd87daa1588c958cd44f5ad4b42473673520a11c0bda5fa3894&w=1060"
            alt="Inventory Management"
            className="position-absolute"
            style={{
              width: '100%',
              height: 'auto',
              top: '10%', // Pushes the image down from the top
              bottom: '10%', // Pulls the image up from the bottom
              objectFit: 'cover',
              opacity: 0.8,
              borderRadius: '20px',
            }}
          />
          <div className="position-relative text-center mb-4">
            <h2 className="display-4 fw-bold">Inventory Management System 🦑</h2>
            <p className="lead mt-3">Try out our AI functionality !!!</p>
          </div>
        </div>

        {/* Right Section (Sign-in) */}
        <div className="col-lg-6 d-flex justify-content-center align-items-center bg-white p-4 vh-100">
          <div className="text-center w-100" style={{ maxWidth: '400px' }}>
            <h1 className="display-5 fw-bold mb-4 text-dark">Welcome to our WebApp</h1>
            <SignIn />
          </div>
        </div>
      </div>
    </div>
  );
}
