// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-center md:justify-between min-h-screen bg-[#fdfaf6] px-4 sm:px-8 lg:px-16 py-8 md:py-12 font-outfit">

      {/* Left Side Content */}
      <div className="w-full m-10 md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-8xl font-serif leading-snug text-black">
          Human <br />
          <span className="font-normal">Stories & Ideas</span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-md">
          A place to read, write, and deepen your understanding
        </p>

        <button
          onClick={() => navigate('/post-page')}
          className="mt-4 bg-black text-white px-5 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base md:text-lg hover:bg-gray-900 transition"
        >
          Start reading
        </button>
      </div>

      {/* Right Side Image – hidden on small screens */}
      <div className="hidden md:flex w-full md:w-1/2 mb-8 md:mb-0 justify-center md:justify-end">
        <img
          src="/Image.png"
          alt="Hero Graphic"
          className="w-2/3 sm:w-1/2 md:w-5/6 lg:w-full max-w-xs sm:max-w-md lg:max-w-xl object-contain"
        />
      </div>
    </div>
  );
};

export default Home;
