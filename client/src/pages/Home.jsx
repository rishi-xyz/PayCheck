import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Homepage = () => {
	const Navigate = useNavigate();
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-3xl font-bold text-blue-400">Paycheck</h1>
          <nav className="flex space-x-6">
            <Link to="#features" className="text-gray-300 hover:text-blue-400 font-medium text-lg py-2">Features</Link>
            <a href="https://github.com/rishi-xyz/PayCheck" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-300 hover:text-blue-400 font-medium text-lg py-2">
                Code
            </a>
            <div className="flex space-x-4">
              <button onClick={async()=>{Navigate("/signin")}}  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Sign In
              </button>
              <button onClick={async()=>{Navigate("/signup")}}  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Sign Up
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-800 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to Paycheck</h2>
          <p className="text-xl mb-6">Your one-stop solution for managing payments and finances</p>
          <Link to="#features" className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-blue-600">
            Explore Features
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center text-blue-400 mb-10">Features</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-4">Secure Payments</h4>
              <p>Experience fast and secure payments with our advanced encryption technology.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-4">Easy Transfers</h4>
              <p>Transfer money to your friends and family with just a few clicks.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-4">Bill Payments</h4>
              <p>Pay your bills on time with our quick and easy bill payment service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 Paycheck. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
