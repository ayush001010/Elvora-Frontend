// src/components/Header.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react"; 
import { toast } from "react-toastify";

const Header = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully!"); 
    navigate("/login");
};

  return (
    <header className="bg-[#fdfaf6] border-b border-black">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 py-4">
        <Link to="/" className="text-3xl font-bold">
          Elvora
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/post-page" className="text-lg hover:underline">
            All Posts
          </Link>
          {token ? (
            <>
              <Link to="/my-posts" className="text-lg hover:underline">
                My Posts
              </Link>
              <Link to="/create" className="text-lg hover:underline">
                Create
              </Link>
              <button
                onClick={handleLogout}
                className="bg-black text-white px-4 py-1 rounded-full hover:bg-gray-900 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-lg hover:underline">
                Login
              </Link>
              <Link to="/register" className="text-lg hover:underline">
                Register
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Side Scroll Nav */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="overflow-x-auto whitespace-nowrap bg-[#fdfaf6] p-4 space-x-4">
          <Link to="/post-page" className="inline-block text-lg hover:underline">
            All Posts
          </Link>
          {token ? (
            <>
              <Link to="/my-posts" className="inline-block text-lg hover:underline">
                My Posts
              </Link>
              <Link to="/create" className="inline-block text-lg hover:underline">
                Create
              </Link>
              <button
                onClick={handleLogout}
                className="inline-block bg-black text-white px-4 py-1 rounded-full hover:bg-gray-900 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="inline-block text-lg hover:underline">
                Login
              </Link>
              <Link to="/register" className="inline-block text-lg hover:underline">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
